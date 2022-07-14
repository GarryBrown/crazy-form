import {Component, HostBinding, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {DialogService} from "../../servises/dialog.service";
import {HostContainerDirective} from "../../directives/host-container.directive";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild(HostContainerDirective, { static: true}) host!:HostContainerDirective;
  @HostBinding('class.opened') opened = false

  constructor(private dialog: DialogService) { }

  ngOnInit(): void {
    this.dialog.onOpen$.subscribe(c => this.smth(c.component, c.data))
  }


  private smth(com: Type<any>, data?: any):void {
    this.opened = true;
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    const component = viewContainerRef.createComponent(com);
    component.instance.data = data;
    // this.clear(viewContainerRef)
  }

  clear(viewContainerRef: ViewContainerRef):void {
    setTimeout(() => {
      viewContainerRef.clear()
    }, 2000)
  }

}
