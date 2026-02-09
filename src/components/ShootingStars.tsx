import { useEffect, useRef } from "react";

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Star {
      x: number; y: number; len: number;
      speed: number; opacity: number; angle: number;
      life: number; maxLife: number;
    }

    const stars: Star[] = [];

    const spawnStar = () => {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        len: Math.random() * 60 + 30,
        speed: Math.random() * 4 + 3,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 80 === 0) spawnStar();

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        if (s.opacity <= 0) {
          stars.splice(i, 1);
          continue;
        }

        const gradient = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        gradient.addColorStop(0, `hsla(340, 80%, 75%, ${s.opacity})`);
        gradient.addColorStop(1, `hsla(340, 80%, 75%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        ctx.stroke();

        // Glow dot at head
        ctx.fillStyle = `hsla(340, 80%, 90%, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ShootingStars;
