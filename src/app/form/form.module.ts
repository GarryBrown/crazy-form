import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { InputComponent } from './components/input/input.component';
import { CatchAreaComponent } from './components/catch-area/catch-area.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PopupJumperModule} from "../popup-jumper/popup-jumper.module";



@NgModule({
  declarations: [
    FormComponent,
    InputComponent,
    CatchAreaComponent
  ],
  exports: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopupJumperModule
  ]
})
export class FormModule { }
