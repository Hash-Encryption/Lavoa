import React from 'react';

// Luxury Royal Crown & Monogram Emblem Logo for LAVOIA LOUNGE (لافوا لاونج)
export const LAvoisLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}> = ({ className = '', size = 'md', showStatus = true }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Royal Gold Emblem Icon */}
      <div className="relative shrink-0">
        <div
          className={`${iconSizes[size]} rounded-2xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#AA7C11] flex items-center justify-center text-[#070709] shadow-lg shadow-[#D4AF37]/20 border border-[#FFF3B0]/50 relative overflow-hidden`}
        >
          {/* Subtle metallic shine bar */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Royal Crown / Monogram SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 relative z-10"
          >
            <path d="M4 18h16" />
            <path d="M5 18L3 8l5 4 4-6 4 6 5-4-2 10H5z" fill="currentColor" fillOpacity="0.25" />
            <circle cx="12" cy="6" r="1.2" fill="currentColor" />
          </svg>
        </div>

        {/* Luminous Emerald Green Status Dot (Open & Connected) */}
        {showStatus && (
          <span className="absolute -bottom-0.5 -end-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] border-2 border-[#070709]" />
          </span>
        )}
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="text-white uppercase font-black tracking-wider text-[14px] sm:text-[15px]">
            LAVOIA LOUNGE
          </span>
          <span className="text-[#D4AF37] font-black text-xs font-arabic">لافوا لاونج</span>
        </div>
        <span className="text-[#D4AF37] font-bold tracking-widest text-[9px] uppercase">
          CAFE &bull; SHISHA &bull; ROASTERY
        </span>
      </div>
    </div>
  );
};

export const LavoiaLogo = LAvoisLogo;
export const GreenGroundsLogo = LAvoisLogo;

// Shisha Line-Art Watermark
export const ShishaWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path d="M74 20 L86 20 L84 35 L76 35 Z" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="80" cy="36" rx="28" ry="6" stroke="currentColor" strokeWidth="3" />
    <path d="M78 38 L78 105 L82 105 L82 38 Z" stroke="currentColor" strokeWidth="2.5" />
    <ellipse cx="80" cy="55" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="80" cy="80" rx="9" ry="3.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M72 105 C55 125 50 142 58 150 C66 155 94 155 102 150 C110 142 105 125 88 105 Z"
      stroke="currentColor"
      strokeWidth="3.5"
    />
    <path d="M68 110 C45 120 38 140 48 152" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Latte Art Rosette Watermark
export const LatteArtWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M80 15C50 35 25 65 30 100C34 128 55 145 80 148C105 145 126 128 130 100C135 65 110 35 80 15Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 40C62 55 48 78 52 102C55 120 68 132 80 135C92 132 105 120 108 102C112 78 98 55 80 40Z"
      stroke="currentColor"
      strokeWidth="3.5"
    />
    <path d="M80 20V140" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// Tea Leaf / Teacup Watermark
export const TeaWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M40 50L55 130C56 137 63 142 70 142H90C97 142 104 137 105 130L120 50H40Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M30 45H130" stroke="currentColor" strokeWidth="4" />
  </svg>
);

// Snack / Croissant Watermark
export const SnackWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M25 110C35 70 70 40 115 45C135 47 145 60 140 80C132 110 95 135 60 130C40 127 20 120 25 110Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
