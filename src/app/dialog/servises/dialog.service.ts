import {Injectable, Type} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }


  // return DialogRef
  open<T>(component: Type<T>, data?: any) {
    this.onOpen$.next({
      component, data
    })
  }


  onOpen$= new Subject<{
    component: Type<any>,
    data: any
  }>();


}
