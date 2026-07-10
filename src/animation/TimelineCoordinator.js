import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class TimelineCoordinator {
  constructor() {
    this.timelines = new Map();
  }

  /**
   * Register a timeline with a unique ID
   */
  register(id, timeline) {
    if (this.timelines.has(id)) {
      this.timelines.get(id).kill();
    }
    this.timelines.set(id, timeline);
  }

  /**
   * Create a scroll-linked timeline
   */
  createScrollTimeline(id, triggerOpts) {
    const tl = gsap.timeline({
      scrollTrigger: triggerOpts
    });
    this.register(id, tl);
    return tl;
  }

  /**
   * Create an unlinked timeline
   */
  createTimeline(id, opts = {}) {
    const tl = gsap.timeline(opts);
    this.register(id, tl);
    return tl;
  }

  /**
   * Pause and kill a timeline
   */
  kill(id) {
    if (this.timelines.has(id)) {
      this.timelines.get(id).kill();
      this.timelines.delete(id);
    }
  }

  /**
   * Cleanup all timelines (usually on global route change)
   */
  disposeAll() {
    for (const [id, tl] of this.timelines.entries()) {
      tl.kill();
    }
    this.timelines.clear();
  }
}

export const timelineCoordinator = new TimelineCoordinator();
