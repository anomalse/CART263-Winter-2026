import * as THREE from "three";
//import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//SAMA's THEME: Dark biomechanical horrors
//also i moved mine closer
// Planet class for Team F
export class PlanetF {
  constructor(scene, orbitRadius, orbitSpeed) {
    this.scene = scene;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // this.scene.add(ambientLight);
    //MAY REMOVE CUZ IT CREEPIER WITH NO LIGHT VVV
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    this.scene.add(dirLight);
    this.angle = Math.random() * Math.PI * 2;
    //its what will orbit the sun?
    this.group = new THREE.Group();
    //Raycasting tools
    this.raycaster = new THREE.Raycaster();
    this.pointerPos = new THREE.Vector2();
    this.theUV = new THREE.Vector2(0.0, 0.0);
    //hover over planet to simulate fungaly growth
    this.isHovered = false;
    this.hoverGrowth = 0.0;
    //texture loader
    this.textureLoader = new THREE.TextureLoader();
    //load textures
    this.colorMap = this.textureLoader.load("image/aalieeenn.jpg");
    this.elevMap = this.textureLoader.load("image/2136.jpg");
    this.alphaMap = this.textureLoader.load("image/alien2.jpg");

    this.otherMap = this.textureLoader.load("image/alien.jpg.webp");
    //fixes color space
    this.colorMap.colorSpace = THREE.SRGBColorSpace;
    this.otherMap.colorSpace = THREE.SRGBColorSpace;
    //scene.add(group);

    const geo = new THREE.IcosahedronGeometry(1, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x222222,

      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    //PLANET ONEE

    //plant mesh
    this.planet = new THREE.Mesh(geo, mat);
    //shadows abd depth
    this.planet.castShadow = true;
    this.planet.receiveShadow = true;
    //just messing with a points layer for ray castingwhen u hover over the planet it spikes (soruced from video)
    const pointsGeometry = new THREE.IcosahedronGeometry(1.8, 120);
    //putting source for all of these random shaders i find herer
    //HERE:
    const vertexShader = `
      uniform float size;
      uniform float time;
      uniform float hoverGrowth;
      uniform sampler2D elevTexture;
      uniform vec2 mouseUV;

      varying vec2 vUv;
      varying float vVisible;
      varying float vDist;
      varying float vGrowth;

      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);

        float n000 = hash(i + vec3(0.0, 0.0, 0.0));
        float n100 = hash(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash(i + vec3(1.0, 1.0, 1.0));

        vec3 u = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
          mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
          u.z
        );
      }

      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vUv = uv;

        vec3 newPosition = position;

        float texElev = texture2D(elevTexture, vUv).r;
        float bodyNoise = fbm(position * 1.6 + time * 0.08);
        float ruptureNoise = fbm(position * 4.5 - time * 0.15);

        float dist = distance(mouseUV, vUv);
        float hoverZone = smoothstep(0.24, 0.0, dist);

        float infectedB = hoverZone * hoverGrowth;
        infectedB *= (0.45 + ruptureNoise * 1.2);

        vDist = dist;
        vGrowth = infectedB;

        float displacement =
            texElev * 0.45 +
            bodyNoise * 0.22 +
            ruptureNoise * 0.10 +
            infectedB * 1.3;

        newPosition += normal * displacement;

        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

        vec3 vNormal = normalize(normalMatrix * normal);
        vVisible = step(0.0, dot(-normalize(mvPosition.xyz), vNormal));

        gl_PointSize = size + infectedB * 8.0;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D colorTexture;
      uniform sampler2D alphaTexture;
      uniform sampler2D otherTexture;
      uniform float hoverGrowth;
      uniform float time;

      varying vec2 vUv;
      varying float vVisible;
      varying float vDist;
      varying float vGrowth;

      void main() {
        if (floor(vVisible + 0.1) == 0.0) discard;

        float alpha = 1.0 - texture2D(alphaTexture, vUv).r;

        vec3 base = texture2D(colorTexture, vUv).rgb;
        vec3 infected = texture2D(otherTexture, vUv).rgb;

        float zone = smoothstep(0.24, 0.0, vDist);
        float blendAmt = clamp(zone * hoverGrowth * 1.5 + vGrowth * 0.5, 0.0, 1.0);

        vec3 color = mix(base, infected, blendAmt);
        color += vec3(0.7, 0.05, 0.18) * blendAmt * 0.9;
        color += sin(time * 2.5 + vUv.x * 18.0 + vUv.y * 9.0) * 0.015;

        float finalAlpha = clamp(alpha + blendAmt * 0.45, 0.0, 1.0);
        gl_FragColor = vec4(color, finalAlpha);
      }
    `;

    //for stronger blending if needed for above float mixVal = (thresh - vDist) * 8.0;
    //color = mix(color, other, mixVal);
    // }
    this.uniforms = {
      size: { value: 3.5 },
      time: { value: 0.0 },
      hoverGrowth: { value: 0.0 },
      colorTexture: { value: this.colorMap },
      otherTexture: { value: this.otherMap },
      elevTexture: { value: this.elevMap },
      alphaTexture: { value: this.alphaMap },
      mouseUV: { value: this.theUV },
      //mouseUV: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
    };

    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      depthWrite: false, //idk
    });

