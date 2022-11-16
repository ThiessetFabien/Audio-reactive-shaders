import { Scene, SphereGeometry, Vector3, PerspectiveCamera, WebGLRenderer, Color, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.140/examples/jsm/controls/OrbitControls.js';
import { createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';

let scene = new Scene();

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5.5;

let renderer = new WebGLRenderer({ antialias: true, transparent: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 0);
document.body.appendChild( renderer.domElement );

let button = document.querySelector('.button');
button.innerHTML = "Loading Audio..."
button.style.display = 'none';

let geometry  = new SphereGeometry(2, 45, 45);
// let material = new MeshBasicMaterial( { color: 0x33aaee} );
// let mesh = new Mesh(geometry, material);
let mesh = createSculptureWithGeometry(geometry, spCode())

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
  controls.update();
  renderer.render( scene, camera );
};

render();