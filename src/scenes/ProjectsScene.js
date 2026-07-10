import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { timelineCoordinator } from '../animation/TimelineCoordinator.js';
import { renderer } from '../rendering/Renderer.js';
import { cameraManager } from '../core/CameraManager.js';

export class ProjectsScene extends BaseScene {
  constructor() {
    super('projects');
    this.projectsGroup = new THREE.Group();
    this.devices = [];
    this.scrollProgress = 0;
    this.projectData = [
      {
        title: 'AXON',
        kicker: 'Distributed telemetry',
        body: 'Realtime data ingestion, alert routing, and observability surfaces built around failure visibility.',
        textureLines: ['Realtime data ingestion', 'Alert routing surfaces', 'Failure visibility'],
        metric: '42ms p95 event path',
        base: 0x111111,
        accent: 0x3a86ff
      },
      {
        title: 'OPTYX',
        kicker: 'Computer vision interface',
        body: 'OCR review flows, confidence overlays, and document verification tuned for fast human decisions.',
        textureLines: ['OCR review flows', 'Confidence overlays', 'Document verification'],
        metric: '18k fields reviewed',
        base: 0x160f10,
        accent: 0x8b1e24
      },
      {
        title: 'STUDY SYSTEM',
        kicker: 'Learning architecture',
        body: 'A structured study platform with progress maps, exam loops, and retrieval practice dashboards.',
        textureLines: ['Progress maps', 'Exam loops', 'Retrieval practice'],
        metric: '7 active study loops',
        base: 0x15130d,
        accent: 0xd8a629
      }
    ];
  }

  create() {
    this.container = document.createElement('section');
    this.container.classList.add('scene-projects');
    this.container.id = 'projects';
    this.container.style.height = '400vh'; // Long scroll for dolly movement
    this.container.style.background = 'transparent'; // Let WebGL through
    
    // We create fixed typography overlays that fade based on progress
    this.container.innerHTML = `
      <div class="projects-ui" style="position: sticky; top: 0; height: 100vh; pointer-events: none; overflow: hidden;">
        
        <div class="project-info" id="proj-0">
          <p class="project-kicker">Distributed telemetry</p>
          <h2 class="text-display">AXON</h2>
          <p class="text-body-large">Realtime data ingestion, alert routing, and observability surfaces built around failure visibility.</p>
          <p class="project-proof">42ms p95 event path</p>
        </div>

        <div class="project-info" id="proj-1">
          <p class="project-kicker">Computer vision interface</p>
          <h2 class="text-display">OPTYX</h2>
          <p class="text-body-large">OCR review flows, confidence overlays, and document verification tuned for fast human decisions.</p>
          <p class="project-proof">18k fields reviewed</p>
        </div>

        <div class="project-info" id="proj-2">
          <p class="project-kicker">Learning architecture</p>
          <h2 class="text-display">STUDY SYSTEM</h2>
          <p class="text-body-large">A structured study platform with progress maps, exam loops, and retrieval practice dashboards.</p>
          <p class="project-proof">7 active study loops</p>
        </div>

      </div>
    `;

    document.getElementById('app').appendChild(this.container);
    this.buildWebGL();
  }

