import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { ControlSlideComponent } from './control-slide/control-slide.component';
import { TranslateService } from './translate.service';
import { TranslatorDirective } from './translate.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    ControlSlideComponent,
    TranslatorDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    ControlSlideComponent,
    TranslatorDirective
  ],
  providers: [
    TranslateService
  ]
})
export class CoreModule { }
