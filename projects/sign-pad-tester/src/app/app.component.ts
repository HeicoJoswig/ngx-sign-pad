import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signature = null;

  constructor() {
  }

  onEnd(data) {
    console.log("data", data);

    console.log("signature", this.signature);
  }
}
