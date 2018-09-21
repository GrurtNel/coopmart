import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { DeviceService } from '../device.service';
import { Survey, Question } from '../../shared/models/campaign.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '../../core/translate.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, OnDestroy {

  @HostBinding('style.background') background;
  survey: Survey;
  subscription: Subscription;
  showingQuestion: Question = <Question>{};
  currentQuestion = 0;
  currentLanguage: string
  constructor(
    private deviceService: DeviceService,
    private activedRoute: ActivatedRoute,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.selectedLanguage.subscribe(res => this.currentLanguage = res)
    this.activedRoute.queryParams.subscribe(p => {
      this.subscription = this.deviceService.getPreviewSurvey(p['survey_id']).subscribe((res: Survey) => {
        this.survey = res;
        this.showingQuestion = this.survey.questions[0];
      });
    });
    this.deviceService.previewAnswerSubject.subscribe(res => {
      let link: number;
      if (res.type === 'single' && res.result) {
        link = res.result[0].link;
      } else {
        link = res.link || res.result[0].link;
      }

      if (link !== -1) {
        this.showingQuestion = this.survey.questions[link];
      } else {
        this.showingQuestion = <Question>{ type: 'tks' };
        setTimeout(() => {
          this.showingQuestion = this.survey.questions[0];
        }, 5000);
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleAnser() {
    this.deviceService.previewAnswerSubject.next(this.showingQuestion);
  }

}
