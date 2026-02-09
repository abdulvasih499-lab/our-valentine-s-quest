import { useEffect, useRef, useCallback } from "react";

const SparkleTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number; y: number; size: number; opacity: number;
    vx: number; vy: number; life: number; maxLife: number;
    hue: number; type: "heart" | "sparkle";
  }>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animFrame = useRef(0);

  const drawHeart = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const point = "touches" in e ? e.touches[0] : e;
      if (!point) return;
      mouse.current = { x: point.clientX, y: point.clientY };
      
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 20,
          y: mouse.current.y + (Math.random() - 0.5) * 20,
          size: Math.random() * 8 + 4,
          opacity: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -2 - 0.5,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          hue: Math.random() > 0.5 ? 340 : 350,
          type: Math.random() > 0.6 ? "heart" : "sparkle",
        });
      }
      if (particles.current.length > 80) {
        particles.current = particles.current.slice(-80);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02;
        p.opacity = 1 - p.life / p.maxLife;
        const scale = 1 - p.life / p.maxLife;

        if (p.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.opacity * 0.7;

        if (p.type === "heart") {
          ctx.fillStyle = `hsl(${p.hue}, 80%, 60%)`;
          drawHeart(ctx, p.x, p.y, p.size * scale);
        } else {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * scale);
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 75%, 1)`);
          gradient.addColorStop(1, `hsla(${p.hue}, 80%, 75%, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      animFrame.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, [drawHeart]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
};

export default SparkleTrail;
