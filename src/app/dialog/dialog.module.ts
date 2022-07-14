import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { HostContainerDirective } from './directives/host-container.directive';



@NgModule({
  declarations: [
    DialogComponent,
    HostContainerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