    this.points = new THREE.Points(pointsGeometry, pointsMaterial);
    this.group.add(this.points);
    //add them
    this.group.add(this.planet);

    //=======()======()=======moon=======()=======()================
    this.moonPivots = [];
    //initial orbit position
    //this.group.position.x = this.orbitRadius;

    //the three moons  looop
    for (let i = 0; i < 3; i++) {
      const moonPivot = new THREE.Group();

      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      );

      moon.castShadow = true;
      moon.receiveShadow = true;
      //place moon away from center so pivot rotation makes it orbit (source:)
      moon.position.x = 3 + i * 1.2;

      moonPivot.add(moon);
      this.group.add(moonPivot);
      //moon to planet
      this.moonPivots.push({
        pivot: moonPivot,
        moon: moon,
        speed: 0.2 + i * 0.2,
      });
    }
    //=========spines/////////
    this.spineGroup = new THREE.Group();
    this.group.add(this.spineGroup);

    this.spineCurve = this.createSpineCurve();
    this.spineLoader = new GLTFLoader();
    this.spineSource = null;
    this.spineObjects = [];
    this.spineCount = 22; //number of vertebrae clones
    this.spineSpacing = 0.028; //distance between vertebrae along curve
    this.spineTravel = 0.0; //rate of
    //load one vertebra model and clone it
    this.loadSpineModel("models/spine.glb");

    // this.group.position.x = this.orbitRadius;
    this.scene.add(this.group);

    // debug ring line
    const linePoints = this.spineCurve.getPoints(240);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints); //3.js: Used to store the vertex positions (points) of the line
    const lineMat = new THREE.LineBasicMaterial({
      //3.js: Defines the appearance (color, opacity) of the line(i wanna see it first)
      color: 0x553355,
      transparent: true,
      opacity: 0.35,
    });
    this.spinePathLine = new THREE.LineLoop(lineGeo, lineMat);
    //three.js: draws a continuous line that automatically connects the last vertex back to the first, forming a closed loop
    this.spineGroup.add(this.spinePathLine);
  }
  //USING the three.js developer tool in google chrome it kinda tell u the dimensions so i roughly did tht based from the radius
  createSpineCurve() {
    const pts = [
      new THREE.Vector3(3.6, 0.45, 0.0),
      new THREE.Vector3(2.4, 1.2, 2.0),
      new THREE.Vector3(0.0, 0.65, 3.5),
      new THREE.Vector3(-2.4, -0.9, 2.1),
      new THREE.Vector3(-3.7, -0.35, 0.0),
      new THREE.Vector3(-2.0, 1.0, -2.2),
      new THREE.Vector3(0.0, -1.15, -3.7),
      new THREE.Vector3(2.5, 0.7, -1.8),
    ];

    //resembling getPoints(divisions): Returns an array of Vector3 points sampled along the curve, which can be used to create a BufferGeometry for a Line ^^^
    //"is a class in Three.js used to create a smooth 3D spline curve that passes through a set of defined control points"
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  }

  loadSpineModel(path) {
    this.spineLoader.load(
      path,
      (gltf) => {
        this.spineSource = gltf.scene;

        this.spineSource.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        for (let i = 0; i < this.spineCount; i++) {
          const clone = this.spineSource.clone(true);

          // scale this to vertebra model
          clone.scale.set(0.22, 0.22, 0.22);

          this.spineGroup.add(clone);

          this.spineObjects.push({
            object: clone,
            offset: i * this.spineSpacing,
          });
        }
      },
      undefined,
      (error) => {
        console.error("no load:", error);
      },
    );
  }

  // this.material = new THREE.ShaderMaterial({
  //     vertexShader: this.vertexShader,
  //     fragmentShader: this.fragmentShader,
  //     uniforms: this.uniforms
  // });
  //STEP 1:
  //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
  //TODO: Give it a custom material using THREE.MeshStandardMaterial.
  //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
  //TODO: Add the planet mesh to the planet group.

  //STEP 2:
  //TODO: Add from 1 to 3 orbiting moons to the planet group.
  //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

  //STEP 3:
  //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
  //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

  //STEP 4:
  //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
  //TODO: Use your imagination and creativity!
  //soon will add this but moon firrst this.loadModel('../models/xenoCritter.glb', 0.35, 20, 40, 0);

  update(delta) {
    // Orbit around sun
    this.angle += this.orbitSpeed * delta * 30;
    this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
    this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

    /// slower spin
    this.group.rotation.y += delta * 0.22;

    for (let moonData of this.moonPivots) {
      moonData.pivot.rotation.y += delta * moonData.speed;
      moonData.moon.rotation.y += delta * 0.12;
    }
    //rptate moon:
    //the moon is attached to the pivot and positioned away from its center so rotating the parent group swings the child around , physics
    //delta is time and frame rate for loop counter

    //TODO: Do the moon orbits and the model animations here.

    //CLOCK GET DATA delta refers again , the shaders use delta
    this.uniforms.time.value += delta;
    //isHovered is reset to false at the end of this method each frame.
    //handleRaycast() (called from outside) re-sets it to true while
    //the mouse stays over the planet

    if (this.isHovered) {
      this.hoverGrowth = Math.min(this.hoverGrowth + delta * 1.2, 1.6);
    } else {
      this.hoverGrowth = Math.max(this.hoverGrowth - delta * 0.7, 0.0);
    }
    this.uniforms.hoverGrowth.value = this.hoverGrowth;
    //reset each frame; handleRaycast sets true again if hovering
    //MUST reset to true next frame if still hovering or else ts breaks
    this.isHovered = false;
    //move the whole spine chain along the curve
    this.spineTravel += delta * 0.028;
    this.updateSpineMotion();
  }

  //have mercy
  updateSpineMotion() {
    // Do nothing until the GLB has finished loading
    if (this.spineObjects.length === 0) return;
    const up = new THREE.Vector3(0, 1, 0); //neeeded for "lookAt" in the world
    for (const { object, offset } of this.spineObjects) {
      // t wraps 0 1 continuously then each clone has a different offset
      //o they are always spread around the full loop
      const t = (this.spineTravel + offset) % 1.0;

      const pos = this.spineCurve.getPointAt(t);
      const tangent = this.spineCurve.getTangentAt(t).normalize();

      object.position.copy(pos);

      //this is a rotation matrix from the tangent so the bone faces forward yes
      const matrix = new THREE.Matrix4().lookAt(
        new THREE.Vector3(),
        tangent,
        up,
      );
      object.quaternion.setFromRotationMatrix(matrix);
    }
  }

  setPointer(mouse) {
    this.pointerPos.copy(mouse);
  }

  //called from main animate loop or from click/move handling
  handleRaycast(camera) {
    this.raycaster.setFromCamera(this.pointerPos, camera);

    const intersects = this.raycaster.intersectObject(this.planet);

    if (intersects.length > 0 && intersects[0].uv) {
      this.isHovered = true;
      this.theUV.copy(intersects[0].uv);
      this.uniforms.mouseUV.value.copy(this.theUV);
    }
  }

  click(mouse, scene, camera) {
    this.pointerPos.copy(mouse);
    this.handleRaycast(camera);
    this.hoverGrowth = Math.min(this.hoverGrowth + 0.35, 1.6);
  }
}

//     click(mouse, scene, camera){

//     this.pointer.copy(mouse);

//     this.raycaster.setFromCamera(this.pointer, camera);

//     const hits = this.raycaster.intersectObject(this.planet);

//     if (hits.length > 0 && hits[0].uv) {
//         this.hitUV.copy(hits[0].uv);
//         this.uniforms.hitUV.value.copy(this.hitUV);
//     }
// }
//TODO: Do the raycasting here.

//SAMA SOURCES: https://blogg.bekk.no/procedural-planet-in-webgl-and-three-js-fc77f14f5505
//https://github.com/holgerl/procedural-planet/blob/gh-pages/js/spheremap.js
//https://www.vertexshaderart.com/art/8oJh9QtFGgJksSFFk/
//https://github.com/ashima/webgl-noise/blob/master/src/cellular3D.glsl
//https://www.youtube.com/watch?v=KEMZR3unWTE
//https://github.com/mrdoob/three.js/tree/master/editor
//https://www.youtube.com/watch?v=XaDQI1HmoOQ
//https://github.com/bobbyroe/vertex-earth/blob/interactive/index.js
//https://stackoverflow.com/questions/39975687/uniform-sampler2d-in-vertex-shader
