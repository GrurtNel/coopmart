import { Campaign, Survey, Question } from './campaign.model';
import { Storage } from '../storage';

export class Result {
    uname: string;
    device: string;
    store: string;
    at: number;
    counter: string;
    campaign: string;
    campaign_id: string;
    question: string;
    channel: string;
    feedback_detail: FeedbackDetail[];
    survey_detail: SurveyDetail[];
    location: string;
    avg: number;
    constructor() {
        this.feedback_detail = [];
        this.survey_detail = [];
    }

    initResult(config, campaign?: Campaign, survey?: Survey, question?: Question, channel?: string, location?: string) {
        if (config) {
            this.counter = config.counter_activities.name;
            this.uname = config.counter_activities.data.uname;
            this.device = Storage.getLocal('device').feedback_code;
            this.channel = 'store';
        }
        if (survey) {
            this.campaign = campaign.name;
            this.campaign_id = campaign.id;
            const feedbackDetail = FeedbackDetail.getInstance(question);
            let surveyTemp = this.survey_detail.find(s => s.survey_id === survey.id);
            if (surveyTemp) {
                surveyTemp.feedback_detail.push(feedbackDetail);
            } else {
                surveyTemp = {
                    survey_id: survey.id,
                    survey_name: survey.name,
                    feedback_detail: [feedbackDetail]
                };
                this.survey_detail.push(surveyTemp);
            }
        }
        if (channel) {
            this.channel = channel;
        }
    }
    refresh() {
        this.survey_detail = [];
        this.feedback_detail = [];        
    }
}
class SurveyDetail {
    survey_id: string;
    survey_name: string;
    feedback_detail: FeedbackDetail[];
}
class FeedbackDetail {
    content: string;
    answer: string;
    point: number;
    max_point: number;
    type: string;

    static getInstance(q: Question) {
        if (q.type === 'single') {
            return {
                content: q.content,
                answer: q.result ? q.result[0].content : '',
                point: q.result ? q.result[0].point : 0,
                max_point: q.point,
                type: q.type
            };

        } else if (q.type === 'multiple') {
            q.result.filter(r => r ? r.content : r).map(v => v.content).toString();
            return {
                content: q.content,
                answer: q.result.filter(r => r ? r.content : r).map(v => v.content).toString(),
                point: q.result.filter(r => r ? r.content : r).reduce((a, b) => {
                    return a + b.point;
                }, 0),
                max_point: q.point,
                type: q.type
            };
        } else {
            return { content: q.content, answer: q.result[0].content, point: q.point, max_point: q.point, type: q.type };
        }
    }
}
