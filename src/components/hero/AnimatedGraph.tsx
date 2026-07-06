import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { AnimatedCounter } from './AnimatedCounter';

interface AnimatedGraphProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
}

export function AnimatedGraph({
  className = '',
  width = 400,
  height = 200,
  color = '#1296DB',
  delay = 0,
}: AnimatedGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr * 2;
    canvas.height = height * dpr * 2;
    ctx.scale(dpr * 2, dpr * 2);

    let progress = 0;
    let startTime: number | null = null;
    const particles: Array<{ x: number; y: number; progress: number; speed: number; size: number }> = [];
    const particleCount = 5;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0,
        y: 0,
        progress: i / particleCount,
        speed: 0.001 + Math.random() * 0.0005,
        size: 2 + Math.random() * 2,
      });
    }

    const graphPath = (p: number) => {
      const points: { x: number; y: number }[] = [];
      const numPoints = 10;
      const curveHeight = height * 0.7;

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = t * width;
        const baseY = height - 30;
        const curve = Math.pow(t, 1.5) * curveHeight;
        const wave = Math.sin(t * Math.PI * 3) * (curveHeight * 0.1);
        const y = baseY - curve + wave;
        if (t <= p) {
          points.push({ x, y });
        }
      }
      return points;
    };

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;

      // Progress based on delay and duration
      if (delay > 0 && elapsed < delay * 1000) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const animationDuration = 2000;
      progress = Math.min((elapsed - delay * 1000) / animationDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = 'rgba(18, 150, 219, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw the growing line
      const points = graphPath(easeOut);
      if (points.length > 1) {
        // Draw full path as background
        const fullPoints = graphPath(1);
        ctx.strokeStyle = 'rgba(18, 150, 219, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        fullPoints.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw gradient fill
        ctx.beginPath();
        ctx.moveTo(points[0].x, height);
        points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(18, 150, 219, 0.3)');
        gradient.addColorStop(1, 'rgba(18, 150, 219, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw the active line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw glow
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Update and draw particles
        if (points.length > 1) {
          const endPoint = points[points.length - 1];

          // Draw endpoint glow
          ctx.beginPath();
          const glowGradient = ctx.createRadialGradient(endPoint.x, endPoint.y, 0, endPoint.x, endPoint.y, 20);
          glowGradient.addColorStop(0, color);
          glowGradient.addColorStop(1, 'rgba(18, 150, 219, 0)');
          ctx.fillStyle = glowGradient;
          ctx.arc(endPoint.x, endPoint.y, 20, 0, Math.PI * 2);
          ctx.fill();

          // Draw main endpoint
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(endPoint.x, endPoint.y, 5, 0, Math.PI * 2);
          ctx.fill();

          // Draw particles moving along the path
          particles.forEach((particle) => {
            particle.progress += particle.speed;
            if (particle.progress > easeOut) particle.progress = 0;

            const px = particle.progress * width;
            const py = height - 30 - Math.pow(particle.progress, 1.5) * height * 0.7 + Math.sin(particle.progress * Math.PI * 3) * height * 0.07;

            ctx.beginPath();
            ctx.fillStyle = `rgba(18, 150, 219, ${0.8 - particle.progress * 0.3})`;
            ctx.arc(px, py, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      // Axis labels
      ctx.font = '10px Inter, system-ui';
      ctx.fillStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.textAlign = 'start';
      ctx.fillText('Time', width - 30, height - 5);
      ctx.textAlign = 'left';
      ctx.save();
      ctx.translate(10, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Growth', 0, 0);
      ctx.restore();

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [width, height, color, delay, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`relative ${className}`}
    >
      <div className="relative bg-white/80 backdrop-blur rounded-2xl border border-secondary-100 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-secondary-500">Revenue Growth</div>
            <div className="text-2xl font-semibold text-secondary-800">
              <AnimatedCounter from={0} to={847} prefix="$" suffix="K" duration={2} delay={delay} />
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success-100 text-success-700 text-sm font-medium">
            <span>+127%</span>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full"
          style={{ height: `${height}px` }}
        />
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-secondary-100">
          <div>
            <div className="text-xs text-secondary-500">Monthly</div>
            <div className="text-sm font-medium text-secondary-800">
              <AnimatedCounter from={0} to={42} suffix="K" duration={1.5} delay={delay + 0.3} />
            </div>
          </div>
          <div>
            <div className="text-xs text-secondary-500">Customers</div>
            <div className="text-sm font-medium text-secondary-800">
              <AnimatedCounter from={0} to={1284} duration={1.5} delay={delay + 0.4} />
            </div>
          </div>
          <div>
            <div className="text-xs text-secondary-500">Growth</div>
            <div className="text-sm font-medium text-secondary-800">
              <AnimatedCounter from={0} to={23} suffix="%" duration={1.5} delay={delay + 0.5} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface MiniGraphProps {
  className?: string;
  color?: string;
  delay?: number;
}

export function MiniGraph({
  className = '',
  color = '#1296DB',
  delay = 0,
}: MiniGraphProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
    >
      <svg width="120" height="50" viewBox="0 0 120 50" className="overflow-visible">
        <defs>
          <linearGradient id={`miniGradient-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,40 Q20,35 40,25 T80,15 T120,5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.5, delay, ease: 'easeOut' },
            opacity: { duration: 0.5, delay },
          }}
        />

        <motion.path
          d="M0,40 Q20,35 40,25 T80,15 T120,5 L120,50 L0,50 Z"
          fill={`url(#miniGradient-${delay})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        />

        <motion.circle
          cx="120"
          cy="5"
          r="4"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 1.3, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <motion.circle
          cx="120"
          cy="5"
          r="8"
          fill={color}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: delay + 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  );
}
