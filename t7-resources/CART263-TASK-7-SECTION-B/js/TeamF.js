import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

// Planet class for Team F
export class PlanetF {
  constructor(scene, orbitRadius, orbitSpeed) {
    this.scene = scene;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.angle = Math.random() * Math.PI * 2;

    this.clickableObjects = [];
    this.raycaster = new THREE.Raycaster();

    this.isPlanetAnimating = false;
    this.animationTime = 0;

    this.planetMesh = null;
    this.moons = [];
    this.props = [];

    //Create planet group
    this.group = new THREE.Group();

    // Create planet
    //STEP 1:
    //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
    //TODO: Give it a custom material using THREE.MeshStandardMaterial.
    //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
    //TODO: Add the planet mesh to the planet group.

    const geometry = new THREE.SphereGeometry(2, 10, 10); //3d dimension of the sphere
    const material = new THREE.MeshStandardMaterial({ color: 0x95d4ee });
    const mesh = new THREE.Mesh(geometry, material);
    this.group.castShadow = true;
    this.group.receiveShadow = true;
    this.planetMesh = mesh;
    this.group.add(mesh);
    this.clickableObjects.push(mesh);

    //STEP 2:
    //TODO: Add from 1 to 3 orbiting moons to the planet group.
    //TODO: The moons should rotate around the planet just lik  e the planet group rotates around the Sun.
    const geometry2 = new THREE.SphereGeometry(1, 7, 7); //3d dimension of the sphere
    const material2 = new THREE.MeshStandardMaterial({ color: 0xce3072 });
    const mesh_2 = new THREE.Mesh(geometry2, material2);
    // mesh_2.position.x = 3;
    // this.group.add(mesh_2);
    mesh_2.castShadow = true;
    mesh_2.receiveShadow = true;
    this.group.add(mesh_2);
    this.moons.push({
      mesh: mesh_2,
      radius: 3,
      speed: 1.2,
      offset: Math.random() * Math.PI * 2,
      yOffset: 0,
    });

    const geometry3 = new THREE.SphereGeometry(1, 2, 2); //3d dimension of the sphere
    const material3 = new THREE.MeshStandardMaterial({ color: 0xa6f1ac });
    const mesh_3 = new THREE.Mesh(geometry3, material3);
    // mesh_3.position.x = 5;
    // mesh_3.position.y = 5;
    // this.group.add(mesh_3);
    mesh_3.castShadow = true;
    mesh_3.receiveShadow = true;
    this.group.add(mesh_3);
    this.moons.push({
      mesh: mesh_3,
      radius: 4.5,
      speed: 0.8,
      offset: Math.random() * Math.PI * 2,
      yOffset: 0.5,
    });

    const geometry4 = new THREE.SphereGeometry(1, 10, 10); //3d dimension of the sphere
    const material4 = new THREE.MeshStandardMaterial({ color: 0xbaa44a });
    const mesh_4 = new THREE.Mesh(geometry4, material4);
    // mesh_4.position.x = 7;
    // mesh_4.position.y = -2;
    // this.group.add(mesh_4);
    mesh_4.castShadow = true;
    mesh_4.receiveShadow = true;
    this.group.add(mesh_4);
    this.moons.push({
      mesh: mesh_4,
      radius: 6,
      speed: 1.5,
      offset: Math.random() * Math.PI * 2,
      yOffset: -0.4,
    });


    //Ziyan Pan and Xueyi Xia did step 1 and 2

    //STEP 3:
    //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
    //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
    loader.load("/models/teamF/radiant.glb", (gltf) => {
      const spaceship = gltf.scene;
      spaceship.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      spaceship.scale.set(0.15, 0.15, 0.15);

      // Place spaceship at a random point on planet
      const planetRadius = 2;
      const modelOffset = 0;
      const placementRadius = planetRadius + modelOffset;

      // Keep track of angles to avoid overlapping other models
      const spaceshipAngleY = Math.random() * Math.PI * 2;
      const spaceshipAngleFromTop = Math.random() * (Math.PI / 2);

      const posX =
        placementRadius *
        Math.sin(spaceshipAngleFromTop) *
        Math.cos(spaceshipAngleY);
      const posY = placementRadius * Math.cos(spaceshipAngleFromTop);
      const posZ =
        placementRadius *
        Math.sin(spaceshipAngleFromTop) *
        Math.sin(spaceshipAngleY);

      spaceship.position.set(posX, posY, posZ);

      const surfaceNormal = new THREE.Vector3()
        .copy(spaceship.position)
        .normalize();
      spaceship.lookAt(surfaceNormal.add(spaceship.position));
      spaceship.rotateX(Math.PI / 2);

      this.group.add(spaceship);

      this.props.push({
        object: spaceship,
        type: "spaceship",
        originalPosition: spaceship.position.clone(),
        originalRotation: spaceship.rotation.clone(),
        originalScale: spaceship.scale.clone(),
      });

      // Load cat model
      loader.load("/models/teamF/cat.glb", (gltfCat) => {
        const cat = gltfCat.scene;
        cat.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        cat.scale.set(2.5, 2.5, 2.5);

        // Slight offset from spaceship to avoid overlap
        const offsetAngle = 5;
        const catAngleY = spaceshipAngleY + offsetAngle;
        const catAngleFromTop = spaceshipAngleFromTop;

        const catX =
          placementRadius * Math.sin(catAngleFromTop) * Math.cos(catAngleY);
        const catY = placementRadius * Math.cos(catAngleFromTop);
        const catZ =
          placementRadius * Math.sin(catAngleFromTop) * Math.sin(catAngleY);

        cat.position.set(catX, catY, catZ);

        const catNormal = new THREE.Vector3().copy(cat.position).normalize();
        cat.lookAt(catNormal.add(cat.position));
        cat.rotateX(Math.PI / 2);

        this.group.add(cat);

        this.props.push({
          object: cat,
          type: "cat",
          originalPosition: cat.position.clone(),
          originalRotation: cat.rotation.clone(),
          originalScale: cat.scale.clone(),
        });

        // Load multiple plants scattered around planet ---
        const numPlants = 18;
        const plantRadius = placementRadius;
        for (let i = 0; i < numPlants; i++) {
          loader.load("/models/teamF/aplant.glb", (gltfPlant) => {
            const plant = gltfPlant.scene;
            plant.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            plant.scale.set(0.4, 0.4, 0.4);

            let plantAngleY, plantAngleFromTop;

            // Make sure the plant does not overlap spaceship or cat
            do {
              plantAngleY = Math.random() * Math.PI * 2;
              plantAngleFromTop = Math.random() * Math.PI;
            } while (
              Math.abs(plantAngleY - spaceshipAngleY) < 0.25 &&
              Math.abs(plantAngleFromTop - spaceshipAngleFromTop) < 0.25
            );

            const plantX =
              plantRadius * Math.sin(plantAngleFromTop) * Math.cos(plantAngleY);
            const plantY = plantRadius * Math.cos(plantAngleFromTop);
            const plantZ =
              plantRadius * Math.sin(plantAngleFromTop) * Math.sin(plantAngleY);

            plant.position.set(plantX, plantY, plantZ);

            const plantNormal = new THREE.Vector3()
              .copy(plant.position)
              .normalize();
            plant.lookAt(plantNormal.add(plant.position));
            plant.rotateX(Math.PI / 2);

            this.group.add(plant);

            this.props.push({
              object: plant,
              type: "plant",
              originalPosition: plant.position.clone(),
              originalRotation: plant.rotation.clone(),
              originalScale: plant.scale.clone(),
            });
          });
        }
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
    this.group.rotation.y += delta * 5;

    //TODO: Do the moon orbits and the model animations here.
    const baseTime = performance.now() * 0.001;

    this.moons.forEach((moonData, index) => {
      const moon = moonData.mesh;
      const t = baseTime * moonData.speed + moonData.offset;

      // normal orbit
      let radius = moonData.radius;
      let y = moonData.yOffset;

      // when planet is clicked, make the moons more energetic
      if (this.isPlanetAnimating) {
        moon.material.color.setHSL(
          (this.animationTime * 0.5 + index * 0.2) % 1,
          1,
          0.5
        );
      }

      moon.position.x = Math.cos(t) * radius;
      moon.position.z = Math.sin(t) * radius;
      moon.position.y = y;

      moon.rotation.y += delta * 2;
    });

    if (this.isPlanetAnimating) {
      this.animationTime += delta;

      this.props.forEach((item, index) => {
        const obj = item.object;
        const t = this.animationTime;

        if (item.type === "spaceship") {
          obj.rotation.y = item.originalRotation.y + t * 8;
          obj.position.copy(item.originalPosition);
          obj.position.y += Math.sin(t * 10) * 0.35;
        }

        if (item.type === "cat") {
          obj.position.copy(item.originalPosition);
          obj.position.y += Math.abs(Math.sin(t * 8)) * 0.4;

          const s = 1 + Math.sin(t * 8) * 0.08;
          obj.scale.set(
            item.originalScale.x * s,
            item.originalScale.y * s,
            item.originalScale.z * s
          );
        }

        if (item.type === "plant") {
          obj.rotation.x = item.originalRotation.x;
          obj.rotation.y = item.originalRotation.y;
          obj.rotation.z =
            item.originalRotation.z + Math.sin(t * 5 + index) * 0.35;
        }
      });

      if (this.animationTime > 2) {
        this.isPlanetAnimating = false;
        this.animationTime = 0;

        this.props.forEach((item) => {
          item.object.position.copy(item.originalPosition);
          item.object.rotation.copy(item.originalRotation);
          item.object.scale.copy(item.originalScale);
        });
      }
    }
  }


  click(mouse, scene, camera) {
    //TODO: Do the raycasting here.
    this.raycaster.setFromCamera(mouse, camera);

    const intersects = this.raycaster.intersectObjects(
      this.clickableObjects,
      true
    );

    if (intersects.length > 0) {
      this.isPlanetAnimating = true;
      this.animationTime = 0;
    }
  }
}

window.addEventListener("click", (event) => {
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  planetF.click(mouse, scene, camera);
});
