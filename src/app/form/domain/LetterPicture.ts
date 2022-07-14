import config from "../config";
import BasePicture from "./BasePicture";

export default class LetterPicture extends BasePicture {
  width = 14;
  height = 14;
  pos = {
    x: 0,
    y: -0
  }
  private speed: number = 180 / 60;

  constructor(x: number, private value: string) {
    super();
    this.pos.x = x;
  }

  getLetter(): string {
    return this.value;
  }

  updatePos(): void {
    this.pos.y = this.pos.y + this.speed;
  }

  destroy(): void {
    this.parent.remove(this);
  }

  // TODO; implement destroy fn
  render(ctx: CanvasRenderingContext2D): void {
    this.updatePos();
    if (this.pos.y > ctx.canvas.height) {
      this.destroy()
      return;
    }
    // ctx.rect(10, 10, 10, 10);
    // ctx.fillText(this.value, this.pos.x, this.pos.y);
    ctx.strokeText(this.value, this.pos.x, this.pos.y, config.letterWidth);
  }
}
