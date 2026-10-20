'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Carbon Base Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. Top-Center Ambient Warm Gold Radial Light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#D4AF37]/12 via-[#AA7C11]/5 to-transparent rounded-full blur-[120px]" />

      {/* 3. Floating Gold Orb 1 (Top Right) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[15%] right-[5%] w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-[100px]"
      />

      {/* 4. Floating Gold Orb 2 (Middle Left) */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[45%] left-[2%] w-[420px] h-[420px] rounded-full bg-[#F3E5AB]/10 blur-[110px]"
      />

      {/* 5. Subtle Emerald Glow Orb (Lounge Fresh Atmosphere - Bottom Right) */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -25, 35, 0],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        className="absolute bottom-[20%] right-[10%] w-[380px] h-[380px] rounded-full bg-[#10B981]/10 blur-[120px]"
      />

      {/* 6. Subtle Smoke / Mist Particles Layer (Simulating Hookah Mist) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
    </div>
  );
};

export default AmbientBackground;
