/* eslint-disable */

export function spCode() {
  
  
  let size = input(12, 10, 50.0);
  let gyroidSteps = input(.06, 0, .1)
  let pointerDown = input();
  let s = getSpace();
  displace(mouse.x, mouse.y, 0);
  
  sphere(.5);
  mixGeo(pointerDown);
  box(vec3(.5));
}