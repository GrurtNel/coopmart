import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionModule } from './question/question.module';
import { LayoutService } from './layout.service';
import { UrlSerializer } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostComponent } from './host/host.component';
import { HostConfig } from './runtime/project.config';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    HostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [
    LayoutService,
    HostConfig,
    // { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
