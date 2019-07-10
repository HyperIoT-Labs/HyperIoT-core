import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { DataStreamService } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['../../../assets/widgets/styles/widget-commons.css', './events-log.component.css']
})
export class EventsLogComponent implements OnInit, OnDestroy {
  @Input()
  widget;
  private logMessages: {timestamp: Date, message: string, extra: string}[] = [];

  /**
   * Contructor
   * @param dataStreamService Inject data stream service
   */
  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit() {
    this.dataStreamService.eventStream.subscribe((event) => {
      let packet = JSON.parse(event.data);
      // packet = JSON.parse(packet.payload);
      // limit max log lines
      let maxLogLines = 100;
      if (this.widget.config && this.widget.config.maxLogLines) {
        maxLogLines = +this.widget.config.maxLogLines;
      }
      this.logMessages.unshift({
        timestamp: new Date(),
        message: packet.payload,
        extra: '---'
      });
      if (this.logMessages.length > maxLogLines) {
        this.logMessages.pop();
      }
    });
  }

  ngOnDestroy() {
  }

}
