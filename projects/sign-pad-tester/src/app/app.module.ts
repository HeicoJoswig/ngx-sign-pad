import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { SignPadModule } from 'projects/sign-pad/src/public-api';
import { SignPadModule } from 'ngx-sign-pad';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignPadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
