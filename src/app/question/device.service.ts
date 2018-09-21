import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question, Campaign } from '../shared/models/campaign.model';
import { HttpApi } from '../shared/http';
import { Result } from '../shared/models/result.model';

@Injectable()
export class DeviceService {
    public answerSubject = new Subject<Question>();
    public previewAnswerSubject = new Subject<Question>();
    constructor(
        private http: HttpApi<any>
    ) { }

    answer(q: Question) {
        this.answerSubject.next(q);
    }

    answerPreview(q: Question) {
        this.previewAnswerSubject.next(q);
    }

    getPreviewSurvey(surveyID: string) {
        return this.http.Get('/api/survey/get', { id: surveyID });
    }

    addResult(r: Result) {
        return this.http.Post('/api/survey/result/create ', r);
    }

    getCampaigns(device, channel: string) {
        return this.http.Get('/api/campaign/device/get', { device_id: device, channel: channel, at: new Date().getTime() })
    }

    sendLuckyInformation(body: any) {
        return this.http.Post('/api/survey/lucky_user/create', body)
    }
}