import { Component, ViewChild, ElementRef, AfterContentInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import SignaturePad, { IOptions } from 'signature_pad';

enum EImageType {
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  JPEG = 'image/jpeg'
}

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
  }
  `]
})
export class SignPadComponent implements AfterContentInit, OnChanges {

  @Input() signature;
  @Output() signatureChange = new EventEmitter<any>();

  @Input() options: IOptions;
  @Output() begin = new EventEmitter();
  @ViewChild('canvasElement') canvasElementRef: ElementRef<HTMLCanvasElement>;

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
    this.signaturePad.onBegin = (value) => { this.begin.emit(value); };
    this.signaturePad.onEnd = () => {
      this.signatureChange.emit(this.signaturePad.toDataURL(EImageType.SVG));
    };
  }

  ngOnChanges() {
    // Todo pipe changed options to signaturePad
  }
}
