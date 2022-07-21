import LetterPicture from "./LetterPicture";
import {PictureActionEnum} from "../types/PictureAction.interface";
import RemoveLetterPicture from "./RemoveLetterPicture";
import ResetLetterPicture from "./ResetLetterPicture";

export class SymbolFactory {
  static letter(startX: number, value: string): LetterPicture {
    const pic =  new LetterPicture({type: PictureActionEnum.ADD, value});
    pic.setStartPosition(startX);
    return pic;
  }

  static backspace(startX: number): RemoveLetterPicture {
    const pic =  new RemoveLetterPicture({type: PictureActionEnum.REMOVE});
    pic.setStartPosition(startX);
    return pic;
  }

  static reset(startX: number): ResetLetterPicture {
    const pic =  new ResetLetterPicture({type: PictureActionEnum.RESET});
    pic.setStartPosition(startX);
    return pic;
  }


}
