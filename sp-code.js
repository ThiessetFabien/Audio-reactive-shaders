/* eslint-disable */
let features = {};

let shapeChoise = () => {
  //put fxRandHere
  if(Math.random() < .5) {
    features['Shape'] = 'Torus';
    return `torus(.4);`
  } else {
    features['Shape'] = 'Sphere';
    return 'sphere(.5);'
  }
}
window.$fxhashFeatures = features

export function spCode() {
  return `
  let size = input(12, 10, 50.0);
  let gyroidSteps = input(.06, 0, .1)
  let pointerDown = input();
  let s = getSpace();
  displace(mouse.x, mouse.y, 0);
  ${shapeChoise()}
  sphere(.5);
  mixGeo(pointerDown);
  box(vec3(.5));
  `
}