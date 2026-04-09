import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//YAXUAN NERLY SHROOK AND ASH
// Planet class for Team A


// Planet class for Team A
export class PlanetA {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        // Create planet group
        this.group = new THREE.Group();

        const loader = new THREE.TextureLoader();
        const texture = loader.load("texture/planetTexture.JPG");

        // Create planet

        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const geometry = new THREE.SphereGeometry(1.9, 32, 32);
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        const material = new THREE.MeshStandardMaterial({
            color: 0xC783DB,
            emissive: 0xC783DB,
            roughness: 0.5,
            emissiveIntensity: 0.2,
            map: texture,
        });


        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        //TODO: Add the planet mesh to the planet group.
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(20, 0, 0);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.group.add(this.mesh);


        /** LINES TO ADD TO CAST AND RECIVE SHADOWS FOR FUTURE MESH CREATED JUST CHANGE OBJECT TO THE NAME OF YOUR MESH
        *   //this.object.castShadow = true;
            //this.object.receiveShadow = true;
         */

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        this.moons = []; //Array to store moons
        const moonTexture = loader.load("texture/planetTexture.JPG");

        for (let i = 0; i < 2; i++) {  //only want 2 mooons
            const moonGeometry = new THREE.SphereGeometry(1, 16, 16);
            const moonMaterial = new THREE.MeshStandardMaterial({
                color: 0xC783DB, //same materials as the planet
                emissive: 0xC783DB,
                roughness: 0.5,
                emissiveIntensity: 0.2,
                map: moonTexture,
            });

            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
            moonMesh.castShadow = true;
            moonMesh.receiveShadow = true;

            const pivot = new THREE.Object3D();
            pivot.spiralMovement = { //parameters for the twisting/spiralling movements of my two moons
                speed: 1 + Math.random() * 1.0,
                radius: 4,
                mesh: moonMesh,
            };

            moonMesh.position.set(pivot.spiralMovement.radius, 0, 0);
            pivot.add(moonMesh);

            this.group.add(pivot);
            this.moons.push(pivot);
        }

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
        const gltfLoader = new GLTFLoader();

        const donutsData = [
            { pos: new THREE.Vector3(-6, -5, 0), color: 0xFF0090, emissive: 0xff6600 }, //pink donut
            { pos: new THREE.Vector3(-20, 0, 0), color: 0x00FFCC, emissive: 0x00ff88 }, //turquoise donut
            { pos: new THREE.Vector3(-15, 5, 15), color: 0xFFAA00, emissive: 0xff4400 }, //yellow donut
        ];

        // Loop through each donut
        this.donuts = [];
        this.donutAnimations = new Map();

        donutsData.forEach((data) => {
            gltfLoader.load('./models/donut.glb', (gltf) => {
                const donut = gltf.scene;

                //scale
                donut.scale.set(3, 3, 3);

                //position
                donut.position.copy(data.pos);

                //center
                donut.lookAt(0, 0, 0);

                //colors and shadows
                donut.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        child.material = new THREE.MeshStandardMaterial({
                            color: data.color,
                            roughness: 0.5,
                            metalness: 0.2,
                        });

                        child.material.emissive = new THREE.Color(data.emissive);
                        child.material.emissiveIntensity = 0.3;
                    }
                });

                this.mesh.add(donut);
                this.donuts.push(donut);
            });
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

        //TODO: Do the moon orbits and the model animations here.
        //This is the moon orbits function
        this.moons.forEach(moonPivot => {
            moonPivot.rotation.y += moonPivot.spiralMovement.speed * delta;
        });
        this.donutAnimations.forEach((animate, donut) => {
            animate.timer += delta;
            donut.rotation.z += delta * 10;
            if (animate.timer > 2.0) {
                this.donutAnimations.delete(donut);
            }
        });
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const clickableObjects = [];
        this.donuts.forEach(donut => {
            donut.traverse(child => {
                if (child.isMesh) clickableObjects.push(child);
            });
        });

        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            // Spin all donuts when any one is clicked
            this.donuts.forEach(donut => {
                if (!this.donutAnimations.has(donut)) {
                    this.donutAnimations.set(donut, { timer: 0 });
                }
            });
        }
    }
}