import { useEffect, useRef } from 'react';

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      // Fit to the parent header size
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cContext.fillStyle = 'rgba(226, 204, 160, 0.25)';
        cContext.fill();
      }
    }

    const initNetwork = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 16);
      for (let i = 0; i < Math.min(particleCount, 120); i++) {
        particles.push(new Particle());
      }
    };

    const animateNetwork = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity based on proximity & gold gradient theme look
            const alpha = 0.12 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(197, 160, 89, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animateNetwork);
    };

    // Initial setup
    resize();
    initNetwork();
    animateNetwork();

    // Event listeners
    window.addEventListener('resize', () => {
      resize();
      initNetwork();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="network-canvas"
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80"
    />
  );
}
