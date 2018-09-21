import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

  @Input() giftCode: number
  constructor() { }

  ngOnInit() {
  }

}
