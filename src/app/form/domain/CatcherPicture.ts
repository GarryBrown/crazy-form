import {hasCollision} from "../utils/hasCollision";
import BasePicture from "./BasePicture";
import {PictureAction} from "../types/PictureAction.interface";
import {SymbolPicture} from "./SymbolPicture";

export default class CatcherPicture extends BasePicture {
  width = 50;
  height = 25;
  pos = {x: 0, y: 0}
  private isCaught = false;
  private timeOutFnId: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.pos.x = ctx.canvas.width / 2 - this.width / 2;
    this.pos.y = ctx.canvas.height - this.height;
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.beforeRender();
    if (this.isCaught) {
      this.drawWhenCaught(ctx)
    } else {
      this.defaultDraw(ctx);
    }
  }

  moveTo(x: number, y: number): void {
    this.pos = {x, y}
  }

  onCatch(fn: (v: PictureAction) => void): void {
    this.onCatchFn = fn;
  }

  private getPivot(ctx: CanvasRenderingContext2D): { leftX: number,  topY: number, bottomY: number, rightX: number } {
    const {pos} = this;
    const leftX = Math.floor(Math.max(Math.abs(pos.x - this.width / 2), 0));
    const topY = Math.floor(Math.max(Math.abs(pos.y - this.height / 2), this.height / 2));
    const bottomY = Math.floor(Math.min(Math.max(pos.y, this.height) + this.height / 2, ctx.canvas.height));
    const rightX = Math.floor(Math.min(Math.abs(pos.x + this.width / 2), ctx.canvas.width));

    return {leftX, topY, bottomY, rightX}
  }

  private defaultDraw(ctx: CanvasRenderingContext2D): void {

    const {leftX, topY, bottomY, rightX} = this.getPivot(ctx);

    ctx.beginPath();

    ctx.moveTo(leftX, topY)
    ctx.lineTo(leftX, bottomY);
    ctx.lineTo(rightX, bottomY)
    ctx.lineTo(rightX, topY);

    ctx.stroke()
  }

  private drawWhenCaught(ctx: CanvasRenderingContext2D): void {
    const {pos} = this;
    const {leftX, topY, bottomY, rightX} = this.getPivot(ctx);

    ctx.beginPath();

    ctx.moveTo(pos.x, topY)
    ctx.lineTo(leftX, bottomY);
    ctx.lineTo(rightX, bottomY)
    ctx.lineTo(pos.x, topY);

    ctx.stroke()
  }

  private _onCatchFn(v: SymbolPicture): void {
    this.isCaught = true;
    this.onCatchFn(v.getAction())
    v.destroy();
    if (this.timeOutFnId) {
      clearTimeout(this.timeOutFnId)
    }
    this.timeOutFnId = setTimeout(() => this.isCaught = false, 150)
  }

  private beforeRender(): void {
    const letters = this.parent.getPictures()
      .filter(v => v instanceof SymbolPicture) as SymbolPicture[];
    letters
      .filter(v => this.isLetterCaught(v))
      .forEach(v => this._onCatchFn(v))
  }

  private onCatchFn = (v: PictureAction) => {
  }

  private isLetterCaught(val: BasePicture): boolean {
    return hasCollision(this.rect, val.rect);
  }
}
