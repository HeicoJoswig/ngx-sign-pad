import {
  Directive,
  AfterViewInit,
  Renderer2,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Directive({
  selector: '[libCanvasResize]'
})
export class CanvasResizeDirective implements OnInit, AfterViewInit {

  @Input() private signaturePad: SignaturePad;

  // @ViewChild('canvasElement') canvasElementRef: ElementRef<HTMLCanvasElement>;
  // @ViewChild() private containerElementRef: ElementRef<HTMLElement>;
  // @ComponentRef() private canvasElementRef: ElementRef<HTMLCanvasElement>;

  constructor(private canvasElementRef: ElementRef<HTMLCanvasElement>, private renderer: Renderer2) {
    console.log("ctor");
  }

  ngOnInit() {
    console.log("onInit");
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.renderer.listen(window, 'resize', () => {
      console.log("window resize");
      this.resizeCanvas();
    });
    // window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();
  }

  private resizeCanvas() {
    console.log("canvas resize");
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = this.canvasElementRef.nativeElement;
    const container = this.canvasElementRef.nativeElement.parentElement;

    console.log("ratio", ratio);
    console.log("offsetWidth", canvas.offsetWidth);
    console.log("offsetHeight", canvas.offsetHeight);

    // this.renderer.setStyle(canvas, 'width', canvas.offsetWidth * ratio);
    // this.renderer.setStyle(canvas, 'height', canvas.offsetHeight * ratio);


    this.renderer.setAttribute(canvas, 'width', Math.floor(container.offsetWidth * ratio).toString());
    this.renderer.setAttribute(canvas, 'height', Math.floor(container.offsetHeight * ratio).toString());


    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

}
