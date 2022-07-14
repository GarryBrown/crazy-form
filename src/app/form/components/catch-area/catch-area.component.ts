import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import CanvasWrapper from "../../domain/CanvasWrapper";
import LetterPicture from "../../domain/LetterPicture";
import LetterGenerator from "../../domain/LetterGenerator";
import config from "../../config";
import {fromEvent, Observable, Subject, tap, timer} from "rxjs";
import {filter} from 'rxjs/operators';
import CatcherPicture from "../../domain/CatcherPicture";
import {EventBusService} from "../../services/event-bus.service";

export enum ArrowKeys {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight"
}

@Component({
  selector: 'app-catch-area',
  templateUrl: './catch-area.component.html',
  styleUrls: ['./catch-area.component.scss']
})
export class CatchAreaComponent implements AfterViewInit {
  @ViewChild("canvas", {static: true}) canvas!: ElementRef<HTMLCanvasElement>;
  canvasWrapper?: CanvasWrapper;
  catcherPicture?: CatcherPicture;
  protected readonly left$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    filter<KeyboardEvent>((e) => e.code === ArrowKeys.ArrowLeft),
    tap(_ => this.catcherPicture?.moveLeft())
  )
  protected readonly right$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    filter<KeyboardEvent>((e) => e.code === ArrowKeys.ArrowRight),
    tap(_ => this.catcherPicture?.moveRight())
  )
  private latterGenerator = new LetterGenerator();
  private generateLetter$: Observable<number> = timer(250, 450).pipe(tap(_ => this.addNewLetter()))

  constructor(private eventBusService: EventBusService) {
  }

  ngAfterViewInit(): void {
    const form: HTMLElement = document.querySelector('form')!;
    const canvasEl = this.canvas.nativeElement;

    // canvasEl.height = (document.documentElement.clientHeight - form.clientHeight);
    canvasEl.height = (window.innerHeight - form.clientHeight);
    // debugger
    canvasEl.width = window.innerWidth;

    const ctx = setupCanvas(canvasEl)

    this.canvasWrapper = new CanvasWrapper(canvasEl, ctx);

    this.catcherPicture = new CatcherPicture(ctx)
    this.canvasWrapper.addPicture(this.catcherPicture);
    this.catcherPicture.onCatch((v) => this.eventBusService.emit('letter-caught',v))

    requestAnimationFrame(() => this.onTick())
    this.generateLetter$.subscribe()
    this.left$.subscribe()
    this.right$.subscribe()
  }


  addNewLetter(): void {
    if (!this.canvasWrapper) {
      return
    }
    this.canvasWrapper.addPicture(this.generate());
  }

  generate(): LetterPicture {
    const x = this.getRandomLetterPos();
    const value = this.latterGenerator.next();
    return new LetterPicture(x, value);
  }

  getRandomLetterPos(): number {
    const time = getRandomInt(0, window.innerWidth / this.latterGenerator.length);
    return time * config.letterWidth;
  }

  onTick(): void {
    if (!this.canvasWrapper) {
      return
    }

    this.canvasWrapper.reRender();
    requestAnimationFrame(() => this.onTick())
  }


}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setupCanvas(canvas: HTMLCanvasElement) {
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  // console.log(rect, dpr)
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  // debugger
  const ctx = canvas.getContext('2d')!;
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}
