import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Benjamin Merhi, Aydan McGrail, Matia Paki, Dyna Benaziza
// Planet class for Team E
export class PlanetE {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.raycaster = new THREE.Raycaster();
        this.propLoader = new GLTFLoader();
        this.propScale = 1.2;

        //Create planet group
        this.group = new THREE.Group()
              
        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).

        //Planet shape
        const planetShape = new THREE.SphereGeometry(1.75, 32, 32);
        this.planetRadius = 1.75;

        //Planet material
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x4f9d69,
            roughness: 0.85,
            metalness: 0.15
        });

        //Shadow function to apply to all meshes
        this.enableShadows = (mesh) => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            return mesh;
        };

        //Create planet mesh and add to group
        const planetMesh = this.enableShadows(new THREE.Mesh(planetShape, planetMaterial));
        this.group.add(planetMesh);

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        this.moons = [];

        //random amount of moons between 1 and 3
        const moonCount = THREE.MathUtils.randInt(1, 3);

        //moon 
        for (let i = 0; i < moonCount; i++) {
            const moonPivot = new THREE.Group();
            const moonRadius = THREE.MathUtils.randFloat(0.2, 0.45);
            const moonOrbitRadius = THREE.MathUtils.randFloat(2.6, 4.2) + i * 0.5;
            const moonGeometry = new THREE.SphereGeometry(moonRadius, 12, 12);
            const moonMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0, 0, THREE.MathUtils.randFloat(0.55, 0.8)),
                roughness: 0.95,
                metalness: 0.05
            });
            const moonMesh = this.enableShadows(new THREE.Mesh(moonGeometry, moonMaterial));
            moonMesh.position.x = moonOrbitRadius;
            moonPivot.rotation.y = Math.random() * Math.PI * 2;
            moonPivot.add(moonMesh);
            this.group.add(moonPivot);
            this.moons.push({
                pivot: moonPivot,
                speed: THREE.MathUtils.randFloat(0.8, 2.2)
            });
        }

        //STEP 3:

        //Loading the 3D model prop and addinng it to the planet group
        this.planetProps = [];
        this.propLoader.load('./zucknormal.glb', (gltf) => {
            const propModel = this.preparePropModel(gltf.scene);
            const propAnchor = new THREE.Group();
            propAnchor.position.set(0, this.planetRadius, 0);
            propAnchor.userData.spinSpeed = 0;
            propAnchor.userData.isReptile = false;
            propAnchor.userData.loadingSwap = false;
            propAnchor.add(propModel);
            this.tagPropMeshes(propModel, propAnchor);

            this.group.add(propAnchor);
            this.planetProps.push(propAnchor);
        });

        this.scene.add(this.group);
    }

    //Tick
    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;
        
        // Rotate planet
        this.group.rotation.y += delta*2;

        //TODO: Do the moon orbits and the model animations here.
            for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].pivot.rotation.y += delta * this.moons[i].speed;
        }

        //Animate prop spins and decay their spin speed over time
        for (let i = 0; i < this.planetProps.length; i++) {
            const prop = this.planetProps[i];
            if (prop.userData.spinSpeed > 0) {
                prop.rotation.y += prop.userData.spinSpeed * delta;
                prop.userData.spinSpeed = Math.max(0, prop.userData.spinSpeed - delta * 8);
            }
        }
    }

    //click method to handle raycasting and prop swapping
    click(mouse, scene, camera) {
        if (this.planetProps.length === 0) {
            return;
        }

        this.raycaster.setFromCamera(mouse, camera);
        const intersections = this.raycaster.intersectObjects(this.planetProps, true);

        if (intersections.length > 0) {
            console.log("clicked")
            const clickedProp = intersections[0].object.userData.propAnchor;
            if (clickedProp) {
                clickedProp.userData.spinSpeed = 10;
                if (!clickedProp.userData.isReptile && !clickedProp.userData.loadingSwap) {
                    clickedProp.userData.loadingSwap = true;
                    this.propLoader.load('./zuckreptile.glb', (gltf) => {
                        const reptileModel = this.preparePropModel(gltf.scene);
                        console.log(reptileModel)
                        clickedProp.clear();
                        clickedProp.add(reptileModel);
                        this.tagPropMeshes(reptileModel, clickedProp);
                        clickedProp.userData.isReptile = true;
                        clickedProp.userData.loadingSwap = false;
                    });
                }
            }
        }
    }

    //helper function to prepare prop models by enabling shadows, centering them, and scaling them appropriately
    preparePropModel(model) {
        model.traverse((child) => {
            if (child.isMesh) {
                if (!child.geometry.getAttribute('normal')) {
                    child.geometry.computeVertexNormals();
                }
                if (child.material) {
                    child.material = child.material.clone();
                    child.material.vertexColors = true;
                }
                this.enableShadows(child);
            }
        });

        model.scale.setScalar(this.propScale);

        const propBox = new THREE.Box3().setFromObject(model);
        const propCenter = propBox.getCenter(new THREE.Vector3());
        model.position.x -= propCenter.x;
        model.position.z -= propCenter.z;
        model.position.y -= propBox.min.y;

        return model;
    }

    //helper function to tag all meshes in a model with a reference to their prop anchor for easy access during raycasting
    tagPropMeshes(model, propAnchor) {
        model.traverse((child) => {
            if (child.isMesh) {
                child.userData.propAnchor = propAnchor;
            }
        });
    }
}