'use client';

import React, { useState } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { X, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PromoBanner: React.FC = () => {
  const { t, language } = useCoffee();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        className="w-full relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#181A22] via-[#14151B] to-[#0E0F14] text-white p-4 sm:p-5 shadow-lg border border-[#D4AF37]/40"
      >
        {/* Decorative Golden Ambient Glows */}
        <div className="absolute -end-10 -bottom-10 w-36 h-36 rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none" />
        <div className="absolute start-1/3 -top-8 w-24 h-24 rounded-full bg-[#FFE082]/10 blur-lg pointer-events-none" />

        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 end-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9E9EA7] hover:text-white transition-colors z-10"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#A68222] flex items-center justify-center shrink-0 shadow-md shadow-[#D4AF37]/20 text-[#0A0B0E]">
              <Gift className="w-6 h-6 animate-pulse font-bold" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0A0B0E] text-[10px] font-black uppercase tracking-wider">
                  L&apos;Avois VIP 10%
                </span>
                <span className="text-[#D4AF37] text-xs flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  {language === 'ar' ? 'عرض اللاونج الملكي' : 'Royal Offer'}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white mt-0.5">
                {t('promoTitle')}
              </h3>
              <p className="text-xs text-[#9E9EA7] line-clamp-1 sm:line-clamp-none mt-0.5">
                {t('promoSubtitle')}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              navigator.clipboard?.writeText('https://lavois.lounge/vip/LAVOIS10');
              alert(
                language === 'ar'
                  ? 'تم نسخ كود خصم لافوا (LAVOIS10) ورابط العضوية!'
                  : "L'Avois VIP Promo Code copied!"
              );
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0A0B0E] font-black text-xs shadow-md shadow-[#D4AF37]/20 hover:brightness-105 transition-all shrink-0"
          >
            <span>{t('promoCta')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
