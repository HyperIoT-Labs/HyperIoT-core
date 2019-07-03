import { Component, OnDestroy, Input } from '@angular/core';

import { DataChannel, DataStreamService } from '../services/data-stream.service';
import { DataPacketFilter } from './data/data-packet-filter';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'hyperiot-widget',
  template: ''
})
export abstract class WidgetComponent implements OnDestroy {
  protected dataChannel: DataChannel;
  @Input() widgetId: string;

  /**
   * Contructor
   * @param dataStreamService Inject data stream service
   */
  constructor(public dataStreamService: DataStreamService) { }

  ngOnDestroy() {
    // clean up event and subject subscriptions
    this.unsubscribeRealTimeStream();
  }

  /**
   * Pause the real-time data stream
   */
  abstract pause(): void;

  /**
   * Resume the real-time data stream
   */
  abstract play(): void;

  /**
   * Get widget data in the specified date range
   *
   * @param dataPacketFilter Packet id and fields to fetch
   * @param startDate Data range start date
   * @param endDate Data range end date
   * @returns A futurable or the requested data
   */
  abstract getOfflineData(dataPacketFilter: DataPacketFilter, startDate: Date, endDate: Date): any;

  /**
   * Set the real-time data stream the widget will receive data from
   *
   * @param widgetId The widget id
   * @param packetFilter Packet id and data filters (only listed fields will be streamed to the widget)
   * @param observerCallback Callback to fire once new data is received
   */
  subscribeRealTimeStream(packetFilter: DataPacketFilter, observerCallback: PartialObserver<[any, any]> | any): void {
    this.unsubscribeRealTimeStream();
    this.dataChannel = this.dataStreamService.addDataStream(this.widgetId, packetFilter);
    this.dataChannel.subject.subscribe(observerCallback);
  }

  /**
   * Stops receiving data from the subscribed data stream
   */
  unsubscribeRealTimeStream(): void {
    if (this.dataChannel != null) {
      // TODO: maybe move the unsubscription inside the DataStreamService::removeDataChannel
      this.dataChannel.subject.unsubscribe();
      this.dataStreamService.removeDataChannel(this.widgetId);
    }
  }
}
