import LetterPicture from "./LetterPicture";
import {Observable, timer} from "rxjs";
import LetterGenerator from "./LetterGenerator";
import {getRandomInt} from "../utils/getRandomInt";
import {map} from "rxjs/operators";
import {SymbolFactory} from "./SymbolFactory";
import ResetLetterPicture from "./ResetLetterPicture";
import RemoveLetterPicture from "./RemoveLetterPicture";

export class SymbolGenerator {
  static letter$(canvasWidth: number): Observable<LetterPicture> {
    const letterGenerator = new LetterGenerator();
    const letterMargin = canvasWidth / letterGenerator.length;

    return timer(250, 450).pipe(map(_ => {
      const x = getRandomInt(0, letterGenerator.length) * letterMargin;
      return SymbolFactory.letter(x, letterGenerator.next())
    }));
  }

  // TODO: make data structure which will keep busy startX and regenerate new one
  // to don't put the symbols on the one place at the same time
  static clear$(canvasWidth: number): Observable<RemoveLetterPicture | ResetLetterPicture> {
    const letterGenerator = new LetterGenerator();
    const letterMargin = canvasWidth / letterGenerator.length;

    return timer(250, 5000).pipe(map(_ => {
      const x = getRandomInt(1, letterGenerator.length - 1) * letterMargin;
      return getRandomInt(0, 2) === 1 ? SymbolFactory.reset(x) : SymbolFactory.backspace(x);
    }));
  }

}
