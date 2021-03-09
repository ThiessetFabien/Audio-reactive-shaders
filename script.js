import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import {Scene, PerspectiveCamera, WebGLRenderer} from 'https://unpkg.com/three@0.126.1/build/three.module.js'


import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls";

// let container, scene, camera, renderer, controls, gui;
// let time, clock;
// let stats;



var scene = new Scene();

var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Move camera back so we are looking at the origin
camera.position.z = 30;

// The threejs webgl renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
// Tell renderer the dimensions of our screen
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
// Attach renderer to DOM element 
document.body.appendChild( renderer.domElement );

// adding orbit controls to allow camera movement
var controls = new OrbitControls( camera, renderer.domElement, {
  enableDamping: true, 
  dampingFactor: .25, 
} );
controls.enableDamping = true;
controls.dampingFactor = 0.25;	
controls.zoomSpeed = 0.5;
controls.rotateSpeed = 0.5;		



// Our rendering loop
let render = () => {
  requestAnimationFrame( render );
  controls.update();

  // Render our scene
  renderer.render(scene, camera);
};

render();



/*
function init() {
    container = document.querySelector(".container");
    scene = new Scene();
    scene.background = new Color("white");
    clock = new Clock(true);
    time = 0;
    objectsToRaycast = [];


    
    const loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        let geometry;
        // geometry = new THREE.TextBufferGeometry( 'Hi', {
        //     font: font,
        //     size: 80,
        //     height: 5,
        //     curveSegments: 12,
        //     bevelEnabled: true,
        //     bevelThickness: 1,
        //     bevelSize: 1,
        //     bevelOffset: 0,
        //     bevelSegments: 5
        // } );

        // let mat = new MeshBasicMaterial({color: 0x000000});
        let spCode = `
        let strength = input(0.6, 0, 3);
        setStepSize(.4);
        // based on  https://www.shadertoy.com/view/ttlGDf
        let warpSpace = (p)=> {
            //p = getSpace().x * 8.0 * (vec3(0.5, .2, .1) + p);
            let t = time /4.;
            for(let i = 1.0; i < 3.0; i+= 1.0) { 
                p.x = p.x + strength * sin(2.0 * t + i * 1.5 * p.y)+t * 0.5;
                p.y = p.x + strength * cos(2.0 * t + i * 1.5 * p.x);
            }
            return  0.5 + 0.5 * cos(time + vec3(p.x, p.y, p.x) + vec3(0., 1., 4.));
        }

        let s = getSpace();
        let warpedSpace = warpSpace(s);
        metal(.9);
        shine(1);
        color( 1- warpedSpace  );
        sphere(0.8);
        expand(length(warpedSpace)*.2);
        `;
        // geometry.computeBoundingSphere();
        // console.log(geometry.boundingSphere.radius);
        // geometry.center();
        geometry = new SphereBufferGeometry(100, 100, 100);
        
        
        mesh = createSculptureWithGeometry(geometry, spCode, () => ({
            'time': 1000,
            strength: params.mixShape
        }));
        // mesh.position.set(-40, 0, 0);

        // let mesh = new THREE.Mesh(geometry, mat)
        scene.add(mesh)
        
    } );

    createCamera();
    createRenderer();
    createGeometries();
    createControls();

    renderer.setAnimationLoop(() => {
        update();
        renderer.render(scene, camera);
    });
}
*/