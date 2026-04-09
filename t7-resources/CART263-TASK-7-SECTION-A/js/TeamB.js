import * as THREE from 'three';
//Ray, Yann, Zhuoheng 
// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed, teamBTextures, teamBModels) {

        //new
        this.textures = teamBTextures
        this.models = teamBModels || [];
        this.spawnedModels = [];
        //new
        this.scene = scene
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        const rockColorTexture = this.textures.planet.color;
        const rockNormalTexture = this.textures.planet.normal;
        const rockRoughnessTexture = this.textures.planet.roughness;
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const planetGeometry = new THREE.SphereGeometry(2, 32, 32);
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        const planetMaterial = new THREE.MeshStandardMaterial({
            map: rockColorTexture,
            normalMap: rockNormalTexture,
            roughnessMap: rockRoughnessTexture,
            color: new THREE.Color('#8a5a42'),
            emissive: new THREE.Color('#66150a'),
            emissiveIntensity: 0.2
        });
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.group.add(this.planetMesh);

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        const moon1ColorTexture = this.textures.moon1.color;
        const moon1NormalTexture = this.textures.moon1.normal;
        const moon1RoughnessTexture = this.textures.moon1.roughness;

        const moon2ColorTexture = this.textures.moon2.color;
        const moon2NormalTexture = this.textures.moon2.normal;
        const moon2RoughnessTexture = this.textures.moon2.roughness;

        this.moon1OrbitGroup = new THREE.Group();
        this.moon2OrbitGroup = new THREE.Group();

        const moon1Geometry = new THREE.SphereGeometry(0.35, 24, 24);
        const moon2Geometry = new THREE.SphereGeometry(0.55, 24, 24);

        const moon1Material = new THREE.MeshStandardMaterial({
            map: moon1ColorTexture,
            normalMap: moon1NormalTexture,
            roughnessMap: moon1RoughnessTexture,
            color: new THREE.Color('#8a8178')
        });

        const moon2Material = new THREE.MeshStandardMaterial({
            map: moon2ColorTexture,
            normalMap: moon2NormalTexture,
            roughnessMap: moon2RoughnessTexture,
            color: new THREE.Color('#9b7b67')
        });

        this.moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);
        this.moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
        this.moon1Mesh.castShadow = true;
        this.moon1Mesh.receiveShadow = true;
        this.moon2Mesh.castShadow = true;
        this.moon2Mesh.receiveShadow = true;
        this.moon1Mesh.position.x = 3.0;
        this.moon2Mesh.position.x = 4.0;
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        this.moon2OrbitGroup.rotation.y = Math.PI;
        this.moon1OrbitSpeed = 1.0;
        this.moon2OrbitSpeed = 0.5;
        this.moon1OrbitGroup.add(this.moon1Mesh);
        this.moon2OrbitGroup.add(this.moon2Mesh);
        this.group.add(this.moon1OrbitGroup);
        this.group.add(this.moon2OrbitGroup);

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        const planetRadius = 2;
        const numModels = this.models.length;

        const modelAngles = [];
        let totalAngle = 0;

        this.models.forEach((gltf, i) => {
            const model = gltf.scene.clone(true);
            const modelScale = (i >= numModels - 2) ? 0.45 : 0.65;
            model.scale.set(modelScale, modelScale, modelScale);

            const bbox = new THREE.Box3().setFromObject(model);
            const width = bbox.max.x - bbox.min.x;
            const angularWidth = width / planetRadius;
            modelAngles.push(angularWidth);
            totalAngle += angularWidth;
        });

        let currentAngle = 0;
        const gap = numModels > 0 ? (2 * Math.PI - totalAngle) / numModels : 0;

        this.models.forEach((gltf, i) => {
            const model = gltf.scene.clone(true);

            let modelScale = 0.65;
            if (i === numModels - 1) {
                modelScale = 0.35;
            }
            model.scale.set(modelScale, modelScale, modelScale);

            const bbox = new THREE.Box3().setFromObject(model);
            const minY = bbox.min.y;

            const angle = currentAngle + modelAngles[i] / 2;
            const x = Math.cos(angle) * planetRadius * 0.70;
            const z = Math.sin(angle) * planetRadius * 0.70;
            const y = planetRadius * 0.70 - minY;

            model.position.set(x, y, z);
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
            model.lookAt(new THREE.Vector3(0, planetRadius * 0.95, 0));
            model.rotation.y += Math.random() * 0.3;

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            this.group.add(model);
            this.spawnedModels.push(model);

            currentAngle += modelAngles[i] + gap;
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
        this.moon1OrbitGroup.rotation.z += delta * this.moon1OrbitSpeed;
        this.moon2OrbitGroup.rotation.y += delta * this.moon2OrbitSpeed;

        this.spawnedModels.forEach((model) => {
            if (model.userData.isAnimating) {
                model.userData.animationTime += delta * 4;

                model.position.y =
                    model.userData.originalY +
                    Math.sin(model.userData.animationTime * Math.PI) * 0.4;

                model.rotation.y += delta * 4;

                if (model.userData.animationTime >= 1) {
                    model.userData.isAnimating = false;
                    model.position.y = model.userData.originalY;
                }
            }
        });
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const clickableObjects = [this.planetMesh];

        this.spawnedModels.forEach((model) => {
            model.traverse((child) => {
                if (child.isMesh) {
                    clickableObjects.push(child);
                }
            });
        });

        const intersects = raycaster.intersectObjects(clickableObjects, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (clickedObject === this.planetMesh) {
                this.planetMesh.material.emissiveIntensity = 1.0;

                setTimeout(() => {
                    this.planetMesh.material.emissiveIntensity = 0.2;
                }, 300);
                return;
            }

            let clickedModel = null;

            for (const model of this.spawnedModels) {
                if (
                    model === clickedObject ||
                    model.children.includes(clickedObject) ||
                    model.getObjectById(clickedObject.id)
                ) {
                    clickedModel = model;
                    break;
                }
            }

            if (clickedModel) {
                clickedModel.userData.isAnimating = true;
                clickedModel.userData.animationTime = 0;
                clickedModel.userData.originalY = clickedModel.position.y;
            }
        }
    }
}
