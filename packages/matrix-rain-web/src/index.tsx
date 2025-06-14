import React, { useEffect, useRef } from 'react';
import { createMatrixGenerator } from 'matrix-core';

export interface MatrixRainOverlayProps {
  isLoading: boolean;
  color?: string;
  fadeDuration?: number;
}

export const MatrixRainOverlay: React.FC<MatrixRainOverlayProps> = ({
  isLoading,
  color = '#00ff00',
  fadeDuration = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame: number;
    let gen = createMatrixGenerator({ columns: Math.floor(canvas.width / 10), rows: Math.floor(canvas.height / 10) });

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gen = createMatrixGenerator({ columns: Math.floor(canvas.width / 10), rows: Math.floor(canvas.height / 10) });
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!isLoading) return;
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      const frame = gen.nextFrame();
      frame.cells.forEach(c => {
        ctx.globalAlpha = c.opacity;
        ctx.fillText(c.char, c.x * 10, c.y * 10);
      });
      animationFrame = requestAnimationFrame(draw);
    }
    if (!reduce && isLoading) {
      draw();
    }
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [isLoading, color]);

  const style: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'black',
    pointerEvents: 'none',
    opacity: isLoading ? 1 : 0,
    transition: `opacity ${fadeDuration}ms ease`,
  };
  return <canvas ref={canvasRef} style={style} />;
};
