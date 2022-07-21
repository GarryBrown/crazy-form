import {Rect} from "../types/Rect.interface";

export function hasCollision(o1: Rect, o2: Rect): boolean {
  return (o1.x + o1.width >= o2.x &&
    o1.x <= o2.x + o2.width &&
    o1.y + o1.height >= o2.y &&
    o1.y <= o2.y + o2.height)
}
