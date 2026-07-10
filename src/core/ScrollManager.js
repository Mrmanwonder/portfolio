import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class ScrollManager {
  constructor() {
    this.lenis = null;
    this.isActive = false;
  }

  /**
   * Initialize Lenis and integrate with GSAP ScrollTrigger
   */
  init() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default Lenis easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scroll with ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis on every GSAP tick
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    this.isActive = true;
  }

  /**
   * Start or resume scroll listener
   */
  start() {
    if (this.lenis && !this.isActive) {
      this.lenis.start();
      this.isActive = true;
    }
  }

  /**
   * Pause scroll listener
   */
  stop() {
    if (this.lenis && this.isActive) {
      this.lenis.stop();
      this.isActive = false;
    }
  }

  /**
   * Scroll to a specific target
   * @param {string|HTMLElement|number} target - The target to scroll to
   * @param {object} options - Lenis scroll options
   */
  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    }
  }

  /**
   * Clean up instances
   */
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }
}

export const scrollManager = new ScrollManager();
