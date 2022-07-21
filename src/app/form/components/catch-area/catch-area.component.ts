import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import CanvasWrapper from "../../domain/CanvasWrapper";
import {fromEvent, Observable, tap, throttleTime} from "rxjs";
import CatcherPicture from "../../domain/CatcherPicture";
import {EventBusService} from "../../services/event-bus.service";
import {setupCanvas} from "../../utils/setupCanvas";
import {SymbolGenerator} from "../../domain/SymbolGenerator";
import {Picture} from "../../types/Picture.interface";


@Component({
  selector: 'app-catch-area',
  templateUrl: './catch-area.component.html',
  styleUrls: ['./catch-area.component.scss']
})
export class CatchAreaComponent implements AfterViewInit {
  @ViewChild("canvas", {static: true}) canvas!: ElementRef<HTMLCanvasElement>;
  canvasWrapper?: CanvasWrapper;
  catcherPicture?: CatcherPicture;

  constructor(private eventBusService: EventBusService) {
  }

  ngAfterViewInit(): void {
    const form: HTMLElement = document.querySelector('form')!;
    const canvasEl = this.canvas.nativeElement;

    canvasEl.height = (window.innerHeight - form.clientHeight);
    canvasEl.width = window.innerWidth;

    const ctx = setupCanvas(canvasEl)

    this.canvasWrapper = new CanvasWrapper(canvasEl, ctx);


    this.catcherPicture = new CatcherPicture(ctx)
    this.canvasWrapper.addPicture(this.catcherPicture);
    this.catcherPicture.onCatch((v) => this.eventBusService.emit('letter-caught', v))

    SymbolGenerator.letter$(canvasEl.width).subscribe(value => this.addPicture(value))
    SymbolGenerator.clear$(canvasEl.width).subscribe(value => this.addPicture(value))
    requestAnimationFrame(() => this.onTick())

    this.createMouseListener().subscribe()
  }

  addPicture(value: Picture): void {
    if (!this.canvasWrapper) {
      return
    }
    this.canvasWrapper.addPicture(value);
  }

  onTick(): void {
    if (!this.canvasWrapper) {
      return
    }

    this.canvasWrapper.reRender();
    requestAnimationFrame(() => this.onTick())
  }

  private createMouseListener(): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(this.canvas.nativeElement, 'mousemove').pipe(
      throttleTime(5),
      tap(e => {
        this.catcherPicture?.moveTo(e.offsetX, e.offsetY)
      })
    )
  }

}


