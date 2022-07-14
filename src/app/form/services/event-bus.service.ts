import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private source = new Subject<{ [key: string]: any }>()

  emit<T>(eventName: string, value: T): void {
    this.source.next({[eventName]: value})
  }

  on<T>(eventName: string): Observable<T> {
    return this.source.asObservable().pipe(
      filter(v => v.hasOwnProperty(eventName)),
      map(v => v[eventName])
    );
  }


}
