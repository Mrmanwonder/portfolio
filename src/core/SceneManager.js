export class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.activeScene = null;
    this.nextSceneToPreload = null;
    this.observer = null;
  }

  /**
   * Register a scene module with the manager.
   * @param {object} scene - Instance extending BaseScene
   */
  register(scene) {
    this.scenes.set(scene.id, scene);
  }

  /**
   * Initialize all registered scenes.
   */
  async initAll() {
    // 1. Create DOM for all scenes so total page layout/height is established
    for (const [id, scene] of this.scenes.entries()) {
      scene.create();
    }
    
    // 2. Setup GSAP ScrollTriggers globally now that DOM is fixed
    for (const [id, scene] of this.scenes.entries()) {
      scene.initAnimations();
    }

    this.setupObserver();
  }

  /**
   * Create an IntersectionObserver to detect which scene is currently active in the viewport.
   */
  setupObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Activate when 10% visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sceneId = entry.target.dataset.sceneId;
          if (sceneId && this.activeScene?.id !== sceneId) {
            this.activateScene(sceneId);
          }
        }
      });
    }, options);

    for (const [id, scene] of this.scenes.entries()) {
      if (scene.container) {
        scene.container.dataset.sceneId = id;
        this.observer.observe(scene.container);
      }
    }
  }

  /**
   * Activate a scene, handling lifecycle methods.
   * @param {string} id 
   */
  async activateScene(id) {
    const nextScene = this.scenes.get(id);
    if (!nextScene) return;

    // Suspend or Exit the previous scene
    if (this.activeScene) {
      this.activeScene.suspend();
    }

    // Preload heavy assets if not already loaded
    await nextScene.preload();
    
    // Enter the scene (activates GSAP timelines, adds WebGL objects)
    nextScene.enter();
    this.activeScene = nextScene;
    this.updateNavigation(id);

    // Determine next scene to preload based on map order
    this.preloadNextScene(id);
  }

  updateNavigation(id) {
    document.body.dataset.activeScene = id;
    document.querySelectorAll('.global-nav a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  preloadNextScene(currentId) {
    const sceneKeys = Array.from(this.scenes.keys());
    const currentIndex = sceneKeys.indexOf(currentId);
    if (currentIndex >= 0 && currentIndex < sceneKeys.length - 1) {
      const nextId = sceneKeys[currentIndex + 1];
      const nextScene = this.scenes.get(nextId);
      // Preload next scene in background
      nextScene.preload().catch(console.error);
    }
  }

  /**
   * Propagate update loop to the active scene only.
   * @param {number} deltaTime 
   */
  update(deltaTime) {
    if (this.activeScene) {
      this.activeScene.update(deltaTime);
    }
  }

  /**
   * Propagate resize events.
   */
  resize(width, height) {
    for (const scene of this.scenes.values()) {
      scene.resize(width, height);
    }
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
    for (const scene of this.scenes.values()) {
      scene.destroy();
    }
    this.scenes.clear();
  }
}

export const sceneManager = new SceneManager();
