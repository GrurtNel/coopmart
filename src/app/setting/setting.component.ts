import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SocketService } from '../shared/socket.service';
import { compareObject } from '../shared/utils';
import { Storage } from '../shared/storage';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private feedbackSocket: SocketService
  ) { }

  ngOnInit() {
    console.log(Storage.getLocal('device') || 'not empty');
    let  setting = {
      branch_code: '',
      feedback_code: '',  
      counter_code: ''
    };
    if (!compareObject(Storage.getLocal('device'), {})) {
      setting = Storage.getLocal('device');
    }
    this.settingForm = this.fb.group(setting);
  }

  onJoin() {
    const value = this.settingForm.value;
    value.actor_type = 'feedback';
    Storage.setLocal('device', value);
    this.router.navigate(['/']);
  }
}
