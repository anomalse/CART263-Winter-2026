import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Sophia, Skyla and Abhinav
// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        //TODO: Add the planet mesh to the planet group.

        //create planet B, red and blue metal planet
        const geometryPlanetB = new THREE.SphereGeometry(1.5, 64, 64);//give planet radius, width segments (64 is max), height segments (64 is max), width and height makes it as round as can be
        const materialPlanetB = new THREE.MeshStandardMaterial({
            color: 0x3d88b3,//0x makes it a hex decimal instead of rgb, blue rn
            emissive: 0x852929,//red rn
            emissiveIntensity: .5,//default 1
            flatShading: false,
            metalness: .9,
            roughness: .7,
        });//color of planet, emissive color it emits, flat shading shaded the facets of the sphere, metalness max 1 (looks most metalic), roughness 0 makes super shiny
        const planetB = new THREE.Mesh(geometryPlanetB, materialPlanetB);

        //creating shadows
        planetB.castShadow = true //sphere is making a shadow
        planetB.receiveShadow = true //sphere can receive shadow

        //add to planetB to planet group
        this.group.add(planetB);


        //create glow effect
        const glowGeometryB = new THREE.SphereGeometry(2, 10, 12);//creates weird red blob around planet, rad can't be bigger than 2 according to prompt
        const glowMaterialB = new THREE.MeshBasicMaterial({
            color: 0x852929,//same color as emissive
            transparent: true,
            opacity: 0.35,
        });
        const planetBglow = new THREE.Mesh(glowGeometryB, glowMaterialB);

        //no shadow on glow effect
        planetBglow.castShadow = false;

        //add glow to planet group
        this.group.add(planetBglow);


        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.


        const moonNum = Math.random() * (3 - 1) + 1; //create random num of moons between 1 and 3
        this.moons = []; //creates array to store moons, this. makes universally accessible, accessed in update


        //creates moons
        for (let i = 0; i < moonNum; i++) {

            const moonRotation = new THREE.Group();//make group for all moons for planet B


            //create moon
            const geometryMoon = new THREE.SphereGeometry(Math.random() * (0.7 - 0.4) + 0.4, 32, 32);//made rad between 0.4 and 0.7, 32 because it's small we don't need the detail of 64 segments
            const materialMoon = new THREE.MeshStandardMaterial({
                color: 0x852929,
                emissive: 0x3d88b3,
                emissiveIntensity: .5,//default 1
                flatShading: false,
                metalness: .9,
                roughness: .7,
            });
            const moon = new THREE.Mesh(geometryMoon, materialMoon);


            //shadows, moons can create and receive shadows
            moon.castShadow = true;
            moon.receiveShadow = true;


            //offsets moons on different orbitting rings, offeset based on index
            const orbitRad = 3 + i * 1.5
            moon.position.x = orbitRad;

            //random start angle, do moon rotation group because rotation relative to planet B is easier than having each moon moving independently, rotation around planet B works because moon group is in the planet group so planet B becomes center of rotation
            moonRotation.rotation.y = Math.random() * Math.PI * 2


            //add moon to moon rotation group, need this for different start angles
            moonRotation.add(moon);

            //add moon to moons array, three moonGroup are created idk this logic is a bit questionable but it works 
            this.moons.push({ group: moonRotation, speed: Math.random() * (1 - 0.5) + 0.5 }); //speed in between 0.5 and 1

            //three moon rotation to planet group
            this.group.add(moonRotation);

            console.log(moonRotation);
        };



        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        // note: planet radius: 1.5
        // load in model 
        const loader = new GLTFLoader();

        loader.load(
        'models/tree/scene.gltf', // path to model
        (gltf) => { 
            const tree1 = gltf.scene;
            tree1.position.set(0, 1.4, 0); // position
            tree1.scale.set(5, 5, 5); // scale 
            tree1.rotation.y = 0; // rotate 
            //tree1.rotation.x = Math.PI / 2;
            planetB.add(tree1);

            var tree2 = tree1.clone(); 
            tree2.position.set(0, 0, 1.4); // position
            tree2.scale.set(5,5,5);
            tree2.rotation.x = Math.PI/2; 
            planetB.add(tree2)

            var tree3 = tree1.clone(); 
            tree3.position.set(1.4, 0, 0); // position
            tree3.scale.set(5,5,5);
            tree3.rotation.z = -Math.PI/2; 
            planetB.add(tree3)

            var tree4 = tree1.clone(); 
            tree4.position.set(0, -1.4, 0); // position
            tree4.scale.set(5,5,5);
            tree4.rotation.x = Math.PI; 
            planetB.add(tree4);

            var tree5 = tree1.clone(); 
            tree5.position.set(0, 0, -1.4); // position
            tree5.scale.set(5,5,5);
            tree5.rotation.x = -Math.PI/2; 
            planetB.add(tree5)

            var tree6 = tree1.clone(); 
            tree6.position.set(-1.4, 0, 0); // position
            tree6.scale.set(5,5,5);
            tree6.rotation.z = Math.PI/2; 
            planetB.add(tree6); 
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }); 

        const catLoader = new GLTFLoader();

        catLoader.load(
        'models/cat/scene.gltf', // path to model
        (gltf) => { 
            const cat1 = gltf.scene;
            cat1.position.set(0, 1, 1); // position
            cat1.scale.set(0.02,0.02,0.02); // scale 
            cat1.rotation.y = 0; // rotate 
            cat1.rotation.x = Math.PI / 3;
            planetB.add(cat1);

        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
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

        //Moons Orbiting PlanetB
        this.moons.forEach(moon => {
            moon.group.rotation.y += delta * moon.speed;
        });
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}