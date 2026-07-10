import gsap from 'gsap';

export class HeroPortrait {
  constructor(container) {
    this.container = container;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', '0 0 500 500');
    this.svg.classList.add('hero-portrait');
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';
    this.container.appendChild(this.svg);
    
    this.paths = [];
    this.splashes = [];
    this.initPaths();
    this.initSplashes();
  }

  initPaths() {
    // Hand-drawn feel with curves
    const pathData = [
      { id: 'chin-jaw', d: 'M150,300 C150,400 350,400 350,300' },
      { id: 'ear-l', d: 'M150,300 C130,300 130,250 150,250' },
      { id: 'ear-r', d: 'M350,300 C370,300 370,250 350,250' },
      { id: 'hair', d: 'M130,250 C100,100 400,100 370,250 C370,180 130,180 130,250' },
      { id: 'eye-l', d: 'M200,250 C210,240 230,240 240,250' },
      { id: 'eye-r', d: 'M260,250 C270,240 290,240 300,250' },
      { id: 'nose', d: 'M250,250 L250,320 L270,320' },
      { id: 'mouth', d: 'M230,350 C250,360 250,360 270,350' },
      { id: 'smile-l', d: 'M230,350 C220,340 220,340 220,340', opacity: 0 },
      { id: 'smile-r', d: 'M270,350 C280,340 280,340 280,340', opacity: 0 }
    ];

    pathData.forEach(p => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'var(--color-cerulean)');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('stroke-linecap', 'round');
      
      if (p.opacity === 0) path.style.opacity = 0;
      
      this.svg.appendChild(path);
      
      // Calculate length AFTER appending so browser computes it correctly
      const length = path.getTotalLength() || 1000;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length; // Hide initially

      this.paths.push({ element: path, length, id: p.id });
    });
  }

  initSplashes() {
    // Add tiny ink splashes (dots) that will pop in during drawing
    for (let i = 0; i < 15; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      // Random positions around the face
      const cx = 100 + Math.random() * 300;
      const cy = 100 + Math.random() * 300;
      const r = Math.random() * 1.5 + 0.5;
      
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', r);
      circle.setAttribute('fill', 'var(--color-cerulean)');
      circle.setAttribute('opacity', '0');
      circle.style.transformOrigin = `${cx}px ${cy}px`;
      circle.style.transform = 'scale(0)';
      
      this.svg.appendChild(circle);
      this.splashes.push(circle);
    }
  }

  animateDrawing(tl) {
    let totalDrawTime = 0;
    // Reveal all major features with varied speed
    this.paths.forEach(p => {
      if (!p.id.startsWith('smile')) {
        // Longer paths take longer, but with some natural variation
        const duration = Math.max(0.2, (p.length / 500)) * (0.8 + Math.random() * 0.4);
        
        tl.to(p.element, {
          strokeDashoffset: 0,
          duration: duration,
          ease: 'power2.out'
        }, '>'); // append sequentially
        
        totalDrawTime += duration;
      }
    });

    // Animate ink splashes randomly during the drawing phase
    this.splashes.forEach(splash => {
      const appearTime = Math.random() * totalDrawTime;
      tl.to(splash, {
        opacity: Math.random() * 0.6 + 0.2, // slight opacity variation
        scale: 1,
        duration: 0.1,
        ease: 'back.out(2)'
      }, appearTime);
    });

    // Add micro animations (smile, breathing, blinking)
    tl.addLabel('alive'); // Portrait is fully drawn here
    
    const smileL = this.paths.find(p => p.id === 'smile-l').element;
    const smileR = this.paths.find(p => p.id === 'smile-r').element;
    tl.to([smileL, smileR], { opacity: 1, duration: 0.5 }, 'alive+=0.2');
    
    // Breathing idle animation (subtle chest/head expansion)
    gsap.to(this.svg, {
      scaleY: 1.02,
      scaleX: 0.99,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: totalDrawTime + 0.5
    });

    // Head drift
    gsap.to(this.svg, {
      x: 3,
      y: 2,
      rotation: 0.5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: totalDrawTime + 1
    });

    // Blinking (Scale Y of eyes)
    const eyeL = this.paths.find(p => p.id === 'eye-l').element;
    const eyeR = this.paths.find(p => p.id === 'eye-r').element;
    
    // Custom transform origin for eyes so they blink correctly
    eyeL.style.transformOrigin = '220px 245px';
    eyeR.style.transformOrigin = '280px 245px';

    const blink = () => {
      gsap.to([eyeL, eyeR], {
        scaleY: 0.1,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(Math.random() * 4 + 2, blink); // next blink in 2-6 seconds
        }
      });
    };
    gsap.delayedCall(totalDrawTime + 1.5, blink);
  }
}
