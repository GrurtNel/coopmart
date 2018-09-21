import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../../shared/models/campaign.model';

@Component({
  selector: 'app-selection-item',
  templateUrl: './selection-item.component.html',
  styleUrls: ['./selection-item.component.css']
})
export class SelectionItemComponent implements OnInit {
  selection = -1;
  @Input() answer: Answer;
  constructor() { }

  ngOnInit() {
  }

  onSelect(a: Answer, i: number) {
    if (this.selection === i) {
      this.selection = -1;
    } else {
      this.selection = i;
    }
  }
  
}
