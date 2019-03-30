import { Component, ViewChild, ElementRef, AfterContentInit, EventEmitter, Output, Input } from '@angular/core';
import SignaturePad, { IOptions } from 'signature_pad';

@Component({
  selector: 'lib-sign-pad',
  template: `<canvas #canvasElement libCanvasResize [signaturePad]="signaturePad"></canvas>`,
  styles: [`
  :host {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }
  :host canvas {
    position: relative;
    border: 1px dashed red;
  }
  `]
})
export class SignPadComponent implements AfterContentInit {
  @Input() options: IOptions;
  @Output() beginChange = new EventEmitter();
  @Output() endChange = new EventEmitter();
  @ViewChild('canvasElement') canvasElementRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerElementRef: ElementRef<HTMLElement>;

  public signaturePad: SignaturePad;

  constructor() {
    this.options = {
      dotSize: 1,
      minWidth: 1,
      maxWidth: 2,
      penColor: 'rgb(0, 0, 0)'
    };
  }

  ngAfterContentInit() {
    this.signaturePad = new SignaturePad(this.canvasElementRef.nativeElement, this.options);
  }
}
