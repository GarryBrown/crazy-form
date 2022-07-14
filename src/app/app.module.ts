import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormModule} from "./form/form.module";
import {DialogModule} from "./dialog/dialog.module";
import {PopupJumperModule} from "./popup-jumper/popup-jumper.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormModule,
    DialogModule,
    PopupJumperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
