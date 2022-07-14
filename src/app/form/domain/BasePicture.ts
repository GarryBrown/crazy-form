import {Rect} from "../types/Rect.interface";
import CanvasWrapper from "./CanvasWrapper";
import {Picture} from "../types/Picture.interface";
import {Pos} from "../types/Pos.interface";


export default abstract class BasePicture implements Picture {
  abstract width: number;
  abstract height: number;
  abstract pos: Pos;

  protected parent!: CanvasWrapper;

  get rect(): Rect {
    return {...this.pos, width: this.width, height: this.height};
  }

  attachParent(parent: CanvasWrapper): void {
    this.parent = parent;
  }

  abstract render(ctx: CanvasRenderingContext2D): void;

}
