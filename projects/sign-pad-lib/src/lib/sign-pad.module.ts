import { NgModule } from '@angular/core';
import { SignPadComponent } from './sign-pad.component';
import { CanvasResizeDirective } from './canvas-resize.directive';

@NgModule({
  declarations: [SignPadComponent, CanvasResizeDirective],
  imports: [
  ],
  exports: [SignPadComponent]
})
export class SignPadModule { }
