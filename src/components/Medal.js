import * as THREE from 'three';

export class Medal {
  constructor() {
    this.mesh = null;
    this.ribbon = null;
    this.group = new THREE.Group();
    this.isLoaded = false;
    
    // Physics properties
    this.angle = 0;
    this.velocity = 0;
  }

  async load(assetManager) {
    if (this.isLoaded) return;
    
    // Medal Body
    const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64);
    
    // Improved PBR Gold Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold
      metalness: 0.9,
      roughness: 0.2,
      flatShading: false
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = Math.PI / 2; // Face forward
    // Offset mesh downwards so it hangs from the ribbon
    this.mesh.position.y = -3.5;
    
    // Ribbon
    const ribbonGeo = new THREE.BoxGeometry(0.8, 4, 0.05);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x8b0000, // Deep crimson red ribbon
      roughness: 0.9,
      metalness: 0.0
    });
    this.ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    // Offset ribbon so its top is at y=0 (pivot point)
    this.ribbon.position.y = -2;

    this.group.add(this.ribbon);
    this.group.add(this.mesh);

    // Initial position offset for entry animation (start high up)
    this.group.position.y = 5;
    
    this.isLoaded = true;
  }

  update(momentum) {
    if (!this.isLoaded) return;
    
    // Spring physics for the swing (pendulum)
    this.velocity += momentum * 0.005; // Scroll adds force
    this.velocity -= this.angle * 0.05; // Gravity/spring pulls back to 0
    this.velocity *= 0.90; // Damping
    
    this.angle += this.velocity;
    
    // Apply swing angle
    this.group.rotation.z = -this.angle;
    
    // Stretch ribbon slightly based on velocity (fake elastic)
    const stretch = 1 + Math.abs(this.velocity) * 0.2;
    this.ribbon.scale.y = stretch;
    // Adjust mesh position when ribbon stretches
    this.mesh.position.y = -3.5 * stretch;
    
    // The medal rotates around Y slightly as it swings to catch the light
    this.group.rotation.y = this.angle * 0.5;
    
    // Medal tilts slightly forward when swinging fast
    this.group.rotation.x = this.angle * 0.2;
  }

  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
    }
    if (this.ribbon) {
      this.ribbon.geometry.dispose();
      this.ribbon.material.dispose();
    }
  }
}
