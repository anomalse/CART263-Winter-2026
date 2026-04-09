import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//
// Planet class for Team D
export class PlanetD {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        this.summerPlanet = null;
        this.autumnPlanet = null;
        this.winterPlanet = null;

        //Create planet group
        this.group = new THREE.Group()
        //season for planets
        this.currentSeason = 0; // 0 = summer, 1 = autumn, 2 = winter

        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        //TODO: Add the planet mesh to the planet group.


        const planetGeo = new THREE.SphereGeometry(2, 32, 16); // radius between 1.5 and 2
        const planetMat = new THREE.MeshStandardMaterial({
            color: '#ff0000'
        });

        //placeholder red planet
        this.mesh = new THREE.Mesh(planetGeo, planetMat);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.group.add(this.mesh);


        //for moon orbit
        this.moon1Angle = Math.random() * Math.PI * 2;
        this.moon2Angle = Math.random() * Math.PI * 2;
        this.moon3Angle = Math.random() * Math.PI * 2; //
        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

        //Moon1
        const moon1Geo = new THREE.SphereGeometry(1, 16, 12);
        const moon1Mat = new THREE.MeshStandardMaterial({
            color: '#00a2ff'
        });

        this.moon1 = new THREE.Mesh(moon1Geo, moon1Mat);

        this.moon1.position.set(5, 1, 0);

        this.group.add(this.moon1);

        //Moon2
        const moon2Geo = new THREE.SphereGeometry(.5, 16, 12);
        const moon2Mat = new THREE.MeshStandardMaterial({
            color: '#ff00d4'
        });

        this.moon2 = new THREE.Mesh(moon2Geo, moon2Mat);

        this.moon2.position.set(6, -3, 3);

        this.group.add(this.moon2);


        // //Moon3
        const moon3Geo = new THREE.SphereGeometry(0.7, 16, 12);
        const moon3Mat = new THREE.MeshStandardMaterial({
            color: '#6e3cfa'
        });

        this.moon3 = new THREE.Mesh(moon3Geo, moon3Mat);

        this.moon3.position.set(10, 2, 0);

        this.group.add(this.moon3);


        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        //load and run planets gltf!!
        this.loadAndRunModels(this.group);

        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }
    setSeason(seasonIndex) {
        if (this.summerPlanet) this.summerPlanet.visible = false;
        if (this.autumnPlanet) this.autumnPlanet.visible = false;
        if (this.winterPlanet) this.winterPlanet.visible = false;

        if (seasonIndex === 0 && this.summerPlanet) this.summerPlanet.visible = true;
        if (seasonIndex === 1 && this.autumnPlanet) this.autumnPlanet.visible = true;
        if (seasonIndex === 2 && this.winterPlanet) this.winterPlanet.visible = true;

        this.currentSeason = seasonIndex;
    }


    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        //TODO: Do the moon orbits and the model animations here.
        //Rotate planet
        this.group.rotation.y += delta * 0.5;

        //make summer visible first and standby for the others
        // if (this.summerPlanet) {
        //     this.summerPlanet.visible = false;
        // }
        // if (this.autumnPlanet) {
        //     this.autumnPlanet.visible = true;
        // }
        // if (this.winterPlanet) {
        //     this.winterPlanet.visible = false;
        // }
        this.setSeason(this.currentSeason);
        //moons orbit planet
        if (this.moon1) {
            this.moon1Angle += delta * 1.0; //speed moon1
            this.moon1.position.x = Math.cos(this.moon1Angle) * 5;
            this.moon1.position.z = Math.sin(this.moon1Angle) * 5;
            this.moon1.position.y = 1;

        }

        if (this.moon2) {
            this.moon2Angle += delta * 0.7; //speed moon2
            this.moon2.position.x = Math.cos(this.moon2Angle) * 6;
            this.moon2.position.z = Math.sin(this.moon2Angle) * 6;
            this.moon2.position.y = -3;
        }
        if (this.moon3) {
            this.moon3Angle += delta * 1.5; //speed moon3
            this.moon3.position.x = Math.cos(this.moon3Angle) * 10;
            this.moon3.position.z = Math.sin(this.moon3Angle) * 10;
            this.moon3.position.y = 2;
        }


        if (!this.clickedObjects) this.clickedObjects = [];




    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);


        const clickableObjects = [this.mesh, this.summerPlanet, this.autumnPlanet, this.winterPlanet];
        const intersects = raycaster.intersectObjects(clickableObjects, true); // 

        if (intersects.length > 0) {
            //cycle through planetseasons
            this.currentSeason = (this.currentSeason + 1) % 3;
            this.setSeason(this.currentSeason);

            //planet POP
            const planet = [this.summerPlanet, this.autumnPlanet, this.winterPlanet][this.currentSeason];
            planet.scale.set(3.2, 3.2, 3.2);
            setTimeout(() => {
                planet.scale.set(3, 3, 3);
            }
                , 200);

            //console.log("Season:", ["Summer", "Autumn", "Winter"][this.currentSeason]);
        }
    }

    async loadAndRunModels(objsGroup) {

        // gltf loader
        const gltfLoader = new GLTFLoader();

        // add gltf model
        let gltfModel1 = null;
        let gltfModel2 = null;
        let gltfModel3 = null;
        let objs = []

        try {
            gltfModel1 = await gltfLoader.loadAsync('models/summer-planet-task7-cart263.gltf');
            gltfModel2 = await gltfLoader.loadAsync('models/autumn-planet-task7-cart263.gltf');
            gltfModel3 = await gltfLoader.loadAsync('models/winter-planet-task7-cart263.gltf');

            objs.push(gltfModel1)
            objs.push(gltfModel2)
            objs.push(gltfModel3)
        }
        catch (error) {
            console.log(error.message)
        }

        let lanternLights = [];
        let planetLights = [];

        //setup planet1 -- summer
        let summerPlanet = gltfModel1.scene;


        planetLights.push(summerPlanet.children[0].children[8]);
        lanternLights.push(summerPlanet.children[0].children[7]);

        //setup planet2 -- autumn
        let autumnPlanet = gltfModel2.scene;
        planetLights.push(autumnPlanet.children[0].children[8]);
        lanternLights.push(autumnPlanet.children[0].children[7]);

        //setup planet3 -- winter
        let winterPlanet = gltfModel3.scene;
        planetLights.push(winterPlanet.children[0].children[8]);
        lanternLights.push(winterPlanet.children[0].children[7]);

        //setup lights
        planetLights.forEach(element => {
            element.intensity = 0;
        });
        lanternLights.forEach(element => {
            element.intensity = 2;
        });

        lanternLights[0].color.set(0xFFFFFF); //white for summer
        lanternLights[1].color.set(0xFF8B2C); //orange for fall
        lanternLights[2].color.set(0xFF0000); //red for winter

        objs.forEach(element => {
            element.scene.position.set(0, 0, 0);
            element.scene.scale.set(3, 3, 3);
            element.scene.castShadow = true;
            element.scene.receiveShadow = true;
        });



        //set variables for modification and manipulation outside of function
        this.summerPlanet = summerPlanet;
        this.autumnPlanet = autumnPlanet;
        this.winterPlanet = winterPlanet;

        //push to group
        objsGroup.add(summerPlanet, autumnPlanet, winterPlanet);
        //show starting season as summer
        summerPlanet.visible = true;
        autumnPlanet.visible = false;
        winterPlanet.visible = false;

    }
}
