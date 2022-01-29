
import { Scene, SphereGeometry, Vector3, PerspectiveCamera, WebGLRenderer, Color, FontLoader, TextBufferGeometry } from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";
import { createSculpture, createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core@0.1.4/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';

let scene = new Scene();
let params = { time: 0 };

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 3;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 1);
document.body.appendChild( renderer.domElement );

let geometry  = new SphereGeometry(2, 45, 45);

let currMouse = new Vector3();
let mouse = new Vector3();
let pointerDown = 0.0;

window.addEventListener( 'pointermove', (event) => {
  currMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	currMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

window.addEventListener( 'pointerdown', (event) => {
  pointerDown = 1.0;
}, false );

window.addEventListener( 'pointerup', (event) => {
  pointerDown = 0.0;
}, false );

let mesh = createSculptureWithGeometry(geometry, spCode, () => ( {
  time: params.time,
  size: 20,
  gyroidSteps: .01,
  pointerDown,
  mouse
} ));

scene.add(mesh);


let controls = new OrbitControls( camera, renderer.domElement, {
  enableDamping : true,
  dampingFactor : 0.25,
  zoomSpeed : 0.5,
  rotateSpeed : 0.5
} );

let onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );


let render = () => {
  requestAnimationFrame( render );
  params.time += 0.01;
  controls.update();
  mouse.lerp(currMouse, .05 );
  renderer.render( scene, camera );
};

render();