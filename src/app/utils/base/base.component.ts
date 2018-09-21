import { Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "../../core/translate.service";

export class BaseComponent {
    @Input() i18n: string
    @Output() i18nChange = new EventEmitter()
}