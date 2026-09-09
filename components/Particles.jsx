"use client";

import { useEffect, useRef } from "react";

export default function Particles({ density = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles = [];
    let animationId;
    let isVisible = true;
    let frameCount = 0;

    const isMobile = window.innerWidth < 768;
    const isLowPerf = isMobile || navigator.hardwareConcurrency <= 4;
    const maxParticles = Math.round((isLowPerf ? 18 : 34) * density);
    const connectionDistance = isMobile ? 80 : 120;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isMobile) particles.length = Math.min(particles.length, 12);
    }
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.6 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.35 + 0.08;
        this.hue = Math.random() > 0.5 ? 192 : 258;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
          this.x < -10 ||
          this.x > canvas.width + 10 ||
          this.y < -10 ||
          this.y > canvas.height + 10
        ) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 72%, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    function drawConnections() {
      if (isLowPerf && frameCount % 2 !== 0) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 255, ${0.05 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections();
      frameCount++;
      animationId = requestAnimationFrame(animate);
    }
    animate();

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", () => {
      isVisible = !document.hidden;
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}