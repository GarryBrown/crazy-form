import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupJumperComponent } from './components/popup-jumper/popup-jumper.component';



@NgModule({
  declarations: [
    PopupJumperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopupJumperComponent
  ]
})
export class PopupJumperModule { }
