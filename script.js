import { Scene, PerspectiveCamera, WebGLRenderer } from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";
import {createSculpture, createSculptureWithGeometry} from '/shader-park-core.esm.js';

let scene = new Scene();
let params = { time: 0 };

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// Shader Park setup
let spCode = `
let duration = time / 30 * TWO_PI;
let animationLoop = abs(sin(duration));
let oscillation = clamp(abs(sin(duration)) - .6, 0.0, 1.0);
setStepSize(.13);
rotateX(animationLoop);
metal(0.2)
shine(.1)
let glo = max(1.3-2.0*dot(-1.0*normal,getRayDirection()),1.);
let s = getSpace();
let n = noise(s*5.2*sin(duration)+cos(duration));
n = sin(n+1000000);
let col = 1-pow(n, .4);
let grain = noise(s*100000)*.3;
color(vec3(0,1, 5)*col);

sphere(0.31);
expand(abs(n)*0.15+(grain*.02*col));
`

let mesh = createSculpture(spCode, () => ( {
  time: params.time
} ));

scene.add(mesh);

let controls = new OrbitControls( camera, renderer.domElement, {
  enableDamping : true,
  dampingFactor : 0.25,
  zoomSpeed : 0.5,
  rotateSpeed : 0.5
} );

let render = () => {
  requestAnimationFrame( render );
  params.time += 0.1;
  controls.update();
  renderer.render( scene, camera );
};

render();