  buildWebGL() {
    // 3 Projects along the Z axis (Dolly track)
    const spacing = 35;

    for (let i = 0; i < 3; i++) {
      const project = this.projectData[i];
      const projGroup = new THREE.Group();
      projGroup.position.z = -i * spacing;
      
      // Environment Ambient
      const pointLight = new THREE.PointLight(project.accent, 2, 30);
      pointLight.position.set(2, 2, 2);
      projGroup.add(pointLight);
      
      const ambient = new THREE.AmbientLight(project.base, 2);
      projGroup.add(ambient);

      // Particles environment
      const pGeo = new THREE.BufferGeometry();
      const pCount = 300;
      const pPos = new Float32Array(pCount * 3);
      for(let j=0; j<pCount*3; j++) {
        pPos[j] = (Math.random() - 0.5) * 40;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: project.accent,
        size: 0.08,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(pGeo, pMat);
      projGroup.add(particles);

      // Devices (Procedural Mockups)
      const deviceGroup = new THREE.Group();
      
      // Desktop
      const monitorGeo = new THREE.BoxGeometry(7.4, 4.2, 0.2);
      // High-quality glass/metal material for devices
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      const screenMat = new THREE.MeshBasicMaterial({
        map: this.createProjectTexture(project, 'desktop'),
        transparent: true
      });
      const desktop = new THREE.Mesh(monitorGeo, glassMat);
      
      // Front face is screen
      const screenGeo = new THREE.PlaneGeometry(7.2, 4.0);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = 0.11; // Slightly in front
      desktop.add(screen);
      
      desktop.position.set(2.5, 0, 0); // Offset to the right
      
      // Phone
      const phoneGeo = new THREE.BoxGeometry(1.5, 3, 0.15);
      const phone = new THREE.Mesh(phoneGeo, glassMat);
      
      const phoneScreenGeo = new THREE.PlaneGeometry(1.4, 2.9);
      const phoneScreen = new THREE.Mesh(phoneScreenGeo, new THREE.MeshBasicMaterial({
        map: this.createProjectTexture(project, 'phone'),
        transparent: true
      }));
      phoneScreen.position.z = 0.08;
      phone.add(phoneScreen);
      
      phone.position.set(6.5, -1, 1.5);
      phone.rotation.y = -0.3; // Angle it nicely
      
      deviceGroup.add(desktop);
      deviceGroup.add(phone);
      projGroup.add(deviceGroup);

      this.projectsGroup.add(projGroup);
      
      this.devices.push({
        group: deviceGroup,
        baseY: deviceGroup.position.y,
        timeOffset: Math.random() * 100
      });
    }
  }

  createProjectTexture(project, type) {
    const canvas = document.createElement('canvas');
    canvas.width = type === 'phone' ? 512 : 1200;
    canvas.height = type === 'phone' ? 900 : 700;
    const ctx = canvas.getContext('2d');
    const accent = `#${project.accent.toString(16).padStart(6, '0')}`;

    ctx.fillStyle = '#090909';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = type === 'phone' ? 54 : 86;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);

    ctx.fillStyle = 'rgba(255,255,255,0.42)';
    ctx.font = `${type === 'phone' ? 22 : 28}px "Plus Jakarta Sans", sans-serif`;
    ctx.letterSpacing = '4px';
    ctx.fillText(project.kicker.toUpperCase(), margin + 18, margin + 34);

    ctx.fillStyle = '#f7f7f7';
    ctx.font = `700 ${type === 'phone' ? 54 : 86}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(project.title, margin + 18, margin + (type === 'phone' ? 132 : 150));

    ctx.fillStyle = accent;
    ctx.fillRect(margin + 18, margin + (type === 'phone' ? 172 : 205), type === 'phone' ? 120 : 190, 5);

    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.font = `500 ${type === 'phone' ? 26 : 34}px "Plus Jakarta Sans", sans-serif`;
    const lines = type === 'phone'
      ? [project.metric, 'Validated flow', 'Case evidence']
      : [...project.textureLines, project.metric];
    lines.forEach((line, index) => {
      ctx.fillText(line, margin + 18, margin + (type === 'phone' ? 260 : 300) + index * (type === 'phone' ? 48 : 54));
    });

    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.42;
    for (let x = margin + 18; x < canvas.width - margin; x += type === 'phone' ? 42 : 64) {
      ctx.beginPath();
      ctx.moveTo(x, canvas.height - margin - 130);
      ctx.lineTo(x + 30, canvas.height - margin - 170 - Math.sin(x * 0.02) * 45);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }

  initAnimations() {
    const scrollObj = { progress: 0 };
    
    // The main dolly timeline
    const tl = timelineCoordinator.createScrollTimeline(this.id, {
      trigger: this.container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
      }
    });

    tl.to(scrollObj, { progress: 1, duration: 1 });

    // HTML Text overlay fades based on scroll progress zones
    // 0-33%: Project 0, 33-66%: Project 1, 66-100%: Project 2
    for(let i=0; i<3; i++) {
      const el = document.getElementById(`proj-${i}`);
      const start = (i / 3);
      const end = start + 0.33;
      
      tl.to(el, { opacity: 1, x: 0, duration: 0.05 }, start);
      tl.to(el, { opacity: 0, x: -50, duration: 0.05 }, end - 0.05);
    }
  }

  enter() {
    super.enter();
    renderer.mainScene.add(this.projectsGroup);
    
    // Initial camera position for Projects Scene
    cameraManager.camera.position.set(0, 0, 10);
    cameraManager.camera.lookAt(0, 0, 0);
  }

  update(deltaTime) {
    if (!this.isActive) return;
    
    // Dolly Camera through the projects
    // Total distance is 3 * spacing (35) = 105
    const targetZ = 12 - this.scrollProgress * 88;
    
    // Smooth camera follow
    cameraManager.camera.position.z += (targetZ - cameraManager.camera.position.z) * 0.05;
    
    // Float devices and rotate them slightly as we pass
    const time = performance.now() * 0.001;
    this.devices.forEach((dev, i) => {
      // Idle float
      dev.group.position.y = dev.baseY + Math.sin(time + dev.timeOffset) * 0.2;
      
      // Look at camera slightly as camera approaches
      const absoluteZ = -i * 35;
      const distToCam = cameraManager.camera.position.z - absoluteZ;
      if (distToCam > 0 && distToCam < 20) {
        // Rotate devices to face the camera smoothly as it passes
        dev.group.rotation.y = (20 - distToCam) * 0.02;
      }
    });
  }

  suspend() {
    super.suspend();
    renderer.mainScene.remove(this.projectsGroup);
  }

  destroy() {
    super.destroy();
  }
}
