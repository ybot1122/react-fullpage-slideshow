export function isTouchEvent(e: object): e is TouchEvent {
  return "touches" in e;
}

export function isMouseEvent(e: object): e is MouseEvent {
  return "clientY" in e && "ctrlKey" in e && e.ctrlKey !== undefined;
}
export function isPointerEvent(e: object): e is PointerEvent {
  return "clientY" in e && "ctrlKey" in e && e.ctrlKey === undefined;
}
