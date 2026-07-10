import * as THREE from 'three';
import { sceneManager } from '../core/SceneManager.js';
import { cameraManager } from '../core/CameraManager.js';

// Post-processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

class Renderer {
  constructor() {
    this.canvas = null;
    this.renderer = null;
    this.composer = null;
    this.mainScene = new THREE.Scene();
  }

  init(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    // Initialize Post-Processing with MSAA render target to fix aliased edges ("moving heights")
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * pixelRatio, 
      window.innerHeight * pixelRatio, 
      {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        samples: 4 // 4x MSAA
      }
    );
    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.composer.setPixelRatio(pixelRatio);
    
    // 1. Render Pass
    const renderPass = new RenderPass(this.mainScene, cameraManager.camera);
    // Allow transparency to show through
    renderPass.clearColor = new THREE.Color(0, 0, 0);
    renderPass.clearAlpha = 0;
    this.composer.addPass(renderPass);

    // 2. Bloom Pass (subtle)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // strength
      0.4, // radius
      0.8  // threshold
    );
    this.composer.addPass(bloomPass);

    // 3. Vignette Pass
    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.uniforms['offset'].value = 1.2;
    vignettePass.uniforms['darkness'].value = 0.82;
    this.composer.addPass(vignettePass);

    // 4. Film Grain Pass (noise intensity, scanline intensity, scanline count, grayscale)
    const filmPass = new FilmPass(0.08, 0.0, 0, false);
    this.composer.addPass(filmPass);

    // 5. Output Pass (handles sRGB encoding and ACESFilmic ToneMapping for composer)
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    window.addEventListener('resize', this.onResize.bind(this));
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    if (this.composer) {
      this.composer.setSize(width, height);
    }
    
    cameraManager.resize(width, height);
    sceneManager.resize(width, height);
  }

  render() {
    const dt = Math.min(this.clock.getDelta(), 0.1); 
    
    cameraManager.update(dt);
    sceneManager.update(dt);

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.mainScene, cameraManager.camera);
    }
  }
}

export const renderer = new Renderer();
