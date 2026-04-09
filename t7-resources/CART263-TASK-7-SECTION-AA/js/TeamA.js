import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// Planet class for Team A
//Aliyah and Lanna
export class PlanetA {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        // Randomizes starting point of the planet
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: '#ed9829',
            emissive: '#ed9829',
            emissiveIntensity: 0.5,
            roughness: 0.1
        });

        this.mesh = new THREE.Mesh(geometry, material);


        //TODO: Give it a custom material using THREE.MeshStandardMaterial.

        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        this.mesh.castShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.group.add(this.mesh);
        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        this.moonGroup = new THREE.Group();
        this.moon1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshStandardMaterial({ color: '#dfddd8' }));
        this.moon1Angle = Math.random() * Math.PI * 2;
        this.moon2Angle = Math.random() * Math.PI * 2;
        this.moonOrbit1 = 2.5;
        this.moonOrbit2 = 2;
        this.moon2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshStandardMaterial({ color: '#dfddd8' }));
        this.moonGroup.add(this.moon1, this.moon2);
        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        // 3D Stuff
        this.gltfFlag = null;
        this.gltfAstronaut = null;
        this.astronautModel = null;
        this.mixerAstronaut = null;
        // Load models
        this.loadModels();
        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!
        this.group.add(this.moonGroup);
        this.scene.add(this.group);


        // this.Models = this.loadModels();
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        //TODO: Do the moon orbits and the model animations here.
        // Moon orbit speeds
        this.moon1Angle += delta * 2;
        this.moon2Angle += delta * 1.5;

        // Moon 1 orbit
        this.moon1.position.x = Math.cos(this.moon1Angle) * this.moonOrbit1;
        this.moon1.position.z = Math.sin(this.moon1Angle) * this.moonOrbit1;

        // Moon 2 orbit
        this.moon2.position.x = Math.cos(this.moon2Angle) * this.moonOrbit2;
        this.moon2.position.z = Math.sin(this.moon2Angle) * this.moonOrbit2;
        // Orbit around the planet
        this.moonGroup.rotation.y += delta * 0.2;

        // // Play astronaut animation
        if (this.mixerAstronaut) {
            this.mixerAstronaut.update(delta * 3);
        }
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        // Raycast
        
        const raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(mouse, camera);

        if (!this.astronautModel) return;

        const intersects = raycaster.intersectObject(this.astronautModel, true);
       


        if (intersects.length > 0) {

            console.log("Astronaut clicked!");

            if (this.astronautAction) {
                this.astronautAction.reset();
                this.astronautAction.play();
            }
        }
    }
    /**
     * Load 3D models
     */
    async loadModels() {
        const gltLoader = new GLTFLoader();
        try {
            this.gltfFlag = await gltLoader.loadAsync('models/flag_in_the_wind/flag.gltf');
            this.gltfAstronaut = await gltLoader.loadAsync('models/astronaut_with_flag/scene.gltf');

            // add models to an array
            let objs = []
            objs.push(this.gltfFlag);
            objs.push(this.gltfAstronaut);
            // console.log(objs);
            this.addModels(objs);
            // return objs;
        }
        catch (error) {
            console.log(error.message)
        }
    }
    /**
     *  Add 3D models to the planet group
     */
    addModels(objsArray) {
        this.astronautModel = objsArray[1].scene.children[0];
        this.mixerAstronaut = new THREE.AnimationMixer(this.astronautModel);
        // Load the first animation clip in the astronaut file

        const clip = objsArray[1].animations[0];
        this.astronautAction = this.mixerAstronaut.clipAction(clip);
        // anim_action.play();
        // astronautModel.scale.set(.015, .015, .015);

        this.astronautModel.position.y = 1.2;
        this.group.add(this.astronautModel);
    }
}

