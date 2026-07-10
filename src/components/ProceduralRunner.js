import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ProceduralRunner {
  constructor() {
    this.group = new THREE.Group();
    
    // We will build the geometry asynchronously once the GLB loads
    this.bodyGeo = new THREE.BufferGeometry();
    const bodyMat = new THREE.PointsMaterial({
      color: 0xffaa00,
      size: 0.03, // Soldier model might be large, need small points
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.body = new THREE.Points(this.bodyGeo, bodyMat);
    this.group.add(this.body);

    this.auraGeo = new THREE.BufferGeometry();
    const auraMat = new THREE.PointsMaterial({
      color: 0xff3300,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.aura = new THREE.Points(this.auraGeo, auraMat);
    this.group.add(this.aura);
    
    this.isLoaded = false;
    this.mixer = null;
    this.positions = null;
    this.skinnedMesh = null;
    
    this.loadGLTF();
  }
  
  loadGLTF() {
    const loader = new GLTFLoader();
    loader.load('/Soldier.glb', (gltf) => {
      const model = gltf.scene;
      
      // Find the skinned mesh
      model.traverse((child) => {
        if (child.isSkinnedMesh) {
          this.skinnedMesh = child;
        }
      });
      
      if (!this.skinnedMesh) return;
      
      // Setup animation to freeze it mid-stride
      this.mixer = new THREE.AnimationMixer(model);
      // The 'Run' animation is usually clip 1 or 3 in Soldier.glb, let's find it
      const runClip = gltf.animations.find(clip => clip.name.toLowerCase().includes('run')) || gltf.animations[0];
      
      if (runClip) {
        const action = this.mixer.clipAction(runClip);
        action.play();
        // Update mixer to a specific time (e.g. 0.5 seconds into the run loop)
        this.mixer.update(0.5); 
      }
      
      // We must apply the skeleton transform to the geometry vertices to get the posed positions
      // Three.js doesn't easily expose the posed vertices of a SkinnedMesh for a Points material,
      // but we can bake the vertex positions manually using the bone matrices, or simply render the skinned mesh with a point material!
      
      // The easiest and most performant way to render a SkinnedMesh as points is to just change its material.
      // However, we need access to the vertices for the aura.
      // Let's just use the SkinnedMesh directly instead of this.body
      this.group.remove(this.body);
      
      this.skinnedMesh.material = new THREE.PointsMaterial({
        color: 0xffaa00,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });
      
      // We need to keep the skeleton active, so we add the model to the group
      this.group.add(model);
      
      // We need the vertices for the aura
      // Since it's a SkinnedMesh, the actual positions are computed on the GPU.
      // We'll just grab the base positions and roughly attach the aura around the center for now,
      // or we can just spawn aura particles in a box around the runner.
      
      this.auraPointsCount = 500;
      this.auraPositions = new Float32Array(this.auraPointsCount * 3);
      this.auraLifetimes = new Float32Array(this.auraPointsCount);
      
      for (let i = 0; i < this.auraPointsCount * 3; i++) {
        this.auraPositions[i] = 1000; 
      }
      for (let i = 0; i < this.auraPointsCount; i++) {
        this.auraLifetimes[i] = Math.random();
      }
      this.auraGeo.setAttribute('position', new THREE.BufferAttribute(this.auraPositions, 3));
      
      this.isLoaded = true;
    });
  }
  
  update(deltaTime, scrollProgress = 0) {
    if (!this.isLoaded) return;
    
    // Calculate velocity based on scroll progress delta
    if (this.lastProgress === undefined) this.lastProgress = scrollProgress;
    const progressDelta = scrollProgress - this.lastProgress;
    this.lastProgress = scrollProgress;
    
    // The runner body kinematics are completely frozen because we don't update the mixer in the loop
    
    // --- FIERY AURA PARTICLES (These continue animating!) ---
    const ap = this.auraPositions;
    
    // Wind force based on climbing speed (progressDelta)
    // Minimum blowback even when still
    const windSpeed = 1.0 + (progressDelta > 0 ? progressDelta * 500 : 0);
    
    for (let i = 0; i < this.auraPointsCount; i++) {
      this.auraLifetimes[i] += deltaTime * (1.5 + Math.random()); // Decay rate
      
      if (this.auraLifetimes[i] >= 1.0) {
        // Respawn particle around the center of the runner
        this.auraLifetimes[i] = 0;
        
        // Spawn randomly around the runner's bounding volume
        // Soldier is ~2 units tall, centered at origin
        ap[i * 3] = (Math.random() - 0.5) * 1.5;     // x
        ap[i * 3 + 1] = Math.random() * 2.0;         // y (0 to 2)
        ap[i * 3 + 2] = (Math.random() - 0.5) * 1.0; // z
      } else {
        // Particle floats upwards and slightly backwards (wind effect)
        ap[i * 3 + 1] += deltaTime * 2.5; // Rise up fast
        ap[i * 3 + 2] -= deltaTime * windSpeed; // Blown back based on scroll momentum
      }
    }
    this.auraGeo.attributes.position.needsUpdate = true;
  }
}
