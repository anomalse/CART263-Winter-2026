import * as THREE from 'three';

export class Sun {
    constructor(scene) {
        this.scene = scene;

        // Create sun mesh
        const geometry = new THREE.SphereGeometry(3, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffdd33,
            emissive: 0xffee55,
            emissiveIntensity: 2.0,
            roughness: 0.1
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.castShadow = false;
        this.scene.add(this.mesh);

        // Add point light (main light source)
        this.light = new THREE.PointLight(0xFFFFDD, 2.5, 100);
        this.light.position.set(0, 0, 0);
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.light.shadow.bias = -0.0001;
        this.scene.add(this.light);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(3.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa33,
            transparent: true,
            opacity: 0.3
        });
        this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.glow.castShadow = false;
        this.scene.add(this.glow);

        // Add corona (particle ring)
        const coronaParticles = new THREE.BufferGeometry();
        const coronaCount = 200;
        const coronaPositions = new Float32Array(coronaCount * 3);
        for (let i = 0; i < coronaCount; i++) {
            const angle = (i / coronaCount) * Math.PI * 2;
            const radius = 3.8 + Math.random() * 0.5;
            coronaPositions[i * 3] = Math.cos(angle) * radius;
            coronaPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            coronaPositions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        coronaParticles.setAttribute('position', new THREE.BufferAttribute(coronaPositions, 3));
        const coronaMaterial = new THREE.PointsMaterial({ color: 0xffaa33, size: 0.1 });
        this.corona = new THREE.Points(coronaParticles, coronaMaterial);
        this.corona.castShadow = false;
        this.scene.add(this.corona);
    }

    update(time) {
        // Pulse slightly
        const pulse = 1 + Math.sin(time * 0.002) * 0.02;
        this.mesh.scale.set(pulse, pulse, pulse);
        this.glow.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1);

        // Rotate corona
        this.corona.rotation.y += 0.005;
        this.corona.rotation.x += 0.001;

        // Flicker light slightly
        this.light.intensity = 2.5 + Math.sin(time * 0.01) * 0.2;
    }
}