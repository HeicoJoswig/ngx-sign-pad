import { Component, ViewChild, ElementRef, AfterContentInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import SignaturePad from 'signature_pad';
import { EImageType } from './models/image-type.enum';
import { SignaturePadOptions } from './models/signaturePadOptions';

@Component({
  selector: 'ngx-sign-pad',
  template: `<canvas #canvasElement libCanvasResize [debounceTime]="options?.debounceTime" [signaturePad]="signaturePad"></canvas>`,
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
export class SignPadComponent implements AfterContentInit {

  @Input() signature: string;
  @Output() signatureChange = new EventEmitter<string>();

  @Input() type: EImageType | string;
  @Input() set options(value: SignaturePadOptions) {
    Object.assign(this._options, value);
  };

  get options() : SignaturePadOptions {
    return this._options;
  }

  @ViewChild('canvasElement') canvasElementRef: ElementRef<HTMLCanvasElement>;

  public signaturePad: SignaturePad;
  private _options: SignaturePadOptions;

  constructor() {
    this._options = {
      dotSize: 1,
      minWidth: 1,
      maxWidth: 2,
      penColor: 'rgb(0, 0, 0)',
      debounceTime: 10
    };
  }

  ngAfterContentInit() {
    this.signaturePad = new SignaturePad(this.canvasElementRef.nativeElement, this.options);
    this.signaturePad.onEnd = () => {
      this.signatureChange.emit(this.signaturePad.toDataURL(this.type));
    };
  }

  clear(){
    this.signaturePad.clear();
    this.signatureChange.emit(this.signaturePad.toDataURL(this.type));
  }

}
