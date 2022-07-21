import config from "../config";
import {PictureAction} from "../types/PictureAction.interface";
import {SymbolPicture} from "./SymbolPicture";

export default class LetterPicture extends SymbolPicture {
  width = 14;
  height = 14;

  constructor(action: PictureAction) {
    super(action);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeText(this.action.value!, this.pos.x, this.pos.y, config.letterWidth);
  }
}
