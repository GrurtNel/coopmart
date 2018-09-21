import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { MultipleQuestionComponent } from './multiple-question/multiple-question.component';
import { SingleQuestionComponent } from './single-question/single-question.component';
import { QuestionComponent } from './question.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpApi } from '../shared/http';
import { SocketService } from '../shared/socket.service';
import { SelectionItemComponent } from './selection-item/selection-item.component';
import { MultipleControlComponent } from './multiple-question/multiple-control/multiple-control.component';
import { DataScrollerModule } from '../utils/data-scroller/data-scroller.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FeedbackSocketService } from '../shared/feedback-socket.service';
import { LocationService } from '../shared/utils';
import { DeviceService } from './device.service';
import { PreviewComponent } from './preview/preview.component';
import { EntryScreenComponent } from './entry-screen/entry-screen.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { GiftComponent } from './gift/gift.component';
@NgModule({
  imports: [
    DataScrollerModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    QuestionComponent,
    AnswerQuestionComponent,
    MultipleQuestionComponent,
    SingleQuestionComponent,
    SelectionItemComponent,
    MultipleControlComponent,
    GoodbyeComponent,
    AdvertisementComponent,
    PreviewComponent,
    EntryScreenComponent,
    WelcomeScreenComponent,
    GiftComponent
  ],
  exports: [
    QuestionComponent
  ],
  providers: [
    DeviceService,
    HttpApi,
    SocketService,
    FeedbackSocketService,
    LocationService,
  ]
})
export class QuestionModule { }
