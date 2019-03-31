import { Component } from '@angular/core';
import { EImageType } from 'projects/sign-pad/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageTypes = EImageType;
  signature = null;

  constructor() {
  }

  onEnd(data) {
    console.log("data", data);

    console.log("signature", this.signature);
  }
}
