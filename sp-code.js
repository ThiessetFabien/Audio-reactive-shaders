/* eslint-disable */
let features = {};

let shapeChoise = () => {
  //put fxRand Here
  if(Math.random() < .4) {
    features['Shape'] = 'Torus';
    return `
    rotateX(PI/2);
    torus(.4, .2);`
  } else {
    features['Shape'] = 'Sphere';
    return 'sphere(.5);'
  }
}


export function spCode() {
  return `
  let size = input(12, 10, 50.0);
  let gyroidSteps = input(.06, 0, .1)
  let pointerDown = input();
  let s = getSpace();
  displace(mouse.x, mouse.y, 0);
  box(vec3(.5));
  mixGeo(pointerDown);
  ${shapeChoise()}
  `;
}

window.$fxhashFeatures = features;