import {hasCollision} from "../utils/hasCollision";
import BasePicture from "./BasePicture";
import {PictureAction} from "../types/PictureAction.interface";
import {SymbolPicture} from "./SymbolPicture";

export default class CatcherPicture extends BasePicture {
  width = 50;
  height = 25;
  pos = {
    x: 10,
    y: 10
  }

  // TODO: add parent picture to have partnBounds and possibility to remove
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.pos.x = ctx.canvas.width / 2 - this.width / 2;
    this.pos.y = ctx.canvas.height - this.height;
  }


  override render(ctx: CanvasRenderingContext2D): void {
    this.beforeRender();
    const {pos} = this;
    const leftX = Math.max(Math.abs(pos.x - this.width / 2), 0);
    const topY = Math.max(Math.abs(pos.y - this.height / 2), this.height / 2);
    const bottomY = Math.min(Math.max(pos.y, this.height) + this.height / 2, ctx.canvas.height);
    const rightX = Math.min(Math.abs(pos.x + this.width / 2), ctx.canvas.width);

    ctx.beginPath();
    ctx.moveTo(leftX, topY)
    ctx.lineTo(leftX, bottomY);
    ctx.lineTo(rightX, bottomY)
    ctx.lineTo(rightX, topY);

    ctx.stroke()
  }

  moveTo(x: number, y: number): void {
    this.pos = {x, y}
  }

  onCatch(fn: (v: PictureAction) => void): void {
    this.onCatchFn = fn;
  }

  private beforeRender(): void {
    const letters = this.parent.getPictures()
      .filter(v => v instanceof SymbolPicture) as SymbolPicture[];
    letters
      .filter(v => this.isLetterCaught(v))
      .forEach(v => {
        this.onCatchFn(v.getAction())
        v.destroy()
      })
  }

  private onCatchFn = (v: PictureAction) => {
  }

  private isLetterCaught(val: BasePicture): boolean {
    return hasCollision(this.rect, val.rect);
  }
}
