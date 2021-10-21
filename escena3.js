import { VRButton } from '/three/examples/jsm/webxr/VRButton.js';

// renderer                                                                 
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);

                                                                 
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(30, 10, 70); 
camera.up.set(0, 1, 0);
camera.lookAt(new THREE.Vector3(0, 0, 5));

                                                
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff,10));

                      
const objs = [];
const loader = new THREE.GLTFLoader();
loader.load("./z-Monster.gltf", gltf => {
    // model is a THREE.Group (THREE.Object3D)                              
    const mixer = new THREE.AnimationMixer(gltf.scene);
    // animations is a list of THREE.AnimationClip
    for (const anim of gltf.animations) {
        mixer.clipAction(anim).play();
    }
    // settings in `sceneList` "Monster"
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.rotation.copy(new THREE.Euler(0, -3 * Math.PI / 4, 0));
    gltf.scene.position.set(0, 0, 0);
    
    scene.add(gltf.scene);
    objs.push({gltf, mixer});
});

document.body.appendChild( VRButton.createButton( renderer ) );

renderer.xr.enabled = true;

renderer.setAnimationLoop(function () {
    renderer.render( scene, camera );
});