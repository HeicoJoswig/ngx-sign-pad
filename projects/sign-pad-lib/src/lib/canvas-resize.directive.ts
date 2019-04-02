import {
  Directive,
  AfterViewInit,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';
import SignaturePad from 'signature_pad';
import { EImageType } from './models/image-type.enum';

@Directive({
  selector: '[libCanvasResize]'
})
export class CanvasResizeDirective implements AfterViewInit {

  @Input() private signaturePad: SignaturePad;
  @Input() private debounceTime?: number;

  constructor(private canvasElementRef: ElementRef<HTMLCanvasElement>, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.listen(window, 'resize', () => {
      const currentSignature = this.signaturePad.toDataURL(EImageType.PNG);
      setTimeout(() => {
        this.resizeCanvas();
        this.signaturePad.clear();
        const canvas = this.canvasElementRef.nativeElement;
        this.signaturePad.fromDataURL(currentSignature,
          {
            ratio: Math.max(window.devicePixelRatio || 1, 1),
            height: parseFloat(canvas.getAttribute('height')),
            width: parseFloat(canvas.getAttribute('width'))
          },
          (error) => {
            if (error) {
              this.signaturePad.clear();
            }
          });
      }, this.debounceTime | 100);
    });
    this.resizeCanvas();
  }

  private resizeCanvas(initial: boolean = false) {
    const canvas = this.canvasElementRef.nativeElement;
    const container = this.renderer.parentNode(canvas);
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    if (container.offsetHeight && container.offsetWidth) {
      this.renderer.setAttribute(canvas, 'width', (container.offsetWidth * ratio).toString());
      this.renderer.setAttribute(canvas, 'height', (container.offsetHeight * ratio).toString());
      canvas.getContext('2d').scale(ratio, ratio);
    } else if (initial) {
      setTimeout(() => { this.resizeCanvas(true) }, this.debounceTime | 100);
    }
  }

}
