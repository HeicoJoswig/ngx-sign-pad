import {
  Directive,
  AfterViewInit,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Directive({
  selector: '[libCanvasResize]'
})
export class CanvasResizeDirective implements AfterViewInit {

  @Input() private signaturePad: SignaturePad;

  constructor(private canvasElementRef: ElementRef<HTMLCanvasElement>, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.listen(window, 'resize', () => {
      const current = this.signaturePad.toDataURL();
      this.resizeCanvas();
      this.signaturePad.clear();

      this.signaturePad.fromDataURL(current, {}, (error) => {
        console.log("could not redraw", error);
        this.signaturePad.clear();
      });
    });
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasElementRef.nativeElement;
    const container = this.renderer.parentNode(canvas);
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    this.renderer.setAttribute(canvas, 'width', (container.offsetWidth * ratio).toString());
    this.renderer.setAttribute(canvas, 'height', (container.offsetHeight * ratio).toString());
    canvas.getContext('2d').scale(ratio, ratio);
  }
}
