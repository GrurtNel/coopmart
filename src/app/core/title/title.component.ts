import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../shared/models/campaign.model';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styles:  [
    `
    .screen-title {
      font-size: 32px;
      margin: 40px 0 40px 0;
    }
    .question-title {
      /* margin: 5% 0 5% 0; */
      height: 40vh;
      background-image: url("assets/images/bg_above.jpg");
      background-position: center;
      background-size: cover,contain;
      margin-bottom: 32px;
    }
  `
  ]
})
export class TitleComponent implements OnInit {
  @Input() title: Question
  @Input() bigTitle: string
  currentLanguage: string
  constructor(
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.selectedLanguage.subscribe(res => this.currentLanguage = res)
  }

}
