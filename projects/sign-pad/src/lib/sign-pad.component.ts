import { Component, ViewChild, ElementRef, AfterContentInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import SignaturePad, { IOptions } from 'signature_pad';

export enum EImageType {
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
    height: 100%;
    width: 100%;
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
      // this.canvasElementRef.nativeElement.getContext('2d').scale(1, 1);
      this.signatureChange.emit(this.signaturePad.toDataURL(EImageType.SVG));
      // this.canvasElementRef.nativeElement.getContext('2d').scale(1, 1);
    };
  }

  ngOnChanges() {
    // Todo pipe changed options to signaturePad
  }
}
