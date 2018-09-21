import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostConfig } from '../runtime/project.config';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  host: string = localStorage.getItem('feedback_host') || '';
  cetmSocket: string = localStorage.getItem('cetm_socket') || '';
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private hostConfig: HostConfig
  ) { }

  ngOnInit() {
  }

  onNext() {
    // var httpLocation = `${location.protocol}//${this.host}`;
    // var wsLocation = location.protocol.startsWith('http') ? 'ws://' + this.host : 'wss://' + this.host;

    this.hostConfig.Update(this.host);
    localStorage.setItem('feedback_host', this.hostConfig.data.host);
    localStorage.setItem('cetm_socket', this.cetmSocket);
    this.router.navigate(['/']);
  }

}
