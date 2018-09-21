import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataScrollerService {
  recieve = new Subject<DataSource>();
  constructor() { }

  recieveDataSource(data: DataSource) {
    this.recieve.next(data);
  }

}

export class DataSource {
  value: any[];
  currentPage: number;
  itemPerPage:number;
}