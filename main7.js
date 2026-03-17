//SEVEN - IMPORTED MODELS

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth - 50,
  height: window.innerHeight - 50,
};
const canvas = document.querySelector("canvas#three-ex");
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000,
);
camera.position.set(2, 2, 5)
// let v = new THREE.Vector3(0,0,0)
// camera.lookAt(v)
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)


// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0)
controls.enableDamping = true;



/**
 * Models
 */
const gltfLoader = new GLTFLoader()
let gltfModel = null;

try{
  gltfModel = await gltfLoader.loadAsync( 'models/Duck/gltf/duck.gltf' );
}
catch (error){
console.log(error.message)
}


for(const child of gltfModel.scene.children)
{
    scene.add(child)


child.scale.x = .015
child.scale.y = .015
child.scale.z = .015

child.position.x = 0
child.position.y = 0
child.position.z = 0
}




window.requestAnimationFrame(animate);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime(); //how many secs have passed since program started

  controls.update();





  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

