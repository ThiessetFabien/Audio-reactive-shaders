
import { Scene, SphereGeometry, Vector3, PerspectiveCamera, WebGLRenderer, Color } from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.138.3/examples/jsm/controls/OrbitControls.js';
import { createSculpture, createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';

let scene = new Scene();
let params = { time: 0 };

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 1.5;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 1);
document.body.appendChild( renderer.domElement );

let geometry  = new SphereGeometry(2, 45, 45);

let state = {
  mouse : new Vector3(),
  currMouse : new Vector3(),
  pointerDown: 0.0,
  currPointerDown: 0.0
}

window.addEventListener( 'pointermove', (event) => {
  state.currMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	state.currMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

window.addEventListener( 'pointerdown', (event) => state.currPointerDown = 1.0, false );
window.addEventListener( 'pointerup', (event) => state.currPointerDown = 0.0, false );


// Create Shader Park Sculpture
let mesh = createSculptureWithGeometry(geometry, spCode(), () => ( {
  time: params.time,
  size: 20,
  gyroidSteps: .01,
  pointerDown: state.pointerDown,
  mouse: state.mouse,
  _scale : .5
} ));

scene.add(mesh);

// Add Controlls
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
  state.pointerDown = .1*state.currPointerDown + .9*state.pointerDown;
  state.mouse.lerp(state.currMouse, .05 );
  renderer.render( scene, camera );
};

render();