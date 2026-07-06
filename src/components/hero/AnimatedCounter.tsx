import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [value, setValue] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setValue(to);
      return;
    }

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay, reducedMotion, to]);

  useEffect(() => {
    if (!hasStarted || reducedMotion) return;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * easeOut;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [hasStarted, from, to, duration, reducedMotion]);

  const formattedValue = value.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

interface CounterSequenceProps {
  steps: Array<{ value: number; label?: string }>;
  duration?: number;
  stepDelay?: number;
  initialDelay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CounterSequence({
  steps,
  duration = 0.8,
  stepDelay = 0.5,
  initialDelay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CounterSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCurrentStep(steps.length - 1);
      return;
    }

    const intervals: ReturnType<typeof setTimeout>[] = [];
    let totalTime = initialDelay * 1000;

    steps.forEach((_, index) => {
      if (index === 0) {
        totalTime += stepDelay * 1000;
        return;
      }

      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, totalTime);

      intervals.push(timeout);
      totalTime += stepDelay * 1000;
    });

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [steps, stepDelay, initialDelay, reducedMotion]);

  const current = steps[currentStep] || steps[steps.length - 1];
  const previous = currentStep > 0 ? steps[currentStep - 1].value : 0;

  return (
    <AnimatedCounter
      from={previous}
      to={current.value}
      duration={duration}
      suffix={suffix}
      prefix={prefix}
      decimals={decimals}
      className={className}
    />
  );
}
