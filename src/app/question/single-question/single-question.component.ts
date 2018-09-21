import { Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Question, Answer } from '../../shared/models/campaign.model';
import { DeviceService } from '../device.service';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styles: [
    `.answer-item{
      width:15%;
      margin:10px 20px 40px 20px;
      padding-top: 30px;
      text-align: center;
      background-image:url('assets/images/bg_btnselect.png');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
  }
  .answer-item img {
      width: 50%;
      height: auto;
  }
  .answer-text {
    display:block;
    margin-top:0.4em; 
    font-size: 18px;
    font-weight:bolder;
    line-height:1;
    color:#0075b8;
  }
  `
  ]
})
export class SingleQuestionComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() question: Question;
  @Input() mode: string;
  @ViewChild('animate') animate;
  @Output() returnFirst = new EventEmitter()
  selectAnswer = -1;
  currentPage = 1;
  animated = '';
  constructor(
    private deviceService: DeviceService,
  ) { super() }

  ngOnInit() {
    setTimeout(() => {
      this.returnFirst.emit('cancel')
    }, 10000);
  }

  onSelect(a: Answer, i: number) {
    if (this.question.result && this.selectAnswer === i) {
      this.selectAnswer = -1;
      this.question.result = null;
    } else {
      this.selectAnswer = i;
      this.question.result = <Answer[]>[a];
    }
  }

  onAnswer() {
    if (this.mode) {
      this.deviceService.answerPreview(this.question);
    } else {
      this.deviceService.answer(this.question);
    }
    this.selectAnswer = -1;
  }


  ngOnChanges(): void {
    console.log('changed on single');
    this.animated = 'animated bounceInLeft'
    setTimeout(() => {
      this.animated = ''
    }, 1000);
    // if (this.animated) {
    //   this.animated = ''
    //   this.animated = 'animated bounceInLeft'
    // } else {
    //   this.animated = 'animated bounceInLeft'
    // }
  }

  disabled() {
    return !this.question.result && this.question.manded;
  }
}
