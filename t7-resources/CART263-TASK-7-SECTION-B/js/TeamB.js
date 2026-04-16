import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        // Create planet group
        this.group = new THREE.Group();
        this.scene.add(this.group);

        // Create Planet
        const textureLoader = new THREE.TextureLoader();
        const planetTexture = textureLoader.load('models/TeamB/planetTexture.png');
        const geometry = new THREE.SphereGeometry(1.8, 64, 64); 

        const material = new THREE.MeshStandardMaterial({
            map: planetTexture,
            metalness: 0.1,
            roughness: 0.8
        });

        this.planetMesh = new THREE.Mesh(geometry, material);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.group.add(this.planetMesh);

        // orbiting moons
        this.moons = [];
        this.createMoon(0.4, 3.5, 0.02, 0xffffff); // Moon 1
        this.createMoon(0.2, 5, 0.035, 0xaaaaaa);  // Moon 2

        // loading the blender model
        this.loader = new GLTFLoader();
        this.interactableModels = []; 

        // Define the helper function INSIDE the constructor
        const placeModelOnSurface = (modelPath, lat, lon, scale = 0.2) => {
        this.loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        model.scale.set(scale, scale, scale);

        const radius = 1.8; // Your planet's radius
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        model.position.set(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );

        const upVector = model.position.clone().normalize();
        model.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), upVector);

        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.group.add(model);
        this.interactableModels.push(model); 
    });
};

    // Spawn Bulborbs randomly
    const numberOfBulborbs = 10; 

    for (let i = 0; i < numberOfBulborbs; i++) {

        const randomLat = (Math.random() * 180) - 90;
        const randomLon = (Math.random() * 360) - 180;
    
    placeModelOnSurface('models/TeamB/Red Bulborb.glb', randomLat, randomLon, 1.5);
    }

    // Spawn Flowers randomly
    const numberOfFlowers = 10; 

    for (let i = 0; i < numberOfFlowers; i++) {

        const randomLat = (Math.random() * 180) - 90;
        const randomLon = (Math.random() * 360) - 180;
    
    placeModelOnSurface('models/TeamB/Desert marigold.glb', randomLat, randomLon, 0.1);
    }


        // for the sun
        this.raycaster = new THREE.Raycaster();
    } // END OF CONSTRUCTOR

    createMoon(radius, dist, speed, color) {
        const moonGeo = new THREE.SphereGeometry(radius, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: color });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        
        moon.castShadow = true;
        moon.receiveShadow = true;
        
        moon.userData = {
            distance: dist,
            speed: speed,
            angle: Math.random() * Math.PI * 2
        };
        
        this.group.add(moon);
        this.moons.push(moon);
    }

    update(delta) {
        // orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;
        
        // rotate planet
        this.group.rotation.y += delta * 0.5;

        // update moon orbits
        this.moons.forEach(moon => {
            moon.userData.angle += moon.userData.speed;
            moon.position.x = Math.cos(moon.userData.angle) * moon.userData.distance;
            moon.position.z = Math.sin(moon.userData.angle) * moon.userData.distance;
        });
    }

    click(mouse, scene, camera) {
        this.raycaster.setFromCamera(mouse, camera);
        const intersects = this.raycaster.intersectObjects(this.group.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            
            // animation for planet/models
            clickedObject.scale.set(1.5, 1.5, 1.5);
            setTimeout(() => {
                clickedObject.scale.set(1, 1, 1);
            }, 200);
        }
    }
}