import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Planet class for Team A
export class PlanetA {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()
        // STEP 4 setup
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clickableModels = [];
        this.animatedModels = [];


        // Create planet
        // THEME: FROGS
        // We present Sir Ivan Barr the Splurmf!
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const planetGeometry = new THREE.SphereGeometry(2, 32, 32);
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        const planetMaterial = new THREE.MeshStandardMaterial({ color: "#8DA750" });
        // TODO: Give the boy some eyes!
        const eyeGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#FFFFFF" });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.7, 0.5, 1.5);
        rightEye.position.set(0.7, 0.5, 1.5);
        this.group.add(leftEye);
        this.group.add(rightEye);

        const pupilGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: "#000000" });
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.7, 0.5, 1.7);
        rightPupil.position.set(0.7, 0.5, 1.7);
        this.group.add(leftPupil);
        this.group.add(rightPupil);
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        planetMaterial.castShadow = true;
        planetMaterial.receiveShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.group.add(this.planetMesh);






        //STEP 2:
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

        / Moons */
        this.moons = [];

        // Creat 3 moons
        const moonCount = 3;
        for (let i = 0; i < moonCount; i++) {
            //Pivot group for moon orbit
            const moonPivot = new THREE.Group();

            / Moon mesh /
            const moonGeometry = new THREE.SphereGeometry(0.4, 32, 32);
            const moonMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ccff,
                emissive: 0x003333,
                emissiveIntensity: 0.6,
                roughness: 0.4,
                metalness: 0.2
            });

            const moon = new THREE.Mesh(moonGeometry, moonMaterial);

            //Make them glow
            const glowGeometry = new THREE.SphereGeometry(0.55, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffaa,
                transparent: true,
                opacity: 0.3,
            });

            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            moon.add(glow);

            //Add light
            const moonLight = new THREE.PointLight(0x00ffaa, 0.5, 10);
            moon.add(moonLight);

            //Shadows
            moon.castShadow = true;
            moon.receiveShadow = true;

            //Orbit radius moon and planet
            moon.position.x = 3 + i * 0.5;

            //Add moon to pivot group
            moonPivot.add(moon);

            //Add pivot group to planet group
            this.group.add(moonPivot);

            //Save for animation
            this.moons.push({
                pivot: moonPivot,
                speed: 0.5 + Math.random()
            });
        }

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        const loader = new GLTFLoader();
        const planetRadius = 2;

        const modelsData = [
            { path: '../models/Tree.glb', scale: 0.35, count: 7 },
            { path: '../models/Tree_frog.glb', scale: 0.007, count: 3 },
            { path: '../models/Mushroom.glb', scale: 0.15, count: 3 },
            { path: '../models/Slug.glb', scale: 0.010, count: 2 }
        ];

        // Predefined fixed positions on top hemisphere, has to be top hemisphere because we don't want models inside the planet!
        const positions = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0.8, 0.6, -0.6),
            new THREE.Vector3(-0.8, 0.7, 0.6),
            new THREE.Vector3(0.6, 0.8, 0.9),
            new THREE.Vector3(-0.5, 0.9, -0.8),
            new THREE.Vector3(0.3, 1, -0.5),
            new THREE.Vector3(-0.7, 1, 0.3),
            new THREE.Vector3(0.9, 1.1, 0.2),
            new THREE.Vector3(-0.9, 1.1, -0.2),
            new THREE.Vector3(0.2, 1.2, -0.7),
            new THREE.Vector3(-0.2, 1.2, 0.7)
        ];

        let posIndex = 0;

        modelsData.forEach((modelInfo) => {
            for (let i = 0; i < modelInfo.count; i++) {
                loader.load(modelInfo.path, (gltf) => {
                    const model = gltf.scene;
                    const group = new THREE.Group();

                    // Scale model
                    model.scale.set(modelInfo.scale, modelInfo.scale, modelInfo.scale);

                    // Offset bottom to Y=0
                    const bbox = new THREE.Box3().setFromObject(model);
                    const minY = bbox.min.y;
                    model.position.y -= minY;

                    group.add(model);

                    // Pick a fixed position and normalize it to planet radius
                    let pos = positions[posIndex % positions.length].clone().normalize().multiplyScalar(planetRadius + 0.05);

                    // Slugs sit slightly closer to planet (these guys are pissing me off!)
                    if (modelInfo.path.includes('Slug')) {
                        pos.multiplyScalar(0.97);
                    }

                    group.position.copy(pos);

                    // Always upright
                    group.rotation.set(0, 0, 0);
                    group.rotateY(Math.random() * Math.PI * 2);

                    // Shadows
                    group.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    this.group.add(group);
                    this.clickableModels.push(group);

                    posIndex++; // move to next position
                });
            }
        });


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

        // Rotate moons
        this.moons.forEach(moon => {
            moon.pivot.rotation.y += delta * moon.speed;
        });

        // STEP 4 animation
        for (let i = this.animatedModels.length - 1; i >= 0; i--) {
            let anim = this.animatedModels[i];
            anim.time += 0.1;

            anim.model.position.y = anim.startY + Math.sin(anim.time) * 0.5;
            anim.model.rotation.y += 0.1;

            if (anim.time > Math.PI) {
                anim.model.position.y = anim.startY;
                this.animatedModels.splice(i, 1);
            }
        }
    }


    click(mouse, scene, camera) {
        this.mouse.x = mouse.x;
        this.mouse.y = mouse.y;

        this.raycaster.setFromCamera(this.mouse, camera);

        const intersects = this.raycaster.intersectObjects(this.clickableModels, true);

        if (intersects.length > 0) {
            let clicked = intersects[0].object;

            while (clicked.parent && !this.clickableModels.includes(clicked)) {
                clicked = clicked.parent;
            }

            this.animatedModels.push({
                model: clicked,
                startY: clicked.position.y,
                time: 0
            });
        }
    }
}

//Tree frog by Poly by Google [CC-BY] via Poly Pizza//
//Slug by Poly by Google [CC-BY] via Poly Pizza// (i hate these guys so much)
//Mushroom by Quaternius//
//Tree by Marc SolÃ  [CC-BY] via Poly Pizza//