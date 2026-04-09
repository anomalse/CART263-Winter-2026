import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Jordan, Huynh
// Planet class for Team D
export class PlanetD {
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

        const planetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); //Blue planet
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        planetMesh.castShadow = true;
        planetMesh.receiveShadow = true;
        this.group.add(planetMesh);


        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

        this.moons = [];
        const moonPivot1 = new THREE.Group();
        
        const moon1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x888888 }) //Gray moon
        );

        moon1.castShadow = true;
        moon1.receiveShadow = true;

        moon1.position.set(2, 0, 0); // Position moon 1 at a distance from the planet
        moonPivot1.add(moon1);

        this.group.add(moonPivot1);
        this.moons.push({ pivot: moonPivot1, speed: 0.5 });


        const moonPivot2 = new THREE.Group();
        
        const moon2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xaaaaaa }) //Lighter gray moon
        );

        moon2.castShadow = true;
        moon2.receiveShadow = true;

        moon2.position.x = 5; // Position moon 2 at a distance from the planet
        moonPivot2.add(moon2);

        moonPivot2.rotation.z = Math.PI / 4;
        moonPivot2.rotation.y = Math.random() * Math.PI * 2;

        this.group.add(moonPivot2);
        this.moons.push({ pivot: moonPivot2, speed: 0.3 });


        // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        this.loader = new GLTFLoader();
        this.models = [];

        for (let i = 0; i < 1; i++) {
            this.loader.load('models/ExoplanetWithBarrier-LowPoly.gltf', (gltf) => {
                const model = gltf.scene;
                
                model.scale.set(0.5, 0.5, 0.5); // Scale down the model
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Position model on a different orbit
            
                const angle = Math.random() * Math.PI * 2;
                const radius = 10;
                model.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
                model.rotation.y = Math.random() * Math.PI * 2; // Random rotation
                
                
                this.group.add(model);
                this.models.push(model);
            });
        }

        this.loader = new GLTFLoader();
        this.models = [];

        const modelCount = 4;      // how many copies on the planet
        const planetRadius = 1.7;  // same as sphere radius

        for (let i = 0; i < modelCount; i++) {
            this.loader.load(
                'models/house.gltf',
                (gltf) => {
                    const model = gltf.scene;

                    // scale the model
                    model.scale.set(0.05, 0.05, 0.05);

                    // shadows + optional custom material
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Position model on the planet surface
                    const angle = Math.random() * Math.PI * 2;
                    const y = Math.random() * 0.5; // Random height
                    model.position.set(Math.cos(angle) * planetRadius, y, Math.sin(angle) * planetRadius);
                    model.rotation.y = Math.random() * Math.PI * 2; // Random rotation

                    this.group.add(model);
                    this.models.push(model);
                }
            );
        }


        this.scene.add(this.group);
    }

    //STEP 4:
    //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
    //TODO: Use your imagination and creativity!


    
    update(delta) {
        // Orbit around sun
        console.log(this.angle);
        this.angle += this.orbitSpeed;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;
        
        // Rotate planet
        this.group.rotation.y += delta*0.5;

        //TODO: Do the moon orbits and the model animations here.
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        }
}


