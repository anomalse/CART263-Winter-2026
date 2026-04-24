import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Sun } from "./Sun.js";
import { PlanetA } from "./TeamA.js";
import { PlanetB } from "./TeamB.js";
import { PlanetC } from "./TeamC.js";
import { PlanetD } from "./TeamD.js";
import { PlanetE } from "./TeamE.js";
import { PlanetF } from "./TeamF.js";

// --- Core Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510); // Deep space

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 30, 60);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 150;
controls.minDistance = 20;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0x080812); // Dim ambient for space
scene.add(ambientLight);

// Add some distant stars (background)
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 3000;
const starsPositions = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i += 3) {
  const r = 150 + Math.random() * 100;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 2;

  starsPositions[i] = Math.sin(theta) * Math.cos(phi) * r;
  starsPositions[i + 1] = Math.sin(theta) * Math.sin(phi) * r;
  starsPositions[i + 2] = Math.cos(theta) * r;
}
starsGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(starsPositions, 3),
);
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// --- Create Sun (center of solar system) ---
const sun = new Sun(scene);

// --- Create Planets (each team contributes one) ---
const planets = [];

// Team A's planet (closest to sun)
const planetA = new PlanetA(scene, 8, 0.01);
planets.push(planetA);

// // Team B's planet
// load some models using a gltfLoader - make one per team
const gltfLoaderTeamB = new GLTFLoader();

let duck2 = await gltfLoaderTeamB.loadAsync(
  "models/teamB/little_duck/scene.gltf",
);
let fox = await gltfLoaderTeamB.loadAsync("models/teamB/fox/scene.gltf");
let fox2 = await gltfLoaderTeamB.loadAsync("models/teamB/fox2/scene.gltf");
let robot1 = await gltfLoaderTeamB.loadAsync(
  "models/teamB/space_maintenance_robot/scene.gltf",
);

let teamBModels = [duck2, fox, fox2, robot1];

// texture loader
const textureLoaderTeamB = new THREE.TextureLoader();

let planetColorTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/planet/rock-color.jpg",
);
let planetNormalTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/planet/rock-normal.jpg",
);
let planetRoughnessTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/planet/rock-roughness.jpg",
);

let moon1ColorTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-1/moon1-color.jpg",
);
let moon1NormalTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-1/moon1-normal.jpg",
);
let moon1RoughnessTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-1/moon1-roughness.jpg",
);

let moon2ColorTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-2/moon2-color.jpg",
);
let moon2NormalTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-2/moon2-normal.jpg",
);
let moon2RoughnessTextureTeamB = await textureLoaderTeamB.loadAsync(
  "textures/teamB/moon-2/moon2-roughness.jpg",
);

planetColorTextureTeamB.colorSpace = THREE.SRGBColorSpace;
moon1ColorTextureTeamB.colorSpace = THREE.SRGBColorSpace;
moon2ColorTextureTeamB.colorSpace = THREE.SRGBColorSpace;

let teamBTextures = {
  planet: {
    color: planetColorTextureTeamB,
    normal: planetNormalTextureTeamB,
    roughness: planetRoughnessTextureTeamB,
  },
  moon1: {
    color: moon1ColorTextureTeamB,
    normal: moon1NormalTextureTeamB,
    roughness: moon1RoughnessTextureTeamB,
  },
  moon2: {
    color: moon2ColorTextureTeamB,
    normal: moon2NormalTextureTeamB,
    roughness: moon2RoughnessTextureTeamB,
  },
};

const planetB = new PlanetB(scene, 15, 0.005, teamBTextures, teamBModels);
planets.push(planetB);

// // Team C's planet
const loaderTeamC = new THREE.TextureLoader();
const grass_texture = await loaderTeamC.loadAsync(
  "textures/grass-2500-mm-architextures.jpg",
);
const moon_texture = await loaderTeamC.loadAsync("textures/moon_1024.jpg");
let teamCTextures = [];
teamCTextures.push(grass_texture);
teamCTextures.push(moon_texture);
const gltfLoaderTeamC = new GLTFLoader();
let sheepModel = await gltfLoaderTeamC.loadAsync("models/sheep/scene.gltf");
let teamCModels = [];
teamCModels.push(sheepModel);
const planetC = new PlanetC(scene, 22, 0.003, teamCTextures, teamCModels);
planets.push(planetC);

// Team D's planet
const planetD = new PlanetD(scene, 29, 0.002);
planets.push(planetD);

// Team E's planet
const planetE = new PlanetE(scene, 36, 0.0015);
planets.push(planetE);

// Team F's planet (farthest)
const planetF = new PlanetF(scene, 43, 0.001);
planets.push(planetF);

let elapsedTime = 0;
function animate(timer) {
  requestAnimationFrame(animate);

  const delta = 0.001 * (timer - elapsedTime);
  // console.log(delta)
  elapsedTime = timer;

  // Update sun
  sun.update(timer);

  // Rotate stars slowly
  stars.rotation.y += 0.1 * delta;

  // Update all planets (this handles planet orbit, moon orbits, and critter animations)
  planets.forEach((planet) => planet.update(delta));

  controls.update();
  renderer.render(scene, camera);
}

animate(0);

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Click handler
const mouse = new THREE.Vector2();
renderer.domElement.addEventListener("click", (event) => {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  planetA.click(mouse, scene, camera);
   planetB.click(mouse, scene, camera);
  planetC.click(mouse, scene, camera);
   planetD.click(mouse, scene, camera);
  planetE.click(mouse, scene, camera);
  planetF.click(mouse, scene, camera);
});
