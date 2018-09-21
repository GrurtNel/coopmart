import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { checkEmptyObject } from './shared/utils';
import { environment } from '../environments/environment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { HostConfig } from './runtime/project.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'app';
  /**
   *
   */
  constructor(
    private sanitizer: DomSanitizer,
    private hostConfig: HostConfig
  ) { }

  ngOnInit() {
    this.background = this.sanitizer.bypassSecurityTrustStyle(
      `url("${this.hostConfig.Http}/static/setting/background?ran=${Math.random()}")`
    );
  }

  @HostBinding('style.background-image')
  public background: SafeStyle;
}
