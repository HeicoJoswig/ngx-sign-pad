# ngx-sign-pad
ngx-sign-pad is an Angular wrapper for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

## Usage

### 1. Install
`npm install ngx-sign-pad --save`

### 2. Import SignaturePadModule
```typescript

import { SignaturePadModule } from 'angular2-signaturepad';

...

@NgModule({
  declarations: [ ],
  imports: [ SignaturePadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
```

### 3. Use ngx-sign-pad

```typescript
import { Component, ViewChild } from '@angular/core';
import { EImageType, SignPadComponent } from 'ngx-sign-pad';

@Component({
  template: '<ngx-sign-pad [(signature)]="signature" [type]="imageTypes.SVG"></ngx-sign-pad>'
})

export class AppComponent{

  imageTypes = EImageType;
  signature = null;
  @ViewChild(SignPadComponent) signaturePad: SignPadComponent;
  
  constructor() {
  }

  clear() {
    this.signaturePad.clear();
  }
}
```