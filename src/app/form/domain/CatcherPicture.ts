import LetterPicture from "./LetterPicture";
import {hasCollision} from "../utils/hasCollision";
import BasePicture from "./BasePicture";

export default class CatcherPicture extends BasePicture {
  width = 50;
  height = 25;
  pos = {
    x: 10,
    y: 10
  }
  private readonly speed = 30;

  // TODO: add parent picture to have partnBounds and possibility to remove
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.pos.x = ctx.canvas.width / 2 - this.width / 2;
    this.pos.y = ctx.canvas.height - this.height;
  }


  override render(ctx: CanvasRenderingContext2D): void {
    this.beforeRender();
    const maxY = ctx.canvas.height
    const {pos} = this;
    const leftCorner = Math.max(Math.abs(pos.x - this.width / 2), 0);
    const rightCorner = Math.min(Math.abs(pos.x + this.width / 2), ctx.canvas.width);

    ctx.beginPath();
    // ctx.lineWidth = 15;
    ctx.moveTo(leftCorner, maxY - this.height)
    ctx.lineTo(leftCorner, maxY);
    ctx.lineTo(rightCorner, maxY)
    ctx.lineTo(rightCorner, maxY - this.height);
    ctx.stroke()
  }

  moveLeft(): void {
    this.pos.x -= this.speed
  }

  moveRight(): void {
    this.pos.x += this.speed
  }

  onCatch(fn: (v: string) => void): void {
    this.onCatchFn = fn;
  }

  private beforeRender(): void {
    const letters = this.parent.getPictures()
      .filter(v => v instanceof LetterPicture) as LetterPicture[];
    letters
      .filter(v => this.isLetterCaught(v))
      .forEach(v => {
        this.onCatchFn(v.getLetter())
        v.destroy()
      })
  }

  private onCatchFn = (v:string) => {}

  private isLetterCaught(val: LetterPicture): boolean {
    const catcher = {
      ...this.rect,
      x: Math.max(Math.abs(this.pos.x - this.width / 2), 0)
    }

    return hasCollision(catcher, val.rect);
  }
}

// TODO:
// each render fn call  apply color and font
// each Picture class have only logic and size class must be attached
