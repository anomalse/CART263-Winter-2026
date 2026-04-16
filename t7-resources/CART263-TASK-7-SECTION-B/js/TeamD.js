import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Planet class for Team D
export class PlanetD {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.moonAngle = 0;
        this.moonAngle2 = 0;
        this.activeAnimations = [];
        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        const planetGeometry = new THREE.SphereGeometry(2, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x0b87ff,
            emissive: 0x0033ff,
            emissiveIntensity: 0.6,
            roughness: 0.4,
            metalness: 0.1
        });
        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.group.add(this.planetMesh);

        //Atmosphere glow
        const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x3399ff,
            transparent: true,
            opacity: 0.25,
            side: THREE.BackSide
        });
        this.glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        this.group.add(this.atmosphere);

        //STEP 2: 
        // moons 
        const moonGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const moonGeometry2 = new THREE.SphereGeometry(0.3, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
        const moonMaterial2 = new THREE.MeshStandardMaterial({ color: 0x444444 });

        this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonMesh.castShadow = true;
        this.moonMesh.receiveShadow = true;
        this.group.add(this.moonMesh);

        this.moonMesh2 = new THREE.Mesh(moonGeometry2, moonMaterial2);
        this.moonMesh2.castShadow = true;
        this.moonMesh2.receiveShadow = true;
        this.group.add(this.moonMesh2);

        //STEP 3:
        // Load Blender model to populate the planet
        const gltfLoader = new GLTFLoader();
        this.kiwibirdModel = null;

        gltfLoader.load(
            'assets/kiwibird/kiwibird.gltf',
            (gltf) => {
                this.kiwibirdModel = gltf.scene;

                //Unify setup for the model
                this.kiwibirdModel.scale.set(0.6, 0.6, 0.6);

                this.kiwibirdModel.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });

                // Create multiple populations
                this.birds = [];

                for (let i = 0; i < 5; i++) {

                    const bird = this.kiwibirdModel.clone();

                    // Random position on the planet surface
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.random() * Math.PI;

                    const radius = 2; // radius

                    const x = radius * Math.sin(phi) * Math.cos(theta);
                    const y = radius * Math.cos(phi);
                    const z = radius * Math.sin(phi) * Math.sin(theta);

                    bird.position.set(x, y, z);

                    // Let models map onto the surface
                    const normal = new THREE.Vector3(x, y, z).normalize();
                    bird.lookAt(normal.clone().multiplyScalar(2));
                    bird.rotateX(Math.PI / 2);

                    this.group.add(bird);
                    this.birds.push(bird);
                }
            },
            undefined, // progress callback (unused)
            (error) => {
                console.error('Failed to load kiwibird model:', error);
            }
        );
        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        //Glowing and breathing effect
        const glowPulse = 0.5 + Math.sin(Date.now() * 0.002) * 0.2;
        this.planetMesh.material.emissiveIntensity = glowPulse;

        // Orbit moons around planet
        this.moonAngle += delta * 1.5;
        this.moonMesh.position.set(
            Math.cos(this.moonAngle) * 3,
            Math.sin(this.moonAngle) * 1.5,
            Math.sin(this.moonAngle) * 3
        );

        this.moonAngle2 += delta * 2.2;
        this.moonMesh2.position.set(
            Math.cos(this.moonAngle2) * -3,
            Math.sin(this.moonAngle2) * 1.2,
            Math.sin(this.moonAngle2) * -3
        );

        // Drive click animations
        this.activeAnimations = this.activeAnimations.filter(anim => {
            anim.elapsed += delta;
            const t = Math.min(anim.elapsed / anim.duration, 1); // 0 → 1

            // Bounce curve: scale up then back down
            const bounce = Math.sin(t * Math.PI); // peaks at t=0.5
            const scaleFactor = 1 + bounce * 0.8;

            anim.object.scale.set(
                anim.originalScale.x * scaleFactor,
                anim.originalScale.y * scaleFactor,
                anim.originalScale.z * scaleFactor
            );

            // Spin (only for dino, which has originalRotation stored)
            if (anim.originalRotation) {
                anim.object.rotation.y = anim.originalRotation.y + t * Math.PI * 2;
            }

            if (t >= 1) {
                // Reset scale and rotation exactly when done
                anim.object.scale.copy(anim.originalScale);
                if (anim.originalRotation) {
                    anim.object.rotation.y = anim.originalRotation.y;
                }
                return false; // remove from list
            }
            return true; // keep running
        });
    }

    click(mouse, scene, camera) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(this.group.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // Walk up the hierarchy to check if we clicked the bird
            let obj = clickedObject;
            while (obj && obj !== this.group) {
                if (this.birds.includes(obj)) {
                    this.triggerBirdAnimation(obj);
                    return;
                }
                obj = obj.parent;
            }

            // Fallback: bounce whatever was clicked (planet, moons)
            this.activeAnimations.push({
                object: clickedObject,
                originalScale: clickedObject.scale.clone(),
                elapsed: 0,
                duration: 0.5
            });
        }
    }

    triggerBirdAnimation(bird) {
        if (!bird) return;

        // Avoid stacking duplicate animations on the birds
        this.activeAnimations.push({
            object: bird,
            originalScale: bird.scale.clone(),
            originalRotation: bird.rotation.clone(),
            elapsed: 0,
            duration: 0.5
        });
    }
}