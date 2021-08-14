import { Scene, PerspectiveCamera, WebGLRenderer, Color, FontLoader, TextBufferGeometry } from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";
import { createSculpture, createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core@0.0.20/dist/shader-park-core.esm.js';
import { spCode } from '/sp-code.js';

let scene = new Scene();
let params = { time: 0 };

let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new Color(1, 1, 1), 1);
document.body.appendChild( renderer.domElement );

const loader = new FontLoader();

loader.load( 'https://cdn.glitch.com/44b034f5-6c9a-414c-96b3-8280ecf82f27%2Fhelvetiker_regular.typeface.json?v=1615399030749', function ( font ) {
  let geometry = new TextBufferGeometry( 'Hi', {
    font: font,
    size: 4,
    height: .1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: .01,
    bevelSize: .1,
    bevelOffset: 0,
    bevelSegments: 1
  } );
  geometry.computeBoundingSphere();
  geometry.center();
  
  let mesh = createSculptureWithGeometry(geometry, spCode, () => ( {
    time: params.time,
    size: 20,
    gyroidSteps: .01
  } ));
  
  scene.add(mesh);
} );

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
  renderer.render( scene, camera );
};

render();