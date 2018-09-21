import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Question, Answer } from '../../shared/models/campaign.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceService } from '../device.service';
import { BaseComponent } from '../../utils/base/base.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-multiple-question',
  templateUrl: './multiple-question.component.html',
  styleUrls: ['./multiple-question.component.css']
})
export class MultipleQuestionComponent extends BaseComponent implements OnInit, OnChanges {
  
  animated = '';

  @Input() question: Question;
  @Input() mode: string;
  @Output() returnFirst = new EventEmitter()
  multipleForm: FormGroup;
  style: any;
  currentPage = 1;
  constructor(
    private deviceService: DeviceService,
    private fb: FormBuilder
  ) { super() }

  ngOnInit() {
    setTimeout(() => {
      this.returnFirst.emit('cancel')
    }, 10000);
    const arr = this.question.answers.map((v, i, a) => {
      return this.fb.control({ i: null });
    });
    this.multipleForm = this.fb.group({
      'answers': this.fb.array(arr)
    });
  }

  ngOnChanges(): void {
    if (this.animated) {
      this.animated = ''
    } else {
      this.animated = 'animated bounceInLeft'
    }
  }

  onAnswer() {
    this.question.result = this.multipleForm.value.answers;
    if (this.mode) {
      this.deviceService.answerPreview(this.question);
    } else {
      console.log('dasdsdsa', this.question)
      this.deviceService.answer(this.question);
    }
  }

  disabled() {
    const answers = <Answer[]>this.multipleForm.value.answers;
    if (this.question.manded) {
      if (!answers.find(a => {
        if (a != null) {
          if (a.content != null) {
            return true
          }
          return false
        }
        return false
      })) {
        return true
      }
    }
    return false;
  }
}
