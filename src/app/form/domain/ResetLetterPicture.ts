import {PictureAction} from "../types/PictureAction.interface";
import {SymbolPicture} from "./SymbolPicture";

export default class ResetLetterPicture extends SymbolPicture {
  width = 30;
  height = 30;
  private radius: number = this.width/2;

  constructor(action: PictureAction) {
    super(action);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 2;

    const {x, y} = this.pos;

    const leftX = Math.max(Math.abs(x - this.width / 2), 0);
    const arrowSize = this.height / 5
    const Y = y - arrowSize/2;
    ctx.beginPath();
    ctx.ellipse(x, y, this.radius, this.radius,
      Math.PI * 1.25, 0, Math.PI * 1.75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftX, Y);
    ctx.lineTo(leftX + arrowSize, Y + arrowSize);
    ctx.lineTo(leftX - arrowSize, Y + arrowSize);
    ctx.fill();


    ctx.lineWidth = 1
  }
}
