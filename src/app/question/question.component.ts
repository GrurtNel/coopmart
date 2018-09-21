import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../shared/socket.service';
import { Campaign, Question } from '../shared/models/campaign.model';
import { Result } from '../shared/models/result.model';
import { Storage } from '../shared/storage';
import { checkEmptyObject, LocationService } from '../shared/utils';
import { Http } from '@angular/http';
import { LayoutService } from '../layout.service';
import { FeedbackSocketService } from '../shared/feedback-socket.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from './device.service';
import { TranslateService } from '../core/translate.service';
import { NgForm } from '@angular/forms';
import { Employee } from './entry-screen/entry-screen.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  campaign: Campaign = <Campaign>{};
  showingQuestion: Question = <Question>{};
  result: Result = new Result();
  currentLanguage: string
  channel: string
  showAlertNoCampaign = false
  bonusContent = ''
  giftCode = 0;
  employee: Employee
  @HostBinding('style.background') background;
  constructor(
    private deviceService: DeviceService,
    private feedbackSocketService: FeedbackSocketService,
    private socketService: SocketService,
    private http: Http,
    private layoutService: LayoutService,
    private activedRoute: ActivatedRoute,
    private locationService: LocationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.selectedLanguage.subscribe(res => this.currentLanguage = res)
    this.showingQuestion = <Question>{ type: 'entry' }
    // this.activedRoute.queryParams.subscribe(res => {
    //   if (checkEmptyObject(res)) {
    //     this.loadSetting();
    //     this.handleAnser();
    //     this.handleSocket();
    //   } else {
    //     if (res.channel) {
    //       this.channel = res.channel
    //       this.loadSetting();
    //       this.result.initResult(null, null, null, null, res.channel)
    //       this.getCampaign(null, res.channel);
    this.handleAnser();
    //     }
    //   }
    // });
  }

  onScanQrcode($event) {
    this.employee = $event
    this.showingQuestion = <Question>{ type: 'welcome', content: 'Bộ phận: ' + this.employee.dept, summary: 'Kính chào: Mr/Ms. ' + this.employee.name }
  }

  onStartSurvey($event) {
    if ($event === 'cancel') {
      this.result.refresh();
      this.showingQuestion = <Question>{ type: 'entry' }
    } else {
      this.getCampaign(null, 'website')
    }
  }



  loadSetting() {
    this.feedbackSocketService.connect();
    // this.feedbackSocketService.message$.subscribe(res => {
    //   window.location.reload(true);
    // });
  }

  handleSocket() {
    const setting = Storage.getLocal('device');
    this.socketService.connect(setting);
    this.socketService.message$.subscribe(res => {
      if (res.counter_activities) {
        this.result.initResult(res);
      }
      if (res[0]) {
        this.result.store = res[0].branch.name;
      }
      if (res.action === 'call') {
        this.getCampaign(setting.feedback_code)
        this.translateService.changeLanguage('primary')
      } else if (res.action === 'finish') {
      }
    }, err => console.log(err));
  }

  getCampaign(device: string, channel?: string) {
    this.deviceService.getCampaigns(device, channel).subscribe(res => {
      if (!checkEmptyObject(res)) {
        this.showAlertNoCampaign = false
        this.campaign = <Campaign>res;
        const surveys = this.campaign.survey;
        if (surveys) {
          this.showingQuestion = surveys[0].questions[0];
        }
      } else {
        this.showAlertNoCampaign = true
      }
    }
    );
  }


  sendLuckyInformation() {
    var body = { name: this.employee.name, gift_code: this.giftCode, bonus_content: this.bonusContent }
    this.deviceService.sendLuckyInformation(body).subscribe(res => {
      console.log('send lucky user')
    })
  }

  handleAnser() {
    this.deviceService.answerSubject.subscribe(res => {
      const q = <Question>res;
      this.result.initResult(null, this.campaign, this.campaign.survey[flag], q);
      const question = getNextQuestion(this.campaign, q);
      if (question) {
        this.showingQuestion = question;
      } else {
        this.result.channel = 'website'
        this.deviceService.addResult(this.result).subscribe(resp => {
          this.feedbackSocketService.message$.next(this.result);
          if (resp.lucky_number) {
            this.bonusContent = resp.bonus_content
            this.showingQuestion = <Question>{ type: 'gift', content: 'Bộ phận: ' + this.employee.dept, summary: 'Kính chào: Mr/Ms. ' + this.employee.name }
            this.giftCode = resp.gift_code
            this.sendLuckyInformation()
          } else {
            const temp = <Question>{ type: 'tks', content: 'Bộ phận: ' + this.employee.dept, summary: 'Kính chào: Mr/Mrs. ' + this.employee.name };
            this.showingQuestion = temp;
          }
          this.result.refresh();
        }, err => console.log(err));
        // move up
        // const temp = <Question>{ type: 'tks', content: 'Bộ phận: ' + this.employee.dept, summary:'Kính chào: Mr/Mrs. '+this.employee.name };
        // this.showingQuestion = temp;
        setTimeout(() => {
          this.result.refresh();
          if (this.channel === 'website') {
            this.getCampaign(null, 'website')
          } else {
            this.showingQuestion = <Question>{ type: 'entry' };
          }
        }, 7000);
      }
    });
  }
  showAlert() {
    const setting = Storage.getLocal('device');
    this.deviceService.getCampaigns(setting.feedback_code, '').subscribe(res => {
      if (checkEmptyObject(res)) {
        this.showAlertNoCampaign = true
      }
    })
  }
}

let flag = 0;
function getNextQuestion(campaign: Campaign, current: Question) {
  let link: number;
  // cau single neu khong chon dap an nao se link luon cau
  if (current.type === 'single' && current.result) {
    link = current.result[0].link;
  } else {
    link = current.link || current.result[0].link;
  }
  if (link !== -1) {
    return campaign.survey[flag].questions[link];
  } else {
    if (flag < campaign.survey.length - 1) {
      flag++;
      return campaign.survey[flag].questions[0];
    } else {
      flag = 0;
      return null;
    }
  }
}
