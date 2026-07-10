import gsap from 'gsap';

class Cursor {
  constructor() {
    this.isTouch = (('ontouchstart' in window) || (window.navigator.maxTouchPoints > 0));
    if (this.isTouch) return;

    document.body.classList.add('has-custom-cursor');

    this.element = document.createElement('div');
    this.element.classList.add('custom-cursor');
    document.body.appendChild(this.element);

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.activeElement = null;
    this.isHovering = false;

    this.initEvents();
    this.render();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      if (!this.activeElement) {
        // Find magnetic elements
        const target = e.target.closest('[data-magnetic]');
        if (target) {
          this.activeElement = target;
          this.element.classList.add('cursor-magnetic');
        } else {
          this.element.classList.remove('cursor-magnetic');
        }
      }
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.arsenal-item')) {
        this.element.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.arsenal-item')) {
        this.element.classList.remove('cursor-hover');
      }
      if (this.activeElement && !e.target.closest('[data-magnetic]')) {
        this.activeElement = null;
        this.element.classList.remove('cursor-magnetic');
      }
    });

    document.addEventListener('mousedown', () => {
      gsap.to(this.element, { scale: 0.8, duration: 0.1 });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(this.element, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    });
  }

  render() {
    if (this.activeElement) {
      const rect = this.activeElement.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      
      this.pos.x += (targetX - this.pos.x) * 0.15;
      this.pos.y += (targetY - this.pos.y) * 0.15;
    } else {
      this.pos.x += (this.mouse.x - this.pos.x) * 0.2;
      this.pos.y += (this.mouse.y - this.pos.y) * 0.2;
    }

    gsap.set(this.element, {
      x: this.pos.x,
      y: this.pos.y,
      xPercent: -50,
      yPercent: -50
    });

    requestAnimationFrame(this.render.bind(this));
  }
}

export const cursor = new Cursor();
