export function spCode() {
  return `
    let audio = input();
    let pointerDown = input();
    metal(.5);
    shine(.5);
    setMaxIterations(5);
    let n1 = noise(getRayDirection()*4 +vec3(0, audio, vec3(0, audio, audio))*.5 );
    let n = noise(getSpace() + vec3(0, 0, audio+time*.1) + n1);
    
    color(normal * .1 + vec3(0, 0, 1));
    displace(mouse.x*2, mouse.y*2, 0);
    boxFrame(vec3(2), abs(n) * .1+.04 );
    mixGeo(pointerDown);
    sphere(n * .5 + .8);
  `;
}