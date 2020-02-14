import { Component } from '@angular/core';
import { HyperiotIndexeddbService } from 'projects/core/src/lib/hyperiot-service/hyperiot-indexeddb/hyperiot-indexeddb.service';

@Component({
  selector: 'app-test-idb',
  templateUrl: './test-idb.component.html',
  styleUrls: ['./test-idb.component.css']
})
export class TestIdbComponent {

  constructor(
    private indexedDbService: HyperiotIndexeddbService
  ) { }

  openDb() {
    this.indexedDbService.openDataBase()
      .then(res => { console.log(res); })
      .catch(e => { console.log(e); })
      .finally(() => { console.log('finally'); });
  }

  printIDB() {
    console.log(this.indexedDbService.idb);
  }

}
