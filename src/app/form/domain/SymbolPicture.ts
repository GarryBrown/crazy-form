import BasePicture from "./BasePicture";
import {PictureAction} from "../types/PictureAction.interface";

export abstract class SymbolPicture extends BasePicture {
  pos = {
    x: 0,
    y: -0
  }
  protected speed: number = 180 / 60;

  // TODO: maybe pass the config with draw fn and size
  // to apply strategy pattern and don't create many classes
  protected constructor(protected action: PictureAction) {
    super();
  }

  setStartPosition(value: number):void {
    this.pos.x = value;
  }

  getAction(): PictureAction {
    return this.action;
  }

  updatePos(): void {
    this.pos.y = this.pos.y + this.speed;
  }

  destroy(): void {
    this.parent.remove(this);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.updatePos();
    if (this.pos.y > ctx.canvas.height) {
      this.destroy()
      return;
    }

    this.draw(ctx);
  }

  abstract draw(ctx: CanvasRenderingContext2D):void;



}
