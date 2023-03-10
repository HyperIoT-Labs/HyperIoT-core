import { Injectable } from '@angular/core';
import { DataPacketFilter } from './data-packet-filter';
import { Subject, ReplaySubject } from 'rxjs';

import { HPacket } from '../../../public_api';

const BUFFER_SIZE = 50;

export class DataChannel {
  packet: DataPacketFilter;
  subject: ReplaySubject<[any, any]>;
  _interval: any;

  constructor(packet: DataPacketFilter) {
    this.packet = packet;
    this.subject = new ReplaySubject<any>(BUFFER_SIZE);
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * A service for connecting to HyperIoT events stream
 * via WebSocket.
 */
export class DataStreamService {
  /**
   * List of data channels requested by widgets.
   * Once connected to the main data stream (via websocket)
   * this service will deliver incoming data to the widgets
   * based on data filters specified in the StreamSubscription.
   */
  dataChannels: { [id: string]: DataChannel; } = {};
  /**
   * Connection status
   */
  isConnected: boolean;
  eventStream: Subject<any>;


  private baseWs = (location.protocol == 'https:') ? 'wss:' : 'ws:';
  private timer;
  private wsUrl = this.baseWs+'//' + location.hostname + (location.port ? ':' + location.port : '') + '/hyperiot/ws/project?projectId=';
  private ws: WebSocket;

  pingMessage = {
    cmd: null,
    type: 'PING',
    payload: ''
  };
  packetSchema: any;

  constructor() {
    this.eventStream = new Subject<any>();
  }

  /**
   * Opens the WebSocket session for data streaming.
   * 
   * @param url WebSocket endpoint url
   */
  connect(projectId: number, url?: string) {
    console.log('Connecting websocket...');
    this.disconnect();
    this.ws = new WebSocket(url != null ? url : this.wsUrl + projectId);
    this.ws.onmessage = this.onWsMessage.bind(this);
    this.ws.onerror = this.onWsError.bind(this);
    this.ws.onclose = this.onWsClose.bind(this);
    this.ws.onopen = this.onWsOpen.bind(this);
    this.keepAlive();
  }


  keepAlive() {
    this.timer = setTimeout(() => {
      if (this.ws != null && this.ws.readyState == this.ws.OPEN) {
        console.log('Sending heartbeat to websocket...');
        this.ws.send(JSON.stringify(this.pingMessage));
      }
      this.keepAlive();
    }, 40000);
  }

  cancelKeepAlive() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Closes the WebSocket session.
   */
  disconnect() {
    if (this.ws != null) {
      this.ws.close();
      this.ws = null;
    }
    this.cancelKeepAlive();
    this.isConnected = false;
  }

  /**
   * Adds a new data channel that can be used for subscribing to data streaming events.
   *
   * @param widgetId The widget identifier.
   * @param dataPacketFilter Data packet filter which defines the packet id and packet fields to receive.
   */
  addDataStream(widgetId: string, dataPacketFilter: DataPacketFilter): DataChannel {
    // TODO: maybe allow an array of data packets to be passed in,
    //       so that a widget can receive packets from multiple sources.

    if (this.dataChannels[widgetId]) {
      return this.dataChannels[widgetId];
    }
    const channelData = new DataChannel(dataPacketFilter);
    return this.dataChannels[widgetId] = channelData;
  }
  /**
   * Removes a data channel.
   *
   * @param widgetId The widget id.
   */
  removeDataChannel(widgetId: string) {
    // TODO: maybe it should also clear any pending subscriptions
    // TODO use .observed if rxjs > 7
    if (this.dataChannels[widgetId] && !this.dataChannels[widgetId].subject.observers.length) {
      delete this.dataChannels[widgetId];
    }
  }

  private onWsOpen() {
    this.isConnected = true;
  }
  private onWsClose() {
    this.isConnected = false;
  }
  private onWsError() {
    // TODO: report error
  }
  private onWsMessage(event: MessageEvent) {
    // avsc.js must be manually included in the hosting page
    const avro = window['avsc'];
    if (!avro) {
      const errorMessage = '@hyperiot/core/data-stream-service - ERROR: https://github.com/aszmyd/avsc-js (dist) must be included in the hosting page.';
      console.error(errorMessage);
      throw Error(errorMessage);
    }
    // read AVRO-serialized HPacket from Kafka-Flux
    const wsData = JSON.parse(event.data);
    // decode base-64 payload
    const decodedWsPayload = atob(wsData.payload);
    // TODO: add specific type 'SCHEMA' instead of using 'INFO'
    if (wsData.type === 'INFO') {
      this.packetSchema = avro.parse(JSON.parse(decodedWsPayload));
      return;
    } else if (!this.packetSchema) {
      // cannot continue without schema definition
      return;
    }
    // decode AVRO data to HPacket instance
    const hpacket = this.packetSchema.decode(new Buffer(decodedWsPayload, 'binary')) as HPacket;
    // route received HPacket to eventStream subscribers
    this.eventStream.next({ data: hpacket });
    if (wsData.type === 'APPLICATION') {
      // extract and route subscribed fields to data channels
      for (const id in this.dataChannels) {
        if (this.dataChannels.hasOwnProperty(id)) {
          const channelData: DataChannel = this.dataChannels[id];
          // check if message is valid for the current
          // channel, if so emit a new event
          if (hpacket.id == channelData.packet.packetId) {
            if(channelData.packet.wholePacketMode) {
              // emitted event is going to contain all filtered fields
              let fields = {};
              Object.keys(channelData.packet.fields).forEach(fieldId => {
                const field = this.getField(channelData, hpacket, fieldId)
                if (Object.keys(field).length > 0)
                  Object.assign(fields, field);
              });
              const timestamp = this.getTimestamp(hpacket);
              channelData.subject.next([timestamp, fields]);
            }
            else {
              // emitted event is going to contain one field
              Object.keys(channelData.packet.fields).map((fieldId: any) => {
                const field = this.getField(channelData, hpacket, fieldId);
                if (Object.keys(field).length > 0) {
                  const timestamp = this.getTimestamp(hpacket);
                  channelData.subject.next([timestamp, field]);
                }
              });
            }
          }
        }
      }
    } else if (wsData.type === 'ERROR') {
      console.error('Error on websocket:', hpacket);
    } else {
      console.error('Invalid packet type:', wsData.type);
    }
  }

  private getField(channelData: DataChannel, hpacket: HPacket, fieldId: any): Object {
    let field = {};
    const fieldName = channelData.packet.fields[fieldId];
    if (hpacket.fields.map.hasOwnProperty(fieldName)) {
      const tmpValue = hpacket.fields.map[fieldName].value;
      // based on the type, the input packet field value
      // will be stored in the corresponding type property
      // eg. if packet field is "DOUBLE" then the effective value
      // will be stored into 'value.double' property
      const valueKey = Object.keys(tmpValue)[0];
      const value = hpacket.fields.map[fieldName].value[valueKey];
      field[fieldName] = value;
    }
    return field;
  }

  private getTimestamp(hpacket: HPacket): Date {
    // get timestamp from packet if present
    let timestampFieldName = hpacket.timestampField;
    if (hpacket.fields.map[timestampFieldName])
      return new Date(hpacket.fields.map[timestampFieldName].value.long);
    return new Date();
  }

}
