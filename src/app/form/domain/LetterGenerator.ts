export default class LetterGenerator {
  private alphabet: string = 'АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

  get length():number {
    return this.alphabet.length;
  }

  next(): string {
    return this.getNextLetter()
  }

  private getNextLetter(): string {
    const next = this.alphabet[0];
    this.alphabet = this.alphabet.slice(1) + next;
    return next;
  }
}
