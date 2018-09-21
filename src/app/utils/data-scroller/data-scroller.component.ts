import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataScrollerService, DataSource } from './data-scroller.service';
import { DoCheck, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-data-scroller',
  templateUrl: './data-scroller.component.html',
  styleUrls: ['./data-scroller.component.css']
})
export class DataScrollerComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() currentPage: number;
  contentStyle = "";
  dataSource: DataSource;
  constructor(
    private dataScrollerService: DataScrollerService,
  ) { }

  ngOnInit() {
    console.log('ngOnInit dataScrollerService ')
    this.dataScrollerService.recieve.subscribe(res => {
      this.dataSource = res;
      console.log(res);
    })
  }

  onChangePage(type) {
    if (type === 'next') {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    } else {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
    this.contentStyle = "bounceInLeft animated";
    setTimeout(() => {
      this.contentStyle = "";
    }, 300);
  }

  showPrev() {
    if (this.currentPage === 1) {
      return false;
    }
    return true;
  }
  showNext() {
    let temp = this.dataSource.value.length / this.dataSource.itemPerPage;
    let numberOfPage = this.dataSource.value.length % this.dataSource.itemPerPage === 0 ? temp : Number.parseInt(temp + 1 + '');
    if (this.currentPage === numberOfPage) {
      return false;
    }
    return true;
  }
}
