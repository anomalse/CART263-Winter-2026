import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

// Planet class for Team E
export class PlanetE {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        // Create planet group
        this.group = new THREE.Group();

        // Create planet
        //STEP 1:

        const planetGeometry = new THREE.SphereGeometry(1.8, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x4169E1,
            roughness: 0.5,
            metalness: 0.5,
            transparent: true,
            opacity: 0.2
        });

        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.group.add(this.planetMesh);

        //STEP 2: 
        this.moons = [];
        const moonMaterial = new THREE.MeshStandardMaterial({
            color: 0xF28390,
            roughness: 1,
            metalness: 0.2,
            transparent: true,
            opacity: 0.8
        });

        for (let i = 0; i < 3; i++) {
            // cool size stuff so you can tell what moon is what, also effects distance with i 
            const moonGeo = new THREE.SphereGeometry(0.4 + 0.1 * i, 16, 16);
            const moonMesh = new THREE.Mesh(moonGeo, moonMaterial);
            moonMesh.castShadow = true;
            moonMesh.receiveShadow = true;

            const moonOrbit = new THREE.Group();
            const moonRadius = 3 + i * 1.5;
            moonMesh.position.set(moonRadius, 0, 0);
            moonOrbit.add(moonMesh);
            this.group.add(moonOrbit);

            this.moons.push({ orbit: moonOrbit, speed: 0.1 + 0.05 * i });
        }

        //STEP 3:
        loader.load('/models/teamE/bird.glb', (gltf) => {
            const bird = gltf.scene;
            bird.position.set(0, 1.8, 0);
            bird.scale.set(0.6, 0.6, 0.6);
            this.group.add(bird);
            bird.name = "birdy";
        });

        loader.load('/models/teamE/critter.glb', (gltf) => {
            const critter = gltf.scene;
            critter.position.set(0, -1.8, 0);
            critter.scale.set(2, 2, 2);
            critter.rotation.x = Math.PI;
            this.group.add(critter);
            critter.name = "critter";
        });

        //STEP 4:
        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet itself
        this.group.rotation.y += delta * 5;


        this.moons.forEach(moon => {
            moon.orbit.rotation.y += moon.speed * delta;
        });
    }

    click(mouse, scene, camera) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(this.group.children, true);

        if (intersects.length > 0) {
            let target = intersects[0].object;
            while (target.parent && target.name !== "birdy" && target.name !== "critter") {
                target = target.parent;
            }

            if (target.name === "birdy" || target.name === "critter") {
                const originalScale = target.scale.x;
                const originalRotation = target.rotation.y;

                target.scale.set(originalScale * 1.5, originalScale * 1.5, originalScale * 1.5);
                target.rotation.y += Math.PI;

                setTimeout(() => {
                    target.scale.set(originalScale, originalScale, originalScale);
                    target.rotation.y = originalRotation;
                }, 300);
            }
        }
    }
}