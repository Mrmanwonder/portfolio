import './styles/global.css';
import './styles/tokens.css';
import './styles/hero.css';
import './styles/honors.css';
import './styles/projects.css';
import './styles/vault.css';
import './styles/endurance.css';
import './styles/cursor.css';

// Core
import { sceneManager } from './core/SceneManager.js';
import { renderer } from './rendering/Renderer.js';
import { scrollManager } from './core/ScrollManager.js';
import { cameraManager } from './core/CameraManager.js';

// Scenes
import { HeroScene } from './scenes/HeroScene.js';
import { HonorsScene } from './scenes/HonorsScene.js';
import { ProjectsScene } from './scenes/ProjectsScene.js';
import { VaultScene } from './scenes/VaultScene.js';
import { EnduranceScene } from './scenes/EnduranceScene.js';

// UI
import './components/Cursor.js';

async function bootstrap() {
  console.log("Systems & Endurance: Bootstrapping...");

  // Setup UI overlay container if not exists
  let app = document.getElementById('app');
  if (!app) {
    app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);
  }

  // Ensure DOM structure allows WebGL to sit behind the scrollable app
  const canvas = document.createElement('canvas');
  canvas.id = 'webgl-canvas';
  // Fixed canvas, -1 z-index so HTML content sits on top
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  // Background layer for WebGL so it doesn't show standard white body
  const bg = document.createElement('div');
  bg.id = 'bg-charcoal';
  bg.style.position = 'fixed';
  bg.style.top = '0';
  bg.style.left = '0';
  bg.style.width = '100vw';
  bg.style.height = '100vh';
  bg.style.backgroundColor = 'var(--color-charcoal)';
  bg.style.zIndex = '-2';
  document.body.appendChild(bg);

  // Initialize Core Services
  renderer.init(canvas);
  scrollManager.init();
  cameraManager.init();

  // Register Scenes
  sceneManager.register(new HeroScene());
  sceneManager.register(new HonorsScene());
  sceneManager.register(new ProjectsScene());
  sceneManager.register(new VaultScene());
  sceneManager.register(new EnduranceScene());

  // Initialize Scene DOM layout synchronously so Lenis knows the scroll height
  await sceneManager.initAll();

  console.log("Systems & Endurance: Initialization Complete.");
}

// Start application
bootstrap().catch(console.error);
