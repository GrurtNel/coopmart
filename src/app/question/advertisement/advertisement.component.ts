import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HostConfig } from '../../runtime/project.config';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  videoUrl = ''
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private hostConfig: HostConfig
  ) { }

  ngOnInit() {
    this.videoUrl = `${this.hostConfig.Http + '/static/adv/adv.mp4' + '?ran=' + Math.random()}`;
  }

  onMoveHostSetting() {
    this.router.navigate(['/host'])
  }

  onMoveStoreSetting() {
    this.router.navigate(['/setting'])
  }

  onTurnOnDebug() {
  }
}
