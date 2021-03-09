import { Scene, PerspectiveCamera, WebGLRenderer, Color } from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";
import {createSculpture, createSculptureWithGeometry} from '/shader-park-core.esm.js';

let scene = new Scene();
let params = { time: 0 };

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 1);
document.body.appendChild( renderer.domElement );


// Shader Park setup
let spCode = `
let size = input(12, 10, 50.0);
let gyroidSteps = input(.06, 0, .1)
let s = getSpace();

let col = vec3(1, 1, 1.5) + normal * .2;
metal(.2);
shine(.5)
col -= length(s);
color(col);

s += time *.1;
let sdf = min(gyroidSteps, sin(s.x * size) + sin(s.y * size) + sin(s.z * size));
setSDF(sdf)
intersect();
sphere(.5);
`

let mesh = createSculpture(spCode, () => ( {
  time: params.time,
  size: 12,
  gyroidSteps: .06
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
  params.time += 0.01;
  controls.update();
  renderer.render( scene, camera );
};

render();