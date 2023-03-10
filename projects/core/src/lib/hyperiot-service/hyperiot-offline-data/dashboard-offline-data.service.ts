import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { HprojectsService } from '../../hyperiot-client/h-project-client/api-module';

interface PacketSessionData {
  rowKeyLowerBound: number;
  rowKeyUpperBound: number;
  totalCount: BehaviorSubject<number>;
  data: any[];
}

enum PageStatus {
  Loading = 0,
  Standard = 1,
  New = 2,
  Error = -1
}


interface WidgetPacket {
  packetId: number;
  widgetId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardOfflineDataService {

  countEventSubject: Subject<PageStatus>;

  private subscriptions: WidgetPacket[] = [];

  DEFAULT_CHUNK_LENGTH = 50;
  hProjectId;
  rowKeyUpperBound = 0;

  dashboardPackets: Subject<number[]>;

  hPacketMap: Map<number, PacketSessionData>;

  constructor(
    private hprojectsService: HprojectsService,
  ) {
    this.hPacketMap = new Map<number, PacketSessionData>();    this.countEventSubject = new Subject<PageStatus>();    this.countEventSubject = new Subject<PageStatus>();
    this.countEventSubject = new Subject<PageStatus>();
  }

  public resetService(hProjectId: number): Subject<number[]> {
    this.hProjectId = hProjectId;
    this.subscriptions = [];
    this.hPacketMap.clear();
    this.dashboardPackets = new Subject<number[]>();
    return this.dashboardPackets;
  }

  addWidget(widgetId: number, packetId: number) {
    if (!this.subscriptions.some(x => x.widgetId === widgetId)) {
      this.subscriptions.push({ widgetId: widgetId, packetId: packetId });
      if (!this.hPacketMap.has(packetId)) {
        this.hPacketMap.set(packetId, {
          rowKeyLowerBound: 0,
          rowKeyUpperBound: 0,
          totalCount: new BehaviorSubject(0),
          data: []
        });
        this.dashboardPackets.next([...this.hPacketMap.keys()]);
      }
    }
  }

  removeWidget(widgetId: number, packetId: number) {
    this.subscriptions = this.subscriptions.filter(y => y.widgetId !== widgetId);
    if (this.hPacketMap.has(packetId) && !this.subscriptions.some(y => y.packetId === packetId)) {
      this.hPacketMap.delete(packetId);
      this.dashboardPackets.next([...this.hPacketMap.keys()]);
    }
  }

  // PRIMA CHIAMATA ARRIVA DALLA DASHBOARD DOPO SELEZIONE VERDE
  // SETTA OfflineCountMap
  public getEventCount(
    rowKeyLowerBound: number,
    rowKeyUpperBound: number
  ): void {
    this.rowKeyUpperBound = rowKeyUpperBound;
    this.hprojectsService.timelineEventCount(
      this.hProjectId,
      rowKeyLowerBound,
      this.rowKeyUpperBound,
      [...this.hPacketMap.keys()].toString(),
      ""
    ).subscribe((res) => {
      this.hPacketMap.forEach((value, key: number) => {
        const currentPacket = this.hPacketMap.get(key);
        currentPacket.data = [];
        currentPacket.rowKeyLowerBound = rowKeyLowerBound;
        currentPacket.rowKeyUpperBound = rowKeyUpperBound;
        currentPacket.totalCount.next(res.find(x=>x.hpacketId==key).totalCount);
        this.countEventSubject.next(PageStatus.Standard);
      });
    },
    err => {
      this.countEventSubject.next(PageStatus.Error);
    });
  }

  scanAndSaveHProject(packetId, deviceId): Observable<any> {
    return new Observable(obs => {
      const currentPacket = this.hPacketMap.get(packetId)
      this.hprojectsService.scanHProject(this.hProjectId, currentPacket.rowKeyLowerBound, currentPacket.rowKeyUpperBound, packetId, deviceId,).subscribe(
        res=> {
          const packetData = res;
          currentPacket.rowKeyLowerBound = packetData.rowKeyUpperBound + 1;
          currentPacket.data = currentPacket.data.concat(packetData.values);
          obs.next(packetData.values);
        }
      );
    });
  }

  public getEventCountEmpty() {
    this.hPacketMap.forEach((value, key: number) => {
      const currentPacket = this.hPacketMap.get(key);
      currentPacket.data = [];
      currentPacket.rowKeyLowerBound = 0;
      currentPacket.rowKeyUpperBound = 0;
      currentPacket.totalCount.next(0);
    });
  }


  public getPacketDataSubject(hPacketId: number): Subject<number> {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId).totalCount : null;
  }


  getData(packetId, deviceId, lowerBound): Observable<any> {
    lowerBound = lowerBound * this.DEFAULT_CHUNK_LENGTH;
    if (this.hPacketMap.has(packetId)) {
      const packetSession = this.hPacketMap.get(packetId);
      if( packetSession.data.length >= lowerBound + this.DEFAULT_CHUNK_LENGTH || packetSession.data.length === packetSession.totalCount.value) {
        return of(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH));
      } else {
        return this.scanAndSaveHProject(packetId, deviceId);
      }
    }
  }

}
