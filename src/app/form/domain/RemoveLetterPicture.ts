import {PictureAction} from "../types/PictureAction.interface";
import {SymbolPicture} from "./SymbolPicture";

export default class RemoveLetterPicture extends SymbolPicture {
  width = 30;
  height = 30;


  constructor(action: PictureAction) {
    super(action);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 2;
    ctx.beginPath();
    const {x, y} = this.pos;
    const leftX = Math.max(Math.abs(x - this.width / 2), 0);
    const Y = y;

    ctx.moveTo(leftX, Y);
    ctx.lineTo(leftX + this.width / 3, Y + this.height / 2);
    ctx.lineTo(leftX + this.width, Y + this.height / 2);
    ctx.lineTo(leftX + this.width, Y - this.height / 2);
    ctx.lineTo(leftX + this.width / 3, Y - this.height / 2);
    ctx.lineTo(leftX, Y);
    ctx.stroke()

    ctx.lineWidth = 1
  }
}
