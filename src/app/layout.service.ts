import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { Setting } from './shared/models/setting.model';

@Injectable()
export class LayoutService {
    settingSubject = new Subject<Setting>();
    constructor(private http: Http) { 
        console.log('init service');
    }
    pushSetting(s: Setting) {
        this.settingSubject.next(s);
    }
}