import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { Medal } from '../components/Medal.js';
import { timelineCoordinator } from '../animation/TimelineCoordinator.js';
import { renderer } from '../rendering/Renderer.js';
import { assetManager } from '../core/AssetManager.js';

export class HonorsScene extends BaseScene {
  constructor() {
    super('honors');
    this.medal = new Medal();
    this.lastScrollY = 0;
    this.momentum = 0;
    
    // Cinematic Lighting for Medal
    this.lights = new THREE.Group();
    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(5, 5, 2);
    // Fill light
    const fillLight = new THREE.DirectionalLight(0xaaccff, 1.5);
    fillLight.position.set(-5, 0, 5);
    // Rim light for edges
    const rimLight = new THREE.SpotLight(0xffffff, 5);
    rimLight.position.set(0, 5, -5);
    rimLight.lookAt(0, 0, 0);
    
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    
    this.lights.add(keyLight);
    this.lights.add(fillLight);
    this.lights.add(rimLight);
    this.lights.add(ambient);
  }

  async preload() {
    super.preload();
    await this.medal.load(assetManager);
  }

  create() {
    this.container = document.createElement('section');
    this.container.classList.add('scene-honors');
    this.container.id = 'honors';
    this.container.style.height = '150vh'; // Allow some scrolling space for wipe effect
    
    // We use a clip-path reveal to hide the text until the medal passes over it
    this.container.innerHTML = `
      <div class="honors-content container" style="position: sticky; top: 0; display: flex; height: 100vh; align-items: center; justify-content: space-between;">
        <div class="honors-typography" style="flex: 1; z-index: 10; clip-path: inset(0 100% 0 0); color: var(--color-white);">
          <h2 class="text-display">Recognized for <span class="font-accent">Excellence</span></h2>
          <p class="text-body-large" style="margin-top: 1rem;">Awarded for outstanding contributions to scalable architectures.</p>
        </div>
        <div class="medal-anchor" style="flex: 1; height: 100%;"></div>
      </div>
    `;

    document.getElementById('app').appendChild(this.container);
  }

  initAnimations() {
    // Scroll-linked animation for Medal emergence and Text Reveal wipe
    this.tl = timelineCoordinator.createScrollTimeline('honors-medal', {
      trigger: this.container,
      start: 'top center',
      end: 'bottom bottom',
      scrub: true
    });
    
    // Drop the medal from the top edge of screen
    this.tl.fromTo(this.medal.group.position, 
      { y: 6 },
      { y: 3.5, duration: 0.5 }
    );
    
    // Move the medal across the screen horizontally as it drops (wipe effect)
    this.tl.fromTo(this.medal.group.position,
      { x: 3 },
      { x: 1, duration: 0.5 },
      0
    );

    // Text is revealed perfectly matching the medal's passing motion
    this.tl.to('.honors-typography', {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.5,
      ease: 'none'
    }, 0.2); // Start revealing a bit after medal drops
  }

  enter() {
    super.enter();
    
    // Add 3D objects to main renderer scene
    renderer.mainScene.add(this.medal.group);
    renderer.mainScene.add(this.lights);
    
    // Set initial position out of view
    this.medal.group.position.y = 6;
    this.medal.group.position.x = 3;
    // Since medal is parented to mainScene (0,0,0 center), y=3.5 means the pivot is at the top of the viewport
  }

  update(deltaTime) {
    if (!this.isActive) return;
    
    // Calculate physical scroll momentum for medal swing
    const currentScroll = window.scrollY;
    const deltaY = currentScroll - this.lastScrollY;
    
    // Feed scroll velocity into medal's pendulum physics
    this.medal.update(deltaY);
    this.lastScrollY = currentScroll;
  }

  suspend() {
    super.suspend();
    renderer.mainScene.remove(this.medal.group);
    renderer.mainScene.remove(this.lights);
  }

  destroy() {
    super.destroy();
    this.medal.dispose();
  }
}
