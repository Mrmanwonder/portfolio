import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { renderer } from '../rendering/Renderer.js';
import { cameraManager } from '../core/CameraManager.js';
import gsap from 'gsap';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export class VaultScene extends BaseScene {
  constructor() {
    super('vault');
    this.group = new THREE.Group();

    this.INSTANCE_COUNT = 210;
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.hoveredMesh = null;
    this.isDocumentOpen = false;

    this.archiveData = [
      { title: ["Aptitude", "Olympiad"], year: "2023", pos: [0, 0, 1.5] },
      { title: ["IOEL", "Community", "Service"], year: "2024", pos: [-3.5, 1.0, 0.5] },
      { title: ["RMO", "Qualification"], year: "2023", pos: [3.5, -1.5, 1.0] },
      { title: ["SOF", "National", "Science", "Olympiad"], year: "2022", pos: [-4, -2, 0.0] },
      { title: ["Math", "Kangaroo"], year: "2022", pos: [4, 2, 0.5] },
      { title: ["National", "Level", "Debate"], year: "2023", pos: [-4.5, -4.5, -1.5] },
      { title: ["Cyber", "Awareness", "Workshop"], year: "2023", pos: [-2, -5.5, -2.0] },
      { title: ["NCM", "School", "Champion"], year: "2023", pos: [-1.5, 3.5, 0.0] },
      { title: ["ASMO", "Distinction"], year: "2023", pos: [2, 4.5, -1.5] },
      { title: ["BITSAT", "Qualified"], year: "2023", pos: [4.5, 2.5, 0.0] },
      { title: ["IOEL", "Volunteer"], year: "2023", pos: [2.5, -0.5, -1.5] },
      { title: ["Python", "Programming", "Certification"], year: "2023", pos: [2.5, -4, -2.0] }
    ];

    this.mainDocuments = [];
    this.instanceData = [];
    this.lights = new THREE.Group();

    this.fillLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.lights.add(this.fillLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.keyLight.position.set(0, 10, 5);
    this.lights.add(this.keyLight);

    this.rimLight = new THREE.DirectionalLight(0x3a86ff, 0.4);
    this.rimLight.position.set(-15, 0, -5);
    this.lights.add(this.rimLight);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  create() {
    this.container = document.createElement('section');
    this.container.classList.add('scene-vault');
    this.container.id = 'vault';

    this.container.innerHTML = `
      <div class="vault-ui">
        <div class="center-titles">
          <h2>The Vault</h2>
          <p class="subtitle">${this.INSTANCE_COUNT + this.archiveData.length} Documents</p>
        </div>

        <div class="side-dots">
          <div class="dot"></div>
          <div class="dot active"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>

        <div class="vault-instructions left">
          MOVE CURSOR TO EXPLORE
        </div>
        <div class="vault-instructions right">
          <span class="mouse-glyph" aria-hidden="true"></span> CLICK A DOCUMENT TO OPEN
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(this.container);
    this.buildArchive();
  }

  createDocumentTexture(titleLines, year) {
    const canvas = document.createElement('canvas');
    // Enforce Power of 2 dimensions for clean WebGL mipmap generation
    canvas.width = 1024;
    canvas.height = 2048; 
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    ctx.font = '500 78px "Google Sans", sans-serif';
    let y = 570;
    titleLines.forEach(line => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(line, 140, y);
      y += 105;
    });

    y += 60;
    ctx.font = '400 63px "Google Sans", sans-serif';
    ctx.fillStyle = '#3A86FF';
    ctx.fillText(year, 140, y);

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '500 30px "Google Sans", sans-serif';
    ctx.fillText('PDF DOCUMENT', 197, canvas.height - 270);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(140, canvas.height - 276, 33, 39);
    
    ctx.beginPath();
    ctx.moveTo(149, canvas.height - 264); ctx.lineTo(164, canvas.height - 264);
    ctx.moveTo(149, canvas.height - 255); ctx.lineTo(164, canvas.height - 255);
    ctx.moveTo(149, canvas.height - 246); ctx.lineTo(158, canvas.height - 246);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = renderer.renderer ? renderer.renderer.capabilities.getMaxAnisotropy() : 16;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  buildArchive() {
    const docGeo = new RoundedBoxGeometry(1.2, 1.67, 0.08, 4, 0.02);

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 1.0, // Matte finish to stop harsh light dots
      metalness: 0.0
    });

    this.archiveData.forEach((data, index) => {
      const frontMat = baseMat.clone();
      frontMat.color.setHex(0xffffff);
      frontMat.map = this.createDocumentTexture(data.title, data.year);

      const materials = [baseMat, baseMat, baseMat, baseMat, frontMat, baseMat];
      const mesh = new THREE.Mesh(docGeo, materials);

      mesh.position.set(...data.pos);
      mesh.rotation.set(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.1
      );

      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.2, 
        isHovered: false
      };

      this.mainDocuments.push(mesh);
      this.group.add(mesh);
    });

    this.instancedMesh = new THREE.InstancedMesh(docGeo, baseMat, this.INSTANCE_COUNT);
    this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();

    for (let i = 0; i < this.INSTANCE_COUNT; i++) {
      const depthType = Math.random();
      let z, x, y;

      if (depthType < 0.02) {
        z = 3.0 + Math.random() * 1.5;
        x = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 1.5);
        y = (Math.random() > 0.5 ? 1 : -1) * (1.0 + Math.random() * 1.5);
      } else if (depthType < 0.2) {
        z = -3.0 + Math.random() * 4.0;
        x = (Math.random() - 0.5) * 8;
        y = (Math.random() - 0.5) * 6;
      } else if (depthType < 0.6) {
        z = -10.0 + Math.random() * 7.0;
        x = (Math.random() - 0.5) * 16;
        y = (Math.random() - 0.5) * 12;
      } else {
        z = -25.0 + Math.random() * 15.0;
        x = (Math.random() - 0.5) * 35;
        y = (Math.random() - 0.5) * 25;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.4
      );

      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      this.instancedMesh.setMatrixAt(i, dummy.matrix);
      this.instanceData.push({
        basePos: dummy.position.clone(),
        baseRot: dummy.rotation.clone(),
        scale: scale,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.2 
      });
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    this.group.add(this.instancedMesh);
  }

  enter() {
    super.enter();
    renderer.mainScene.add(this.group);
    renderer.mainScene.add(this.lights);

    this.previousFog = renderer.mainScene.fog;
    renderer.mainScene.fog = null; // Removed fog for clarity
    
    const bg = document.getElementById('bg-charcoal');
    if (bg) {
      this.previousBg = bg.style.background;
      bg.style.background = '#000'; // Pure black baseline
    }

    cameraManager.camera.position.set(0, 0, 7.5); // Pushed camera back so documents fit properly
    cameraManager.camera.lookAt(0, 0, 0);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('click', this.onClick);
  }

  onMouseMove(e) {
    this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onClick() {
    if (this.hoveredMesh && !this.isDocumentOpen) {
      this.openDocument();
    } else if (this.isDocumentOpen) {
      this.closeDocument();
    }
  }

  openDocument() {
    this.isDocumentOpen = true;

    gsap.to('.vault-ui', { opacity: 0, duration: 0.5 });
    gsap.to(cameraManager.camera.position, { z: 4.5, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(this.fillLight, { intensity: 0.1, duration: 1.5, ease: 'power2.inOut' });

    this.mainDocuments.forEach(mesh => {
      if (mesh === this.hoveredMesh) {
        gsap.to(mesh.position, {
          x: 0, y: 0, z: 2.0, 
          duration: 1.5,
          ease: 'power3.inOut'
        });
        gsap.to(mesh.rotation, {
          x: 0, y: 0, z: 0,
          duration: 1.5,
          ease: 'power3.inOut'
        });
        gsap.to(mesh.scale, {
          x: 3.5, y: 3.5, z: 0.05,
          duration: 1.2,
          delay: 0.8,
          ease: 'expo.inOut'
        });
      } else {
        gsap.to(mesh.position, {
          z: mesh.userData.basePos.z - 15,
          duration: 1.5,
          ease: 'power3.inOut'
        });
      }
    });

    gsap.to(this.instancedMesh.position, { z: -15, duration: 1.5, ease: 'power3.inOut' });
  }

  closeDocument() {
    this.isDocumentOpen = false;

    gsap.to('.vault-ui', { opacity: 1, duration: 0.5 });
    gsap.to(cameraManager.camera.position, { z: 7.5, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(this.fillLight, { intensity: 0.3, duration: 1.5, ease: 'power2.inOut' });

    this.mainDocuments.forEach(mesh => {
      const targetZ = mesh === this.hoveredMesh ? mesh.userData.basePos.z + 0.8 : mesh.userData.basePos.z;

      if (mesh === this.hoveredMesh) {
        gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 1.0, ease: 'expo.out' });
      }

      gsap.to(mesh.position, {
        x: mesh.userData.basePos.x,
        y: mesh.userData.basePos.y,
        z: targetZ,
        duration: 1.5,
        ease: 'power3.inOut'
      });

      if (mesh === this.hoveredMesh) {
        gsap.to(mesh.rotation, {
          x: mesh.userData.baseRot.x,
          y: mesh.userData.baseRot.y,
          z: mesh.userData.baseRot.z,
          duration: 1.5,
          ease: 'power3.inOut'
        });
      }
    });

    gsap.to(this.instancedMesh.position, { z: 0, duration: 1.5, ease: 'power3.inOut' });
  }

  update(deltaTime) {
    if (!this.isActive) return;
    const time = performance.now() * 0.001;

    this.mouse.x = THREE.MathUtils.lerp(this.mouse.x, this.targetMouse.x, 0.04);
    this.mouse.y = THREE.MathUtils.lerp(this.mouse.y, this.targetMouse.y, 0.04);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.INSTANCE_COUNT; i++) {
      const data = this.instanceData[i];
      const t = time * data.speed + data.phase;

      dummy.position.set(
        data.basePos.x + Math.sin(t) * 0.15,
        data.basePos.y + Math.cos(t * 0.8) * 0.15,
        data.basePos.z + Math.sin(t * 0.5) * 0.05
      );

      dummy.rotation.set(
        data.baseRot.x + Math.sin(t * 0.5) * 0.05,
        data.baseRot.y + Math.cos(t * 0.3) * 0.05,
        data.baseRot.z + Math.sin(t * 0.2) * 0.05
      );
      dummy.scale.setScalar(data.scale);
      dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    this.instancedMesh.instanceMatrix.needsUpdate = true;

    this.mainDocuments.forEach(mesh => {
      if (mesh.userData.isHovered || this.isDocumentOpen) return;

      const t = time * mesh.userData.speed + mesh.userData.phase;
      mesh.position.set(
        mesh.userData.basePos.x + Math.sin(t) * 0.1,
        mesh.userData.basePos.y + Math.cos(t * 0.8) * 0.1,
        mesh.userData.basePos.z + Math.sin(t * 0.5) * 0.05
      );
      mesh.rotation.set(
        mesh.userData.baseRot.x + Math.sin(t * 0.5) * 0.05,
        mesh.userData.baseRot.y + Math.cos(t * 0.3) * 0.05,
        mesh.userData.baseRot.z + Math.sin(t * 0.2) * 0.05
      );
    });

    if (!this.isDocumentOpen) {
      this.raycaster.setFromCamera(this.mouse, cameraManager.camera);
      const intersects = this.raycaster.intersectObjects(this.mainDocuments);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;

        if (this.hoveredMesh !== hitMesh) {
          if (this.hoveredMesh) {
            this.hoveredMesh.userData.isHovered = false;
            gsap.to(this.hoveredMesh.position, {
              z: this.hoveredMesh.userData.basePos.z,
              duration: 0.8,
              ease: 'power2.out'
            });
            gsap.to(this.hoveredMesh.rotation, {
              x: this.hoveredMesh.userData.baseRot.x,
              y: this.hoveredMesh.userData.baseRot.y,
              z: this.hoveredMesh.userData.baseRot.z,
              duration: 0.8,
              ease: 'power2.out'
            });
            gsap.to(this.hoveredMesh.material[4].color, { r: 1, g: 1, b: 1, duration: 0.3 });
          }

          this.hoveredMesh = hitMesh;
          this.hoveredMesh.userData.isHovered = true;

          gsap.killTweensOf(this.hoveredMesh.position);
          gsap.killTweensOf(this.hoveredMesh.rotation);

          gsap.to(this.hoveredMesh.position, {
            z: this.hoveredMesh.userData.basePos.z + 0.8,
            duration: 0.5,
            ease: 'back.out(1.5)'
          });
          gsap.to(this.hoveredMesh.rotation, {
            x: 0, y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });

          gsap.to(this.hoveredMesh.material[4].color, { r: 1, g: 1, b: 1, duration: 0.3 });
          gsap.to(this.fillLight, { intensity: 0.5, duration: 0.5 });
        }
      } else {
        if (this.hoveredMesh) {
          this.hoveredMesh.userData.isHovered = false;

          gsap.to(this.hoveredMesh.position, {
            z: this.hoveredMesh.userData.basePos.z,
            duration: 0.8,
            ease: 'power2.out'
          });
          gsap.to(this.hoveredMesh.rotation, {
            x: this.hoveredMesh.userData.baseRot.x,
            y: this.hoveredMesh.userData.baseRot.y,
            z: this.hoveredMesh.userData.baseRot.z,
            duration: 0.8,
            ease: 'power2.out'
          });
          gsap.to(this.hoveredMesh.material[4].color, { r: 1, g: 1, b: 1, duration: 0.3 });
          gsap.to(this.fillLight, { intensity: 0.3, duration: 0.5 });

          this.hoveredMesh = null;
        }
      }
    }
  }

  suspend() {
    super.suspend();
    renderer.mainScene.remove(this.group);
    renderer.mainScene.remove(this.lights);
    renderer.mainScene.fog = this.previousFog;
    const bg = document.getElementById('bg-charcoal');
    if (bg && this.previousBg !== undefined) {
      bg.style.background = this.previousBg;
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('click', this.onClick);
  }

  destroy() {
    super.destroy();
    this.mainDocuments.forEach(mesh => {
      mesh.geometry.dispose();
      mesh.material.forEach(mat => mat.dispose());
      if (mesh.material[4] && mesh.material[4].map) mesh.material[4].map.dispose();
    });
    if (this.instancedMesh) {
      this.instancedMesh.geometry.dispose();
      if (Array.isArray(this.instancedMesh.material)) {
        this.instancedMesh.material.forEach(mat => mat.dispose());
      } else {
        this.instancedMesh.material.dispose();
      }
    }
  }
}
