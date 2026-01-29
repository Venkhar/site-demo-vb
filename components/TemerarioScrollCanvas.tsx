'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { motion } from 'framer-motion';

interface TemerarioScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function TemerarioScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: TemerarioScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.src = `${imageFolderPath}${index + 1}.jpg`;
        images[index] = img;
      });
    };

    // Load images in batches for better performance
    const loadAllImages = async () => {
      const batchSize = 20;
      for (let i = 0; i < totalFrames; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
      imagesRef.current = images;
      setIsLoaded(true);
    };

    loadAllImages();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [totalFrames, imageFolderPath]);

  // Draw frame on canvas with high-DPI support
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete) return;

    // High-DPI scaling
    const dpr = window.devicePixelRatio || 2;
    const rect = canvas.getBoundingClientRect();

    // Only resize if dimensions changed
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Calculate aspect ratios for object-fit: contain
    const canvasAspect = rect.width / rect.height;
    const imageAspect = img.width / img.height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imageAspect > canvasAspect) {
      // Image is wider - fit to width
      drawWidth = rect.width;
      drawHeight = rect.width / imageAspect;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      // Image is taller - fit to height
      drawHeight = rect.height;
      drawWidth = rect.height * imageAspect;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    // Clear and draw
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isLoaded) return;

    const animate = () => {
      drawFrame(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoaded, drawFrame]);

  // Listen to scroll progress and update frame
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * (totalFrames - 1)),
      totalFrames - 1
    );
    currentFrameRef.current = Math.max(0, frameIndex);
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, drawFrame]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Loading Screen */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-lambo-black"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo */}
            <h1 className="font-orbitron text-4xl md:text-6xl font-black text-lambo-purple mb-8 tracking-widest animate-pulse-glow">
              LAMBORGHINI
            </h1>

            {/* Progress bar container */}
            <div className="w-64 md:w-80 h-1 bg-carbon-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-lambo-purple to-lambo-teal"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <p className="font-rajdhani text-lg md:text-xl text-white/60 mt-4 tracking-wider">
              Loading Experience... {loadingProgress}%
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          willChange: 'transform',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Watermark Cover - Bottom gradient band */}
      {isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          {/* Horizontal gradient band - transparent left, opaque right */}
          <div
            className="w-full h-16 sm:h-20 md:h-24 lg:h-28"
            style={{
              background: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.9) 80%, rgba(10,10,10,1) 100%)',
            }}
          >
            {/* HUD-style content on the right */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-6 text-right">
              {/* Decorative line */}
              <div className="flex items-center justify-end gap-2 mb-1">
                <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-lambo-purple/60" />
                <div className="w-1.5 h-1.5 bg-lambo-teal/80" />
              </div>

              {/* Brand text */}
              <div className="font-orbitron text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-lambo-purple/90 tracking-widest">
                TEMERARIO
              </div>

              {/* Sub text */}
              <div className="font-rajdhani text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-white/50 tracking-wider">
                920 CV HPEV
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
