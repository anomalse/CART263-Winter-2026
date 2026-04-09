import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//sean, kerven,ray
const loader = new THREE.TextureLoader();
const _SURFACE_UP = new THREE.Vector3(0, 1, 0);
const _SURFACE_NORMAL = new THREE.Vector3();
const _SURFACE_ALIGN_Q = new THREE.Quaternion();
const _SURFACE_YAW_Q = new THREE.Quaternion();

function orientToPlanetSurface(object3D, randomizeYaw = true) {
    _SURFACE_NORMAL.copy(object3D.position);
    const lenSq = _SURFACE_NORMAL.lengthSq();
    if (lenSq === 0) return;
    _SURFACE_NORMAL.multiplyScalar(1 / Math.sqrt(lenSq));

    _SURFACE_ALIGN_Q.setFromUnitVectors(_SURFACE_UP, _SURFACE_NORMAL);
    if (randomizeYaw) {
        _SURFACE_YAW_Q.setFromAxisAngle(_SURFACE_NORMAL, Math.random() * Math.PI * 2);
        object3D.quaternion.copy(_SURFACE_ALIGN_Q).multiply(_SURFACE_YAW_Q);
    } else {
        object3D.quaternion.copy(_SURFACE_ALIGN_Q);
    }
}
// Planet class for Team C
export class PlanetC {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.clickableObjects = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        //Create planet group
        this.group = new THREE.Group()
              
        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        const geometry = new THREE.SphereGeometry(1.8, 32, 32);
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        const material = new THREE.MeshStandardMaterial()

        loader.load('textures/mars.jpg', (texture) => {
            material.map = texture;
            material.needsUpdate = true;
        })
        const sphere = new THREE.Mesh(geometry, material);
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        //TODO: Add the planet mesh to the planet group.
        this.group.add(sphere);
        this.scene.add(this.group);

        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        this.moons = [];
        
        const moonMaterial = new THREE.MeshStandardMaterial()

        for (let i = 0; i <= 2; i++)
        {
            let moonSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 40), moonMaterial);
            new THREE.TextureLoader().load('textures/moon.jpg', (texture) => {
                moonMaterial.map = texture;
                moonMaterial.needsUpdate = true;
            })

            this.moons.push({
                mesh: moonSphere,
                angle: Math.random() * Math.PI * 2,
                distance: 3 + i * 1.5,
                speed: 0.5 + i * 0.2
            });
            this.group.add(moonSphere);
        }

        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        this.surfaceObjects = new THREE.Group();
        this.group.add(this.surfaceObjects);

        this.addSurfaceObject = (object3D, surfacePosition = null) => {
            if (surfacePosition) object3D.position.copy(surfacePosition);
            orientToPlanetSurface(object3D, true);
            this.surfaceObjects.add(object3D);
            return object3D;
        };
        
        const gltfLoader = new GLTFLoader();
        this.models = [];

        for (let i = 0; i < 5; i++)
        gltfLoader.load('models/77-my-models/PenguinBaseMesh.glb', (gltf) => {
            const model = gltf.scene;
        
            model.scale.set(0.5, 0.5, 0.5); // adjust size
        
            // Position on planet surface
            const radius = 1.8; // your planet radius
            const angle = Math.random() * Math.PI * 2;
        
            model.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );
        
            const phi = Math.random() * Math.PI;       // vertical angle
            const theta = Math.random() * Math.PI * 2; // horizontal
            
            model.scale.set(0.1, 0.1, 0.1);
            const r = 1.8;
            
            model.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
            );
            model.traverse(child => {
                if (child.isMesh)
                {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            // Make model face outward
            model.lookAt(0, 0, 0);
            model.rotateX(Math.PI);

            this.group.add(model);
            this.models.push(model);
            this.clickableObjects.push(model);
        });

        
        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.

        
        this.moons.forEach(moon => { this.clickableObjects.push(moon.mesh); })
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }
    
    update(delta)
    {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;
        
        // Rotate planet
        this.group.rotation.y += delta*0.5;

        //TODO: Do the moon orbits and the model animations here.
        this.moons.forEach(moon => {
            moon.angle += moon.speed * delta;
        
            moon.mesh.position.x = Math.cos(moon.angle) * moon.distance;
            moon.mesh.position.z = Math.sin(moon.angle) * moon.distance;
        });
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
        this.raycaster.setFromCamera(mouse, camera);

        const intersects = this.raycaster.intersectObjects(this.clickableObjects, true);
        console.log(intersects.length)
        if (intersects.length > 0)
        {
            const obj = intersects[0].object;
            console.log("CLICKED ON:", obj.name || obj.uuid);
            this.animateClick(obj)
        }
    }
    animateClick(obj) {
        const initialScale = obj.scale.clone();
    
        let t = 0;
        const duration = 0.3; // seconds
    
        const animate = (delta) => {
            t += delta;
            const factor = 1 + 0.5 * Math.sin((t / duration) * Math.PI);
            obj.scale.set(
                initialScale.x * factor,
                initialScale.y * factor,
                initialScale.z * factor
            );
    
            if (t < duration) requestAnimationFrame((time) => animate(0.016)); // ~60fps
            else obj.scale.copy(initialScale);
        };
    
        animate(0);
    }
}
