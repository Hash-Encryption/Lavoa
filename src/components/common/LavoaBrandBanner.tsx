'use client';

import React from 'react';
import TextPressure from './TextPressure';
import { Sparkles, Crown } from 'lucide-react';

interface LavoaBrandBannerProps {
  className?: string;
  showSubtitle?: boolean;
}

export const LavoaBrandBanner: React.FC<LavoaBrandBannerProps> = ({
  className = '',
  showSubtitle = true,
}) => {
  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-[#070709] border border-[#D4AF37]/35 shadow-2xl p-5 sm:p-6 text-center select-none ${className}`}
    >
      {/* Background Hero Lounge Photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/images/hero/hero-lounge.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]/50 pointer-events-none" />

      {/* Background ambient gold radial glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Royal Pill Badge */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-2 sm:mb-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>لافوا لاونج &bull; LAVOIA LOUNGE</span>
        </span>
      </div>

      {/* Interactive Variable Font Kinetic Typography (React Bits TextPressure) */}
      <div className="relative z-10 w-full h-16 sm:h-24 md:h-28 flex items-center justify-center my-1 sm:my-2">
        <TextPressure
          text="LAVOIA LOUNGE"
          textColor="#D4AF37"
          strokeColor="#FFE082"
          flex={true}
          width={true}
          weight={true}
          italic={true}
          alpha={false}
          stroke={false}
          scale={false}
          minFontSize={28}
          className="tracking-wider"
        />
      </div>

      {/* Arabic Subtitle & Interactive Micro-Hint */}
      {showSubtitle && (
        <div className="relative z-10 space-y-1.5 mt-2">
          <h2 className="text-xs sm:text-sm font-black text-white font-arabic tracking-normal">
            لافوا كافيه ولاونج — فخامة الشيشة والقهوة المختصة بأجواء ملكية
          </h2>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#9E9EA7]">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>حرّك الماوس أو المس الشاشة لتشعر بحركة الحروف التفاعلية</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LavoaBrandBanner;
