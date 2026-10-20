'use client';

import React from 'react';
import { CategoryType } from '../../types';

interface DrinkRenderProps {
  id?: string;
  name?: string;
  category: CategoryType;
  className?: string;
}

export const DrinkRender: React.FC<DrinkRenderProps> = ({
  id = '',
  name = '',
  category,
  className = 'w-full h-full',
}) => {
  const lowerName = name.toLowerCase();

  // -------------------------------------------------------------
  // 1. LUXURY SHISHA / HOOKAH RENDER (شيشة فاخرة باللون الأسود والذهبي)
  // -------------------------------------------------------------
  if (category === 'shisha') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_14px_18px_rgba(212,175,55,0.25)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1.5"
        >
          {/* Ground Contact Shadow */}
          <ellipse cx="100" cy="226" rx="48" ry="7" fill="#000000" fillOpacity="0.45" />

          <defs>
            {/* Royal Gold Gradient */}
            <linearGradient id="goldStemGrad" x1="80" y1="30" x2="120" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5D77F" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA820A" />
              <stop offset="100%" stopColor="#DFB757" />
            </linearGradient>

            {/* Smoked Crystal Glass Base */}
            <linearGradient id="glassBaseGrad" x1="60" y1="140" x2="140" y2="225" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A2C33" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#15171C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0B0C0E" stopOpacity="0.98" />
            </linearGradient>

            {/* Glowing Coal Ember Gradient */}
            <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
              <stop stopColor="#FF6B35" />
              <stop offset="60%" stopColor="#D82914" />
              <stop offset="100%" stopColor="#660A00" />
            </radialGradient>
          </defs>

          {/* Wisps of Rising Smoke */}
          <path
            d="M96 22 Q92 12 98 4 T94 -4"
            stroke="#E5E7EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />
          <path
            d="M104 22 Q108 14 102 6 T106 -2"
            stroke="#E5E7EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />

          {/* Shisha Clay Head / Fruit Bowl */}
          <path
            d="M86 28 L90 42 L110 42 L114 28 Q100 24 86 28 Z"
            fill="#8B5A2B"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />

          {/* Charcoal Tray (صحن الجمر الذهبي) */}
          <ellipse cx="100" cy="44" rx="34" ry="6" fill="url(#goldStemGrad)" stroke="#FFE082" strokeWidth="1" />
          <ellipse cx="100" cy="43" rx="28" ry="4" fill="#1C1D21" />

          {/* Glowing Natural Coals (جمر متوهج طبيعي) */}
          <rect x="91" y="24" width="8" height="7" rx="1.5" fill="url(#emberGlow)" />
          <rect x="101" y="25" width="8" height="7" rx="1.5" fill="url(#emberGlow)" />
          <circle cx="95" cy="23" r="2" fill="#FFAA00" fillOpacity="0.8" />
          <circle cx="105" cy="24" r="2" fill="#FFAA00" fillOpacity="0.8" />

          {/* Metallic Gold Stem (عامود الشيشة الذهبي المنحوت) */}
          <path
            d="M96 46 L96 142 L104 142 L104 46 Z"
            fill="url(#goldStemGrad)"
          />

          {/* Carved Gold Rings & Purge Valve on Stem */}
          <ellipse cx="100" cy="62" rx="9" ry="3" fill="url(#goldStemGrad)" stroke="#FFE082" strokeWidth="0.8" />
          <ellipse cx="100" cy="85" rx="11" ry="4" fill="url(#goldStemGrad)" stroke="#FFE082" strokeWidth="0.8" />
          <ellipse cx="100" cy="115" rx="9" ry="3" fill="url(#goldStemGrad)" stroke="#FFE082" strokeWidth="0.8" />
          <ellipse cx="100" cy="140" rx="14" ry="4" fill="url(#goldStemGrad)" />

          {/* Hose Port & Purge Valve */}
          <circle cx="86" cy="142" r="4.5" fill="url(#goldStemGrad)" />
          <circle cx="114" cy="142" r="3.5" fill="url(#goldStemGrad)" />

          {/* Crystal Smoked Glass Base (قاعدة الشيشة الزجاجية الفاخرة) */}
          <path
            d="M87 142 C72 175 62 200 66 215 C69 224 82 225 100 225 C118 225 131 224 134 215 C138 200 128 175 113 142 Z"
            fill="url(#glassBaseGrad)"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Internal Water Level & Bubbles */}
          <ellipse cx="100" cy="205" rx="28" ry="6" fill="#D4AF37" fillOpacity="0.15" />
          <circle cx="94" cy="200" r="2.5" fill="#FFE082" fillOpacity="0.3" />
          <circle cx="106" cy="204" r="1.8" fill="#FFE082" fillOpacity="0.3" />

          {/* Glass Specular Glare / Reflection */}
          <path
            d="M74 185 C73 198 77 212 85 218"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
          <path
            d="M126 185 C127 198 123 212 115 218"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* Luxury Silicone Hose with Gold Handle */}
          <path
            d="M84 144 C50 155 42 195 56 220 C62 230 74 230 80 226"
            stroke="#121316"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M84 144 C50 155 42 195 56 220 C62 230 74 230 80 226"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* Gold Slim Hose Handle Tip */}
          <path
            d="M80 226 L94 220"
            stroke="url(#goldStemGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. ICED COFFEE & COLD BREWS (مشروبات باردة فاخرة)
  // -------------------------------------------------------------
  if (
    lowerName.includes('cold brew') ||
    lowerName.includes('iced') ||
    lowerName.includes('spanish') ||
    lowerName.includes('latte') ||
    lowerName.includes('pistachio')
  ) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(212,175,55,0.2)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
        >
          <ellipse cx="100" cy="224" rx="46" ry="8" fill="#000000" fillOpacity="0.4" />

          <defs>
            <linearGradient id="icedDrinkGrad" x1="100" y1="40" x2="100" y2="215" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#251206" />
              <stop offset="35%" stopColor="#3F200E" />
              <stop offset="65%" stopColor="#9C6436" />
              <stop offset="100%" stopColor="#EBD7BE" />
            </linearGradient>
            <linearGradient id="iceCube" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#C9D6DF" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Cup Silhouette */}
          <path
            d="M62 38 L72 210 Q73 218 82 218 L118 218 Q127 218 128 210 L138 38 Z"
            fill="url(#icedDrinkGrad)"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Floating Ice Cubes */}
          <rect x="80" y="52" width="26" height="24" rx="5" fill="url(#iceCube)" transform="rotate(12 80 52)" />
          <rect x="96" y="74" width="24" height="22" rx="4" fill="url(#iceCube)" transform="rotate(-18 96 74)" />
          <rect x="76" y="98" width="22" height="20" rx="4" fill="url(#iceCube)" transform="rotate(8 76 98)" />

          {/* Creamy Milk Cascades */}
          <path d="M72 135 Q88 120 102 145 T128 138" stroke="#FFF7ED" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
          <path d="M74 158 Q95 142 110 162 T126 154" stroke="#FEEBD0" strokeWidth="4" strokeLinecap="round" opacity="0.65" />

          {/* Glass Highlights */}
          <path d="M66 45 L75 205" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" />
          <ellipse cx="100" cy="38" rx="38" ry="7" fill="#FFFFFF" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. HOT SPECIALTY COFFEE (قهوة ساخنة بفنجان ملكي أسود ومذهب)
  // -------------------------------------------------------------
  if (category === 'coffee') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(212,175,55,0.2)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
        >
          <ellipse cx="100" cy="178" rx="60" ry="8" fill="#000000" fillOpacity="0.4" />

          {/* Matte Black Saucer with Gold Rim */}
          <ellipse cx="100" cy="168" rx="64" ry="14" fill="#181A20" stroke="#D4AF37" strokeWidth="1.5" />
          <ellipse cx="100" cy="167" rx="54" ry="10" fill="#101114" />

          {/* Gold Cup Handle */}
          <path d="M136 104 C158 104 158 138 134 142" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" />

          {/* Matte Black Cup Body */}
          <path
            d="M58 92 C58 148 76 160 100 160 C124 160 142 148 142 92 Z"
            fill="#181A20"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />

          {/* Rich Espresso Surface */}
          <ellipse cx="100" cy="92" rx="42" ry="16" fill="#4B2710" />
          <ellipse cx="100" cy="92" rx="40" ry="14.5" fill="#6B3919" />

          {/* Golden Latte Art Motif */}
          <g transform="translate(100, 92) scale(0.85)">
            <ellipse cx="0" cy="0" rx="26" ry="9" fill="#FBF3DE" />
            <ellipse cx="0" cy="-2" rx="20" ry="7" fill="#6B3919" fillOpacity="0.25" />
            <ellipse cx="0" cy="-3" rx="15" ry="5.5" fill="#FFFBF6" />
            <ellipse cx="0" cy="-5" rx="9" ry="3.5" fill="#FFFBF6" />
            <circle cx="0" cy="-7" r="2.5" fill="#FFFBF6" />
            <path d="M0 -9 L0 7" stroke="#4B2710" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Gold Rim Edge */}
          <ellipse cx="100" cy="92" rx="42" ry="16" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. BEVERAGES & MOROCCAN TEA (شاي مغربي وعصائر)
  // -------------------------------------------------------------
  if (category === 'tea') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(212,175,55,0.22)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
        >
          <ellipse cx="100" cy="178" rx="58" ry="8" fill="#000000" fillOpacity="0.4" />

          {/* Moroccan Filigree Saucer */}
          <ellipse cx="100" cy="168" rx="62" ry="13" fill="#181A20" stroke="#D4AF37" strokeWidth="1.5" />

          {/* Tea Body with Glowing Amber Liquid */}
          <path
            d="M62 86 L70 162 Q72 170 82 170 L118 170 Q128 170 130 162 L138 86 Z"
            fill="#B4721D"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />

          {/* Gold Traditional Arabesque Band */}
          <rect x="66" y="98" width="68" height="12" fill="#D4AF37" rx="2" />
          <rect x="68" y="101" width="64" height="6" fill="#181A20" />

          {/* Fresh Mint Leaves Floating */}
          <g transform="translate(100, 92)">
            <ellipse cx="-4" cy="-1" rx="9" ry="4.5" fill="#3D8B37" transform="rotate(-20)" />
            <ellipse cx="5" cy="1" rx="8" ry="4" fill="#4CAF50" transform="rotate(25)" />
            <path d="M-8 -2 L6 2" stroke="#1B5E20" strokeWidth="0.8" />
          </g>

          {/* Glass Highlights */}
          <path d="M68 94 L75 160" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
          <ellipse cx="100" cy="86" rx="38" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. DESSERTS & CHEESECAKE (حلويات اللاونج الفاخرة)
  // -------------------------------------------------------------
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(212,175,55,0.2)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
      >
        <ellipse cx="100" cy="174" rx="58" ry="8" fill="#000000" fillOpacity="0.4" />

        {/* Black Ceramic Plate with Gold Border */}
        <ellipse cx="100" cy="156" rx="66" ry="20" fill="#181A20" stroke="#D4AF37" strokeWidth="1.5" />
        <ellipse cx="100" cy="155" rx="54" ry="15" fill="#121316" />

        {/* San Sebastian Basque Cheesecake Wedge */}
        <g transform="translate(100, 142)">
          {/* Molten Creamy Filling */}
          <path
            d="M-30 0 L0 -24 L30 0 L15 12 L-15 12 Z"
            fill="#FFF1D6"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          {/* Burned Caramelized Top Crust */}
          <path
            d="M-30 0 L0 -24 L30 0 C20 -4 -20 -4 -30 0 Z"
            fill="#3B1E08"
          />
          {/* Belgian Chocolate Drizzle */}
          <path
            d="M-18 2 Q-5 -8 8 -2 Q18 4 24 -1"
            stroke="#2B1405"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
