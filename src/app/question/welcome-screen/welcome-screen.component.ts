import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../entry-screen/entry-screen.component';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  @Input() employee: Employee
  @Output() continue = new EventEmitter()
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.continue.emit('cancel')
    }, 10000);
  }

  onContinue() {
    console.log('on continue')
    this.continue.emit()
  }

}
