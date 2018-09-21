import { Pipe, PipeTransform } from '@angular/core';
import { DataScrollerService } from './data-scroller.service';

@Pipe({
  name: 'dataScroller',
})
export class DataScrollerPipe implements PipeTransform {

  constructor(
    private dataScrollerService: DataScrollerService
  ) { }
  transform(value: any[], itemPerPage, currentPage: number): any {
    this.dataScrollerService.recieveDataSource({ value: value, currentPage: currentPage, itemPerPage: itemPerPage })
    return value.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
  }

}
