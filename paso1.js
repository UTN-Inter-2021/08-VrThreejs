import { VRButton } from '/three/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(30, 10, 70); 
camera.up.set(0, 1, 0);
camera.lookAt(new THREE.Vector3(0, 0, 5));


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.position.set(0, 0, 0);
scene.add( cube );



document.body.appendChild( VRButton.createButton( renderer ) );


renderer.xr.enabled = true;
renderer.setAnimationLoop(function () {
    renderer.render( scene, camera );
});