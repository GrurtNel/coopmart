import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HostConfig } from '../runtime/project.config';

@Injectable()
export class FeedbackSocketService {
    private ws: WebSocket;
    message$: Subject<any> = new Subject();
    constructor(
        private hostConfig: HostConfig
    ) {
    }
    connect() {
        if (this.ws == null) {
            this.ws = new WebSocket(`${this.hostConfig.WebSocket}/socket/join`);
            // this.ws = new WebSocket(`${environment.feedbackWS}`);
        }
        this.ws.onmessage = (message) => {
            this.message$.next(message.data);
        };
    }
}

export function ObjectToString(params: Object) {
    let result = '';
    let i = 0;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            if (i === 0) {
                result += ('?' + key + '=' + element);
            } else {
                result += ('&' + key + '=' + element);
            }
            i++;
        }
    }
    return result;
}
