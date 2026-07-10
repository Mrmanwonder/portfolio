import { BaseScene } from './BaseScene.js';
import { HeroPortrait } from '../components/HeroPortrait.js';
import { timelineCoordinator } from '../animation/TimelineCoordinator.js';

export class HeroScene extends BaseScene {
  constructor() {
    super('hero');
    this.portrait = null;
    this.tl = null;
  }

  create() {
    this.container = document.createElement('section');
    this.container.classList.add('scene-hero', 'container');
    this.container.id = 'hero';
    
    this.container.innerHTML = `
      <div class="hero-content">
        <div class="hero-portrait-wrapper"></div>
        <div class="hero-typography">
          <h1 class="text-display-xl" style="opacity: 0;">I build <span class="font-accent">systems</span>.</h1>
          <p class="hero-annotation font-accent text-h3" style="opacity: 0;">...and run far.</p>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(this.container);

    const portraitWrapper = this.container.querySelector('.hero-portrait-wrapper');
    this.portrait = new HeroPortrait(portraitWrapper);
  }

  initAnimations() {
    // Create intro animation timeline
    this.tl = timelineCoordinator.createTimeline('hero-intro');
    
    // Portrait begins drawing very quickly
    this.tl.delay(0.2);
    this.portrait.animateDrawing(this.tl);

    // Headline fades in after portrait is 'alive'
    this.tl.to('.hero-typography h1', 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
      'alive+=0.5' // Label defined in animateDrawing
    );

    // Annotation writes itself shortly after
    this.tl.fromTo('.hero-annotation',
      { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.out' },
      'alive+=1.0'
    );

    // Scroll exit behavior linked to timeline coordinator
    timelineCoordinator.createScrollTimeline('hero-exit', {
      trigger: this.container,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }).to(this.container, {
      opacity: 0,
      y: -150
    });
  }

  enter() {
    super.enter();
    if (this.tl) this.tl.play();
  }

  suspend() {
    super.suspend();
    if (this.tl) this.tl.pause();
  }
}
