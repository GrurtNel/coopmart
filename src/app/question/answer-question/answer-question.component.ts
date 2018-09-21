import { Component, OnInit, Input } from '@angular/core';
import { Question, Answer } from '../../shared/models/campaign.model';
import { DeviceService } from '../device.service';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent extends BaseComponent implements OnInit {
  @Input() question: Question;
  @Input() mode: string;
  answerContent: string;
  constructor(
    private deviceService: DeviceService
  ) { super() }

  ngOnInit() {
  }

  onAnswer() {
    this.question.result = <Answer[]>[{ content: this.answerContent, point: this.question.point }];
    if (this.mode) {
      this.deviceService.answerPreview(this.question);
    } else {
      this.deviceService.answer(this.question);
    }
  }

  disabled() {
    if (this.question.manded && !this.answerContent) {
      return true
    }
    return false
  }
}
