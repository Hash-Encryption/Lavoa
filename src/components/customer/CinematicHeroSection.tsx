'use client';

import React, { useState, useRef } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { Crown, Sparkles, Gift, ArrowRight, Copy, Check, Flame } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const CinematicHeroSection: React.FC = () => {
  const { language, t } = useCoffee();
  const [copied, setCopied] = useState(false);

  // 3D Tilt Card physics
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('LAVOIA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="w-full space-y-6 pt-2 pb-4">
      {/* ---------------- 1. CINEMATIC HERO BRAND BANNER ---------------- */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#070709] border border-[#D4AF37]/35 shadow-[0_15px_50px_rgba(0,0,0,0.7)] p-6 sm:p-12 text-center select-none min-h-[320px] sm:min-h-[360px] flex flex-col justify-center items-center">
        {/* Background Real Luxury Hero Photography */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/images/hero/hero-lounge.jpg')` }}
        />
        {/* Dark Vignette & Gold Atmospheric Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/85 to-[#070709]/40 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-[#D4AF37]/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-16 right-10 w-64 h-64 bg-[#AA7C11]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1C24]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold tracking-wider uppercase shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {language === 'ar'
                ? 'لاونج وشيشة فاخرة ومشروبات مختصة'
                : 'Luxury Lounge, Shisha & Roastery'}
            </span>
          </span>
        </div>

        {/* Prominent LAVOIA LOUNGE Typography with Animated Gold Shimmer */}
        <div className="relative z-10 my-2 sm:my-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-gold-shimmer drop-shadow-[0_4px_20px_rgba(212,175,55,0.35)] font-sans">
            LAVOIA LOUNGE
          </h1>
          <p className="text-xs sm:text-sm font-black text-[#D4AF37] font-arabic tracking-normal mt-1 drop-shadow-md">
            لافوا لاونج — فخامة الشيشة والقهوة المختصة بأجواء ملكية
          </p>
        </div>

        {/* Main Title & Editorial Description */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-2 mt-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-relaxed drop-shadow-md">
            {language === 'ar'
              ? 'أجواء استثنائية، قهوة مختصة، وشيشة محضرة بإتقان ملكي'
              : 'Exceptional Ambiance, Artisan Coffee & Royal Shisha Craft'}
          </h2>
          <p className="text-xs sm:text-sm text-[#C5C7D0] leading-relaxed max-w-xl mx-auto">
            {language === 'ar'
              ? 'تذوق أندر محاصيل البن المحمصة محلياً، واستمتع بأرقى نكهات المعسل الأصلي والخلطات الحصرية في بيئة راقية مصممة لأدق تفاصيل راحتك.'
              : 'Savor masterfully roasted specialty beans and premium curated shisha blends in an opulent lounge atmosphere.'}
          </p>
        </div>
      </div>

      {/* ---------------- 2. 3D INTERACTIVE VIP CARD BANNER ---------------- */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171922] via-[#12141C] to-[#0A0B0E] p-5 sm:p-6 shadow-2xl border border-[#D4AF37]/45 transition-all duration-200"
      >
        {/* Holographic Specular Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/10 to-transparent pointer-events-none" />

        {/* Embossed Metallic Watermark Emblems */}
        <div className="absolute -end-8 -bottom-8 w-44 h-44 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Card Left / Right Details */}
          <div className="flex items-center gap-4">
            {/* VIP Gold Emblem Chip */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#AA7C11] flex flex-col items-center justify-center text-[#070709] shadow-lg shadow-[#D4AF37]/30 shrink-0 border border-[#FFF3B0]/60 relative">
              <Gift className="w-6 h-6 stroke-[2.3]" />
              <span className="text-[9px] font-black uppercase tracking-tighter">VIP 10%</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#070709] text-[10px] font-black uppercase tracking-wider">
                  {language === 'ar' ? 'عرض اللاونج الملكي' : 'Royal Lounge Perk'}
                </span>
                <span className="text-[#10B981] text-xs flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {language === 'ar' ? 'كاش باك 10% ونقاط ترحيبية' : '10% Cashback Active'}
                </span>
              </div>

              <h3 className="font-black text-sm sm:text-base text-white">
                {language === 'ar'
                  ? 'عرض لاونج لافوا — كاش باك 10% ونقاط VIP'
                  : "LAVOIA Lounge Offer — 10% Cashback & VIP Points"}
              </h3>

              <p className="text-xs text-[#9E9EA7] line-clamp-1 sm:line-clamp-none mt-0.5">
                {language === 'ar'
                  ? 'استخدم كود (LAVOIA10) عند الدفع واستمتع بخصم فوري ورصيد مكافآت يضاف لحسابك.'
                  : 'Apply code (LAVOIA10) to earn instant discounts and VIP hospitality rewards.'}
              </p>
            </div>
          </div>

          {/* Action Copy Promo Code Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCopyCode}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black text-xs shadow-md shadow-[#D4AF37]/25 hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === 'ar' ? 'تم نسخ الكود!' : 'Code Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ar'
                      ? 'نسخ كود الخصم (LAVOIA10)'
                      : 'Copy Code (LAVOIA10)'}
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHeroSection;
