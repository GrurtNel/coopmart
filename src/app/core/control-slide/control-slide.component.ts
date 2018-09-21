import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-slide',
  templateUrl: './control-slide.component.html',
  styleUrls: ['./control-slide.component.css']
})
export class ControlSlideComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit() {
  }

}
