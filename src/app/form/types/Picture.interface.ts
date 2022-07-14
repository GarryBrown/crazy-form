import {Pos} from "./Pos.interface";

export interface Picture {
  width: number;
  height: number;
  pos: Pos

  render(ctx: CanvasRenderingContext2D): void;

  attachParent(parent: any): void;
}
