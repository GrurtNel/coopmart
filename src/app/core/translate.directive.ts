import { Directive, Renderer, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { Question, Answer } from '../shared/models/campaign.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({ selector: '[feedbackTranslator]' })

export class TranslatorDirective implements OnInit, OnChanges {

    @Input('feedbackTranslator') content: any;
    @Input() language: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit(): void {
        this.translate()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.translate()
    }

    private translate() {
        if (this.language === 'secondary') {
            this.el.nativeElement.innerText = this.content.i18n_content
            // if (this.content instanceof Question) {
            //     this.el.nativeElement.innerText = this.content.i18n_content
            // }
        } else {
            this.el.nativeElement.innerText = this.content.content
        }
    }
}