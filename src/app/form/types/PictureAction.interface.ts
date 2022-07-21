export enum PictureActionEnum {
  ADD = 0,
  REMOVE = 1,
  RESET = 2
}

export interface PictureAction {
  type: PictureActionEnum;
  value?: string
}
