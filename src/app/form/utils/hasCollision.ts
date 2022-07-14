import {Rect} from "../types/Rect.interface";

export function hasCollision(o1: Rect, o2: Rect): boolean {
  return !(o1.x > o2.x || o1.y > o2.y)
}
