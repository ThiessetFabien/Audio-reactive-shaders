export function spCode() {
  return `
    let pointerDown = input(0);
    let audio = time //input();

    setMaxIterations(5);

    displace(mouse.x*2, mouse.y*2, 0)

    let s = getSpace();
    let r = getRayDirection();
    let n1 = noise(r*4 + vec3(0, 0, audio*.1));
    let n = noise(s + vec3(0, 0, audio*.1) + n1);

    metal(n*.5 + .5);
    shine(n*.5 + .5);

    color(normal*.1 + vec3(0, 0, 1));
    boxFrame(vec3(2), .1);
    mixGeo(pointerDown);
    sphere(.5 + n*.5);
  `;
}