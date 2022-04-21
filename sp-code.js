export function spCode() {
  return `
    let audio = input();
    let pointerDown = input();
    metal(.5);
    shine(.4);
    setMaxIterations(5);
    let n = noise(getSpace() + vec3(0, 0, audio) + noise(getRayDirection()*4 +vec3(0, audio, vec3(0, audio, audio))*.2 ));
    color(normal * .1 + vec3(0, 0, 1));
    displace(mouse.x*1.5, mouse.y*1.5, 0);
    boxFrame(vec3(2), abs(n) * .1+.04 );
    mixGeo(pointerDown)
    sphere(n * .4 + .8);
  `;
}