//import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";
import {createSculpture, createSculptureWithGeometry} from '/shader-park-core.esm.js';

let scene = new Scene();

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );


// Shader Park setup
let spCode = `
let strength = input(0.6, 0, 3);
let twistMix = input();
setStepSize(.3);

rotateY(time * .2);
let warpedSpace = warpSpace(getSpace());
metal(.9);
shine(1);
color(1 - warpedSpace);
sphere(.2 + length(warpedSpace) * .2);

// inspired by https://www.shadertoy.com/view/ttlGDf
function warpSpace(p) {
  let t = time / 4.;
  rotateY(getRayDirection().y * (1 - twistMix) * 12);
  p = getSpace().x*8.0*(vec3(0.5, .2, .1) + p);
  for(let i = 1.0; i < 3.0; i += 1.0) { 
      p.x = p.x +strength * sin(2.0 * t + i * 1.5 * p.y) + t * 0.5;
      p.y = p.x + strength * cos(2.0 * t + i * 1.5 * p.x);
  }
  return  0.5 + 0.5 * cos(time + vec3(p.x, p.y, p.x) + vec3(0., 2., 4.));
}
`

let mesh = createSculpture(spCode, () => ( {
  
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
  controls.update();
  renderer.render( scene, camera );
};

render();