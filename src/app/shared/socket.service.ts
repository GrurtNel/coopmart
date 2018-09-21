import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HostConfig } from '../runtime/project.config';

@Injectable()
export class SocketService {
    private ws: WebSocket;
    message$: Subject<any> = new Subject();
    constructor(
        private hostConfig: HostConfig
    ) {
    }
    connect(param: any) {
        const uri = ObjectToString(param);
        // if (this.ws == null) {
            // this.ws = new WebSocket(`${environment.baseWS}${uri}`);
            this.ws = new WebSocket(`${this.hostConfig.CetmWebSocket}${uri}`);
        // }
        this.ws.onmessage = (message) => {
            const response = <string>message.data;
            const temp = response.split(' ');
            const data = JSON.parse(response.substr(response.indexOf(' ') + 1));
            if (temp[0] === '/error') {
                this.message$.error(data);
            } else {
                this.message$.next(data);
            }
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
