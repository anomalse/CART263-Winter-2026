import * as THREE from 'three';
//Amélie,Philippe,Joyce
// Planet class for Team C
export class PlanetC {
    constructor(scene, orbitRadius, orbitSpeed, teamCTextures, teamCModels) {
        this.textures = teamCTextures;
        this.models = teamCModels;
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.grass_texture = this.textures[0];
        this.moon_texture = this.textures[1];

        //Create planet group
        this.group = new THREE.Group()

        // Choose a theme for your team's planet: MEDIEVAL
        // Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        // Give it a custom material using THREE.MeshStandardMaterial.
        // Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        // Add the planet mesh to the planet group.
        // Add from 1 to 3 orbiting moons to the planet group.
        // The moons should rotate around the planet just like the planet group rotates around the Sun.
        // Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        // Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
        // Use raycasting in the click() method below to detect clicks on the planet and/or models, and make an animation happen upon clicking.
        // Use your imagination and creativity!

        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        this.planet = new THREE.SphereGeometry(1.5, 32, 32); // (radius, w segments, h segments)
        //TODO: Give it a custom material using THREE.MeshStandardMaterial. 
        // https://architextures.org/textures/554
        this.grass_texture.colorSpace = THREE.SRGBColorSpace;
        this.grass = new THREE.MeshStandardMaterial({map: this.grass_texture});
        this.medievalLand = new THREE.Mesh(this.planet, this.grass);
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        this.medievalLand.castShadow = true;
        this.medievalLand.receiveShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.group.add(this.medievalLand);

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        this.moonSphere1 = new THREE.SphereGeometry(0.5, 32, 32);
        // https://github.com/mrdoob/three.js/blob/dev/examples/textures/planets/moon_1024.jpg
        this.moon_texture.colorSpace = THREE.SRGBColorSpace;
        this.moonRock = new THREE.MeshStandardMaterial({map: this.moon_texture});
        this.medievalMoon1 = new THREE.Mesh(this.moonSphere1, this.moonRock);
            this.medievalMoon1.castShadow = true;
            this.medievalMoon1.receiveShadow = true;
        this.moonSphere2 = new THREE.SphereGeometry(0.3, 32, 32);
        this.medievalMoon2 = new THREE.Mesh(this.moonSphere2, this.moonRock);
            this.medievalMoon2.castShadow = true;
            this.medievalMoon2.receiveShadow = true;
        this.moonSphere3 = new THREE.SphereGeometry(0.3, 32, 32);
        this.medievalMoon3 = new THREE.Mesh(this.moonSphere3, this.moonRock);
            this.medievalMoon3.castShadow = true;
            this.medievalMoon3.receiveShadow = true;
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        // adding the rotation in update
        this.group.add(this.medievalMoon1);
        this.medievalMoon1.angle = Math.random() * Math.PI * 2;
        this.group.add(this.medievalMoon2);
        this.medievalMoon2.angle = Math.random() * Math.PI * 2;
        this.group.add(this.medievalMoon3);
        this.medievalMoon3.angle = Math.random() * Math.PI * 2;
        // console.log(medievalMoon1)

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
        // "Sheep" (https://skfb.ly/oAyUw) by DibArts is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
        this.sheepModel1 = this.models[0].scene.children[0];
            this.sheepModel1.castShadow = true;
            this.sheepModel1.receiveShadow = true;
        this.sheepModel1.scale.set(.10,.10,.10)
        this.group.add(this.sheepModel1);
        this.sheepModel1.angle = Math.PI * 2; // set it on the right side of the planet's surface
        this.sheepModel1.rotation.set(0, -1.57, 0); // to rotate 90 degrees to get it sideways

        // this.sheepModel2 = this.models[0].scene.children[0];
        // console.log(this.sheepModel2)
        //     this.sheepModel2.castShadow = true;
        //     this.sheepModel2.receiveShadow = true;
        // this.sheepModel2.scale.set(.10,.10,.10);
        // this.group.add(this.sheepModel2);
        // this.sheepModel2.angle = Math.PI; // set it on the left side of the planet's surface
        // this.sheepModel2.rotation.set(0, 1.57, 0);
        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        //raycaster setup
        this.raycaster = new THREE.Raycaster();

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.medievalLand.rotation.y += delta * 0.5;

        //TODO: Do the moon orbits and the model animations here.
        // Moon 1 is larger, so its orbit is slower
        this.medievalMoon1.angle += this.orbitSpeed * 5 * delta * 30;
        this.medievalMoon1.position.x = Math.cos(this.medievalMoon1.angle) * this.orbitRadius/5;
        this.medievalMoon1.position.z = Math.sin(this.medievalMoon1.angle) * this.orbitRadius/5;

        this.medievalMoon2.angle += this.orbitSpeed * 10 * delta * 30;
        this.medievalMoon2.position.x = Math.cos(this.medievalMoon2.angle) * this.orbitRadius/5;
        this.medievalMoon2.position.y = Math.cos(this.medievalMoon2.angle) * this.orbitRadius/5;
        this.medievalMoon2.position.z = Math.sin(this.medievalMoon2.angle) * this.orbitRadius/5;
        
        this.medievalMoon3.angle += this.orbitSpeed * 10 * delta * 30;
        this.medievalMoon3.position.y = Math.cos(this.medievalMoon3.angle) * this.orbitRadius/3;
        this.medievalMoon3.position.z = Math.sin(this.medievalMoon3.angle) * this.orbitRadius/3;

        this.sheepModel1.angle += delta * 0.75; // I just need it horizontal, at the planet's radius, going in a circle around the planet at the same speed as the planet is turning, and rotating itself accordingly; I don't understand why it's so hard to keep track of its angle
        // linear speed = r * angular speed
        // in first case, radius is 1.5 and angular speed is 0.5rad/f, s = 3pi (2pi*r)
        // linear speed = 0.75
        this.sheepModel1.position.x = Math.cos(this.sheepModel1.angle) * -1.5; // 1.5 is planet radius, go towards right
        this.sheepModel1.position.z = Math.sin(this.sheepModel1.angle) * 1.5; // 1.5 is planet radius
        this.sheepModel1.rotation.y += delta * 0.75; // match planet rotation speed
        
        // this.sheepModel2.angle += delta * 0.75;
        // this.sheepModel2.position.x = Math.cos(this.sheepModel2.angle) * -1.5; // 1.5 is planet radius, go towards right
        // this.sheepModel2.position.z = Math.sin(this.sheepModel2.angle) * 1.5; // 1.5 is planet radius
        // this.sheepModel2.rotation.y += delta * 0.75; // match planet rotation speed
        
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        this.raycaster.setFromCamera(mouse, camera);

        const clickObj = [
            this.medievalLand,
            this.medievalMoon1,
            this.medievalMoon2,
            this.medievalMoon3
        ];

        const intersects = this.raycaster.intersectObjects(clickObj, true);
        let currentIntersectedObj = null;

        if (intersects.length > 0) {
            if(currentIntersectedObj===null){
                currentIntersectedObj = intersects[0];
                currentIntersectedObj.object.material.color.set("#ff00f2");
            }
            else{
                // check if NOT null (so there was one just over)
                if(currentIntersectedObj!==null){
                    // console.log("mouse out")
                    currentIntersectedObj.object.material.color.set("#ff1900");
                    currentIntersectedObj =null
                }
            }
        }

    }
}

