/* eslint-disable */



export function spCode2() {
  return `
    let audio = input();
    let pointerDown = input();
    rotateY(mouse.x * PI / 2 +audio);
    rotateX(mouse.y * PI / 2);
    metal(.5);
    shine(.4);
    color(getRayDirection()+.2);
    rotateY(getRayDirection().y*4+time)
    boxFrame(vec3(.4), .02);
    expand(.02);
    blend(pointerDown*.6)
    sphere(.2);
  `;
}


export function spCode() {
  return `
    let audio = input();
    let pointerDown = input();
    //rotateY(mouse.x * PI / 2 +audio);
    //rotateX(mouse.y * PI / 2);
    metal(.5);
    shine(.4);
    //color(getRayDirection()+.2);
    setMaxIterations(5);
    let n = noise(getSpace()+2 * vec3(0, 0, audio) + noise(getRayDirection()*4+2*audio*.2 ));
    color(normal * .1 + vec3(0, 0, 1));
    sphere(n * .4 + .8);

  `;
}