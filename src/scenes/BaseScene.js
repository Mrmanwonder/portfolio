export class BaseScene {
  constructor(id) {
    this.id = id;
    this.container = null;
    this.isActive = false;
    this.isPreloaded = false;
  }

  /**
   * Called once when the DOM is fully constructed.
   * Useful for initializing global ScrollTriggers so they can calculate heights correctly.
   */
  initAnimations() {
    // Override in subclasses
  }

  /**
   * Called to load heavy assets before entering.
   */
  async preload() {
    this.isPreloaded = true;
  }

  /**
   * Called once at startup to create DOM elements.
   * Container is not strictly added to flow if not visible,
   * but for scrolling sites, it's typically injected right away
   * with proper layout CSS.
   */
  create() {
    // Override in subclass
  }

  /**
   * Called when scene intersects viewport.
   */
  enter() {
    this.isActive = true;
  }

  /**
   * Render loop tick (only called if active)
   */
  update(deltaTime) {
    // Override in subclass
  }

  /**
   * Resize event handler
   */
  resize(width, height) {
    // Override in subclass
  }

  /**
   * Called when scene leaves viewport.
   */
  suspend() {
    this.isActive = false;
  }

  /**
   * Cleanup memory and DOM.
   */
  destroy() {
    this.isActive = false;
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
  }
}
