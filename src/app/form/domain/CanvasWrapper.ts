import {Picture} from "../types/Picture.interface";

export default class CanvasWrapper {
  private pictures: Picture[] = [];

  constructor(private canvasEl: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {
    ctx.font = "18px sans-serif";
    // ctx.rect(0, 0, 1900, 800);
    // ctx.stroke();
  }


  reRender():void {
    this.ctx.clearRect(0,0, this.canvasEl.width, this.canvasEl.height)
    const ctx = this.ctx;
    this.pictures.forEach(p => p.render(ctx))
  }



  // TODO: add sort property
  addPicture(pic: Picture):void {
    pic.attachParent(this);
    this.pictures.push(pic)
  }

  getPictures(): Picture[] {
    return this.pictures;
  }

  remove(v: Picture):void {
    this.pictures = this.pictures.filter(p => p !== v);
  }
}
