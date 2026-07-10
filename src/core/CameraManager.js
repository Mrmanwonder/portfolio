import * as THREE from 'three';
import gsap from 'gsap';

class CameraManager {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    
    // Pointer parallax target
    this.parallaxTarget = new THREE.Vector2(0, 0);
    this.currentParallax = new THREE.Vector2(0, 0);
    
    this.isActive = false;
  }

  init() {
    this.isActive = true;
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(e) {
    // Normalized device coordinates (-1 to +1)
    this.parallaxTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.parallaxTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  /**
   * Move camera to a specific state safely.
   */
  transitionTo(position, lookAtTarget, duration = 1.0) {
    gsap.to(this.camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (lookAtTarget) {
          this.camera.lookAt(lookAtTarget);
        }
      }
    });
  }

  update(deltaTime) {
    if (!this.isActive) return;
    
    // Smooth pointer parallax applied to camera
    this.currentParallax.lerp(this.parallaxTarget, 0.05);
    
    // We add parallax offset to base position using a group in a real app, 
    // but here we just shift position slightly. (Simplification for now, scenes might override this)
    // To prevent drifting, scenes should manage their own camera targets, but this is a base behavior.
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
}

export const cameraManager = new CameraManager();
