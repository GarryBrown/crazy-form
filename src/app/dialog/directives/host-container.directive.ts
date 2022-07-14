import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appHostContainer]'
})
export class HostContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
