import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
//texture
const loader = new THREE.TextureLoader();
const planet_texture = await loader.load("./textures/jupiter_texE.png");
planet_texture.colorSpace = THREE.SRGBColorSpace;

const loader2 = new THREE.TextureLoader();
const clouds_texture = await loader2.load("./textures/8k_earth_clouds.jpg");
clouds_texture.colorSpace = THREE.SRGBColorSpace;

const loadMoon1 = new THREE.TextureLoader();
const moon1_texture = await loadMoon1.load("./textures/Pinkmoon1.png");
moon1_texture.colorSpace = THREE.SRGBColorSpace;

const loadMoon2 = new THREE.TextureLoader();
const moon2_texture = await loadMoon2.load("./textures/moon2.jpg");
moon2_texture.colorSpace = THREE.SRGBColorSpace;

const loadMoon3 = new THREE.TextureLoader();
const moon3_texture = await loadMoon3.load("./textures/Tealmoon3.png");
moon3_texture.colorSpace = THREE.SRGBColorSpace;

// Planet class for Team C
export class PlanetC {
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
        // https://www.solarsystemscope.com/textures/ // cool textures
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.6, 32, 16),
            new THREE.MeshBasicMaterial({
                // color: 0x7FFFD4,
                map: planet_texture
            })
        )
        // add clouds effect?
        this.cloud = new THREE.Mesh(
            new THREE.SphereGeometry(1.7, 32, 16),
            new THREE.MeshBasicMaterial({
                // color: 0x7FFFD4,
                map: clouds_texture,
                transparent: true,
                opacity: 0.3
            })
        )
        //add glow effect
        this.glowSphere = new THREE.SphereGeometry(1.8, 32, 16);
        this.glowMaterial = new THREE.MeshBasicMaterial({
            // color: 'aquamarine',
            transparent: true,
            opacity: 0.1
        })
        this.glow = new THREE.Mesh(this.glowSphere, this.glowMaterial);
        //this.glow.castShadow = false;
        //add glow effect 2!!
        this.glowSphere2 = new THREE.SphereGeometry(1.9, 32, 16);
        this.glowMaterial2 = new THREE.MeshBasicMaterial({
            color: 'hotpink',
            transparent: true,
            opacity: 0.1
        })
        this.glow2 = new THREE.Mesh(this.glowSphere2, this.glowMaterial2);
        //this.glow2.castShadow = false;
        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        //make 3 moons and make them orbit around planet c
        //creates 3 moons distict moons, colors, and orbit speeds and radii
        const loader = new THREE.TextureLoader();
        //CHANGE TEXTURE 
        // const moonTexture = loader.load('js/clouds.jpg');
        // moonTexture.colorSpace = THREE.SRGBColorSpace; // Set the color space to sRGB
        //create 3 different moons with set geometries, materials, orbit speeds and radii
        this.moon1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 8),
            new THREE.MeshStandardMaterial({ 
                //color: 'pink'
                map: moon1_texture 
            })
        );
        this.moon1.userData = { orbitRadius: 3, orbitSpeed: 0.02, angle: Math.PI * 2 };
        this.group.add(this.moon1);

        this.moon2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 8),
            new THREE.MeshStandardMaterial({ 
                // color: 'lightgreen'
                map: moon3_texture
            })
        );
        this.moon2.userData = { orbitRadius: 2, orbitSpeed: 0.5, angle: Math.PI * 2 };
        this.group.add(this.moon2);

        this.moon3 = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 16, 8),
            new THREE.MeshStandardMaterial({ 
                // color: 'darkgray' 
                map: moon2_texture 
            })
        );
        this.moon3.userData = { orbitRadius: 4, orbitSpeed: 0.2, angle: Math.PI * 2 };
        this.group.add(this.moon3);

        //illuminate the moons with a point light at the center of the planet
        const pointLight = new THREE.PointLight(0xffffff, 1, 10);
        pointLight.position.set(0, 0, 0);
        this.group.add(pointLight);

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
        //3d model from:https://www.cgtrader.com/items/2595751/download-page

        const loader3 = new FBXLoader();
        loader3.load('js/models/UFO_Model.fbx', (object) => {
            //orient the model correctly to planet surface
            object.rotation.x = 0; //rotation around the X-axis
            object.rotation.y = Math.PI * 2; //rotation around the Y-axis
            object.rotation.z = Math.PI * 2; // rotation around the Z-axis

            //set constant scale size of model
            const scale = 0.002; // Adjust the scale as needed
            object.scale.set(scale, scale, scale);
            // Position on the planet surface 
            const radius = 2.2; // planet radius
            //random position on the planet surface using spherical coordinates
            const theta = Math.PI * 2;
            const phi = Math.acos(1);
            object.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            );

            // Store reference to the model for animation
            this.model = object;
            this.originalY = object.position.y;
            this.bounceTime = 0;

            // Add to planet group instead of scene
            this.group.add(object);
        });

        //load another model:https://www.cgtrader.com/items/2983439/download-page
        loader3.load('js/models/simple_cow.fbx', (object) => {
            //orient the model correctly to planet surface
            object.rotation.x = 0; //rotation around the X-axis
            object.rotation.y = 100; //rotation around the Y-axis
            object.rotation.z = 0.75; // rotation around the Z-axis


            // Position the cow on the planet surface
            const radius = 1.5;
            const theta = Math.PI; // different position
            const phi = Math.acos(0.5);
            object.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            );

            // Scale and add to group
            object.scale.set(0.001, 0.001, 0.001);
            this.group.add(object);

        });
        //duplicate the cow model and place it in a different location on the planet
        loader3.load('js/models/simple_cow.fbx', (object) => {
            //orient the model correctly to planet surface
            object.rotation.x = 0; //rotation around the X-axis
            object.rotation.y = 90; //rotation around the Y-axis
            object.rotation.z = 90; // rotation around the Z-axis

            // Position the second cow on the planet surface at a different location
            const radius = 1.5;
            const theta = Math.PI * 0.5; // different position (90 degrees around)
            const phi = Math.acos(-0.3);
            object.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            );

            // Scale and add to group
            object.scale.set(0.001, 0.001, 0.001);
            this.group.add(object);
        });

        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!
        this.group.add(this.sphere, this.cloud, this.glow, this.glow2);
        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        // Animate model bounce if active
        if (this.model && this.bounceTime > 0) {
            this.model.position.y = this.originalY + Math.sin(this.bounceTime * 4) * 0.3; // bounce up and down
            this.bounceTime -= delta * 3; // slow down over time
            if (this.bounceTime < 0) this.bounceTime = 0; // stop
        }

        //TODO: Do the moon orbits and the model animations here.
        //makes all the moons orbit around the planet
        this.group.children.forEach(child => {
            if (child.userData.orbitRadius) {
                child.userData.angle += child.userData.orbitSpeed * delta * 3;
                child.position.x = Math.cos(child.userData.angle) * child.userData.orbitRadius;
                child.position.z = Math.sin(child.userData.angle) * child.userData.orbitRadius;
            }
        });

    }

    click(mouse, scene, camera) {
        //Raycasting to detect clicks on the model
        if (this.model) {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(this.model, true); // check for intersection with the model and its children
            if (intersects.length > 0) {
                console.log("intersected");
                // Start bounce animation
                this.bounceTime = Math.PI * 2; // about 2 seconds of bouncing
            }
        }
    }
}

