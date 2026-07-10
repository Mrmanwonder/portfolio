import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { renderer } from '../rendering/Renderer.js';
import { cameraManager } from '../core/CameraManager.js';
import { ProceduralRunner } from '../components/ProceduralRunner.js';
import { timelineCoordinator } from '../animation/TimelineCoordinator.js';

export class EnduranceScene extends BaseScene {
  constructor() {
    super('endurance');
    this.runner = null;
    this.terrain = null;
    this.particles = null;
    this.lights = new THREE.Group();
    this.time = 0;
    this.scrollProgress = 0;
    // Golden-hour inspired fog
    this.fog = new THREE.FogExp2(0x1a0f0a, 0.01); 
  }

  create() {
    this.container = document.createElement('section');
    this.container.classList.add('scene-endurance');
    this.container.id = 'endurance';
    this.container.style.height = '200vh';
    this.container.style.background = 'transparent'; // Let WebGL through
    
    this.container.innerHTML = `
      <div class="endurance-ui container" style="position: sticky; top: 0; height: 100vh; pointer-events: none; display: flex; align-items: center; justify-content: center; z-index: 10;">
        <div class="endurance-title">
          <h2>Endurance</h2>
          <p>Climbing the mountain.</p>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(this.container);

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0502); // Dark warm
    this.scene.fog = this.fog;

    this.buildWebGL();
    
    // Camera is initially positioned at the bottom of the slope
    cameraManager.camera.position.set(0, 2, 10);
    cameraManager.camera.lookAt(0, 5, 0);
  }

  buildWebGL() {
    // 1. Real 3D Mountain Terrain (CPU Deformed) - Increased Scale
    const terrainGeo = new THREE.PlaneGeometry(400, 800, 256, 512);
    
    // Rotate to lie flat
    terrainGeo.rotateX(-Math.PI / 2);
    
    // Deform vertices using multi-octave noise
    const pos = terrainGeo.attributes.position;
    const v = new THREE.Vector3();
    for(let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      
      let height = 0;
      // Large scale rolling hills
      height += Math.sin(v.x * 0.02) * Math.cos(v.z * 0.02) * 20.0;
      // Medium details
      height += Math.sin(v.x * 0.1) * Math.cos(v.z * 0.1) * 5.0;
      // Small details
      height += Math.sin(v.x * 0.5) * Math.cos(v.z * 0.5) * 1.0;
      
      // Central path flattening
      const distFromCenter = Math.abs(v.x);
      const pathFactor = 1.0 - Math.exp(-distFromCenter * distFromCenter * 0.01);
      height *= pathFactor;
      
      // Overall incline (mountain rises in the distance, -Z direction)
      height += (-v.z) * 0.15; 
      
      pos.setY(i, height);
    }
    
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.PointsMaterial({
      color: 0xffccaa, // Warm terrain points
      size: 0.3,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    this.terrain = new THREE.Points(terrainGeo, terrainMat);
    // Position terrain so the bottom of the slope is near the origin
    this.terrain.position.set(0, -2, -200);

    // 2. The Real 3D Runner Model
    this.runner = new ProceduralRunner();
    // Position runner on the path, scaled up slightly
    this.runner.group.position.set(0, 0, 0);
    this.runner.group.scale.set(1.5, 1.5, 1.5);

    // 3. Cinematic Lighting (Golden Hour)
    const ambient = new THREE.AmbientLight(0xffeedd, 0.2);
    this.lights.add(ambient);
    
    const spotLight = new THREE.SpotLight(0xffaa00, 10);
    spotLight.position.set(0, 50, -50);
    spotLight.lookAt(0, 0, 0);
    this.lights.add(spotLight);
    
    // Horizon glow plane
    const glowGeo = new THREE.PlaneGeometry(1000, 500);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.1,
      fog: false,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, 50, -400);
    this.lights.add(glow);
    
    // Add floating ember particles (increased density)
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 3000;
    const pPos = new Float32Array(particleCount * 3);
    for(let i=0; i<particleCount*3; i++) {
      pPos[i] = (Math.random() - 0.5) * 80; // Spread wider
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffaa44,
      size: 0.15,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
  }

  initAnimations() {
    super.initAnimations();
    
    // Create a scroll timeline for climbing the mountain
    const scrollObj = { progress: 0 };
    
    const tl = timelineCoordinator.createScrollTimeline(this.id, {
      trigger: '#endurance',
      start: 'top top',
      end: '+=3000',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
      }
    });

    tl.to(scrollObj, { progress: 1, duration: 1 });
  }

  enter() {
    super.enter();
    renderer.mainScene.add(this.terrain);
    renderer.mainScene.add(this.runner.group);
    renderer.mainScene.add(this.particles);
    renderer.mainScene.add(this.lights);
    
    cameraManager.camera.position.set(0, 2, 10);
    cameraManager.camera.lookAt(0, 5, 0);
    
    // Override main renderer fog with endurance fog
    renderer.mainScene.fog = this.fog;
    renderer.mainScene.background = this.scene.background;
  }

  update(deltaTime) {
    if(this.runner) {
      // Pass scroll velocity to runner to control particle trail intensity
      this.runner.update(deltaTime, this.scrollProgress);
    }
    
    // Physical Climbing Logic
    // Total distance to climb up the slope is roughly 300 units in Z, and 45 units in Y
    const climbZ = -this.scrollProgress * 300;
    const climbY = this.scrollProgress * 45; 
    
    // Crane camera up as we reach the end
    const craneOffset = this.scrollProgress * 15;
    
    // Move the camera and the runner up the mountain together!
    cameraManager.camera.position.z = 10 + climbZ;
    cameraManager.camera.position.y = 2 + climbY + craneOffset;
    
    // Tilt camera towards horizon at the very end
    const lookY = 5 + climbY + (this.scrollProgress * 10);
    cameraManager.camera.lookAt(0, lookY, climbZ - 10); 
    
    this.runner.group.position.z = climbZ;
    this.runner.group.position.y = climbY;
    
    // Float the ambient embers around
    if(this.particles) {
      const p = this.particles.geometry.attributes.position.array;
      for(let i=1; i<p.length; i+=3) {
        p[i] += deltaTime * 1.5; // Rise faster
        if (p[i] > 40) p[i] = -20;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      // Particles follow the climb so we don't leave them behind
      this.particles.position.set(0, climbY, climbZ); 
    }
  }

  suspend() {
    super.suspend();
    renderer.mainScene.remove(this.terrain);
    renderer.mainScene.remove(this.runner.group);
    renderer.mainScene.remove(this.particles);
    renderer.mainScene.remove(this.lights);
    
    // Reset fog/bg
    renderer.mainScene.fog = null;
    renderer.mainScene.background = null;
  }

  destroy() {
    super.destroy();
    if(this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
    }
    if(this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }
  }
}
