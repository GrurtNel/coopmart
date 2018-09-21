import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataScrollerComponent } from './data-scroller.component';
import { DataScrollerPipe } from './data-scroller.pipe';
import { DataScrollerDirective } from './data-scroller.directive';
import { DataScrollerService } from './data-scroller.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [DataScrollerComponent, DataScrollerPipe, DataScrollerDirective],
  exports: [
    DataScrollerPipe,
    DataScrollerComponent
  ],
  providers:[
    DataScrollerService
  ]
})
export class DataScrollerModule { }
