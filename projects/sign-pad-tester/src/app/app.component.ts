import { Component, ViewChild, ElementRef, AfterContentInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import SignaturePad, { IOptions } from 'signature_pad';
import { Renderer3 } from '@angular/core/src/render3/interfaces/renderer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'sign-pad-tester';

  @Input() options: IOptions;
  @Output() beginChange = new EventEmitter();
  @Output() endChange = new EventEmitter();
  @ViewChild('canvasElement') canvasElementRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerElementRef: ElementRef<HTMLElement>;

  private signaturePad: SignaturePad;

  constructor(private renderer: Renderer2) {
    this.options = {
      dotSize: 1,
      minWidth: 1,
      maxWidth: 2,
      penColor: 'rgb(0, 0, 0)'
    };
  }

  ngAfterContentInit() {
    this.signaturePad = new SignaturePad(this.canvasElementRef.nativeElement, this.options);
    console.log('signaturePad', this.signaturePad);

    this.renderer.listen(window, 'resize', () => {
      console.log("window resize");
      this.resizeCanvas();
    });
    // window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();
  }

  private resizeCanvas() {
    console.log("canvas resize");
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    const canvas = this.canvasElementRef.nativeElement;
    const container = this.containerElementRef.nativeElement;

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
