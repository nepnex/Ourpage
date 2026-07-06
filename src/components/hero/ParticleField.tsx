import { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useWindowSize } from '@/hooks';

// Premium color palette for particles
const PARTICLE_COLORS = [
  { r: 18, g: 150, b: 219 },   // Primary Blue
  { r: 79, g: 70, b: 229 },    // Indigo
  { r: 16, g: 185, b: 129 },   // Emerald
  { r: 6, g: 182, b: 212 },    // Cyan
  { r: 139, g: 92, b: 246 },   // Violet
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: { r: number; g: number; b: number };
}

interface NetworkNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  color: { r: number; g: number; b: number };
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
  showNetwork?: boolean;
  networkNodes?: number;
  centerGlow?: boolean;
}

export function ParticleField({
  className = '',
  particleCount = 50,
  connectionDistance = 150,
  particleSpeed = 0.3,
  showNetwork = true,
  networkNodes = 8,
  centerGlow = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<NetworkNode[]>([]);
  const frameRef = useRef<number>();
  const reducedMotion = useReducedMotion();
  const { width, height } = useWindowSize();

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.15,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
    particlesRef.current = particles;
  }, [particleCount, particleSpeed, width, height]);

  const initNetworkNodes = useCallback(() => {
    const nodes: NetworkNode[] = [];
    const centerX = (width || 800) / 2;
    const centerY = (height || 600) / 2;
    const radius = Math.min(width || 800, height || 600) * 0.25;

    for (let i = 0; i < networkNodes; i++) {
      const angle = (i / networkNodes) * Math.PI * 2;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius: 4 + Math.random() * 3,
        pulsePhase: Math.random() * Math.PI * 2,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      });
    }
    nodesRef.current = nodes;
  }, [networkNodes, width, height]);

  useEffect(() => {
    initParticles();
    initNetworkNodes();
  }, [initParticles, initNetworkNodes]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Subtle center glow with gradient
      if (centerGlow) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Multi-color aurora glow
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 250
        );
        gradient.addColorStop(0, 'rgba(18, 150, 219, 0.08)');
        gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.05)');
        gradient.addColorStop(0.6, 'rgba(79, 70, 229, 0.03)');
        gradient.addColorStop(1, 'rgba(18, 150, 219, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw particles with their colors
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const { r, g, b } = particle.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw subtle connections between nearby particles
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            const avgR = Math.round((p1.color.r + p2.color.r) / 2);
            const avgG = Math.round((p1.color.g + p2.color.g) / 2);
            const avgB = Math.round((p1.color.b + p2.color.b) / 2);
            ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw network nodes with varied colors
      if (showNetwork) {
        nodesRef.current.forEach((node, i) => {
          const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
          const { r, g, b } = node.color;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 * pulse})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.08 * pulse})`;
          ctx.fill();

          // Connect nodes with gradient colors
          nodesRef.current.forEach((otherNode, j) => {
            if (i < j) {
              const lineProgress = (Math.sin(time * 1.5 + i + j) + 1) / 2;
              const avgR = Math.round((node.color.r + otherNode.color.r) / 2);
              const avgG = Math.round((node.color.g + otherNode.color.g) / 2);
              const avgB = Math.round((node.color.b + otherNode.color.b) / 2);

              ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${0.15 + lineProgress * 0.1})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();

              // Animated particle along the line
              const particleX = node.x + (otherNode.x - node.x) * lineProgress;
              const particleY = node.y + (otherNode.y - node.y) * lineProgress;

              ctx.beginPath();
              ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${avgR}, ${avgG}, ${avgB}, 0.7)`;
              ctx.fill();
            }
          });
        });
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reducedMotion, connectionDistance, centerGlow, showNetwork]);

  return (
    <canvas
      ref={canvasRef}
      width={width || 800}
      height={height || 600}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

interface NetworkDotProps {
  delay?: number;
  size?: number;
  className?: string;
}

export function NetworkDot({ delay = 0, size = 8, className = '' }: NetworkDotProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width: size, height: size }}
        className="rounded-full bg-[#1296DB] shadow-[0_0_20px_rgba(18,150,219,0.5)]"
      />
      <motion.div
        animate={reducedMotion ? {} : {
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width: size * 2, height: size * 2 }}
        className="absolute -top-1/4 -left-1/4 rounded-full bg-[#1296DB]/30"
      />
    </motion.div>
  );
}

interface NetworkLineProps {
  length?: number;
  angle?: number;
  delay?: number;
  className?: string;
}

export function NetworkLine({
  length = 100,
  angle = 0,
  delay = 0,
  className = '',
}: NetworkLineProps) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: length, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      style={{ transform: `rotate(${angle}deg)` }}
      className={`origin-left h-px bg-gradient-to-r from-[#1296DB] to-transparent ${className}`}
    />
  );
}

interface NetworkVisualizationProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
}

export function NetworkVisualization({
  className = '',
  nodeCount = 6,
  connectionDistance = 120,
}: NetworkVisualizationProps) {
  const reducedMotion = useReducedMotion();

  const nodes = useMemo(() => {
    const result = [];
    const centerX = 0;
    const centerY = 0;
    const radius = connectionDistance * 0.8;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
      result.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        delay: i * 0.1,
      });
    }
    return result;
  }, [nodeCount, connectionDistance]);

  return (
    <div className={`relative w-64 h-64 ${className}`}>
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{ x: node.x, y: node.y, scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2 + node.delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={reducedMotion ? {} : {
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            className="w-3 h-3 rounded-full bg-[#1296DB] shadow-[0_0_15px_rgba(18,150,219,0.6)]"
          />
        </motion.div>
      ))}

      {/* Center node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={reducedMotion ? {} : {
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-4 h-4 rounded-full bg-[#1296DB] shadow-[0_0_25px_rgba(18,150,219,0.8)]"
        />
      </motion.div>

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-128 -128 256 256">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1="0"
            y1="0"
            x2={node.x}
            y2={node.y}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + node.delay,
              ease: 'easeOut',
            }}
            stroke="#1296DB"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}
