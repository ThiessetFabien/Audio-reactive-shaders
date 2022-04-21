/* eslint-disable */



export function spCode() {
  return `
    let avgFreq = input();
    let pointerDown = input();
    rotateY(mouse.x * PI / 2 + time*.01+avgFreq);
    rotateX(mouse.y * PI / 2);
    metal(.5);
    shine(.4);
    color(getRayDirection()+.2);
    rotateY(getRayDirection().y*4+time)
    boxFrame(vec3(.4), .02);
    expand(.02);
    blend(nsin(time)*.6)
    sphere(.2);
  `;
}