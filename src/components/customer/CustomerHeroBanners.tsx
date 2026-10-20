'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { CategoryFilter } from '../../types';
import {
  ShishaWatermark,
  LatteArtWatermark,
  TeaWatermark,
  SnackWatermark,
} from '../common/BrandIllustrations';
import { Flame, Coffee, Sparkles, Utensils, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomerHeroBanners: React.FC = () => {
  const { activeCategory, setActiveCategory, setSubCategoryFilter, t, language } = useCoffee();

  const categories: {
    id: CategoryFilter;
    labelAr: string;
    labelEn: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    itemsCount: string;
    watermark: React.ReactNode;
    hasSteam?: boolean;
    bgImage?: string;
  }[] = [
    {
      id: 'shisha',
      labelAr: 'شيشة فاخرة',
      labelEn: 'Luxury Shisha',
      icon: <Flame className="w-5 h-5 text-[#D4AF37]" />,
      color: '#14161F',
      borderColor: '#D4AF37',
      itemsCount: '8 عناصر',
      watermark: <ShishaWatermark className="w-44 h-44 text-[#D4AF37] opacity-25" />,
      hasSteam: true,
      bgImage: '/images/products/shisha-luxury.jpg',
    },
    {
      id: 'coffee',
      labelAr: 'قهوة مختصة',
      labelEn: 'Specialty Coffee',
      icon: <Coffee className="w-5 h-5 text-[#D4AF37]" />,
      color: '#161822',
      borderColor: '#AA7C11',
      itemsCount: '6 عناصر',
      watermark: <LatteArtWatermark className="w-44 h-44 text-[#D4AF37] opacity-20" />,
      hasSteam: true,
      bgImage: '/images/products/coffee-luxury.jpg',
    },
    {
      id: 'tea',
      labelAr: 'مشروبات وشاي',
      labelEn: 'Tea & Mojitos',
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
      color: '#12161A',
      borderColor: '#263D2E',
      itemsCount: '3 عناصر',
      watermark: <TeaWatermark className="w-44 h-44 text-[#D4AF37] opacity-20" />,
      bgImage: '/images/products/drinks-luxury.jpg',
    },
    {
      id: 'snack',
      labelAr: 'حلويات وسناك',
      labelEn: 'Desserts & Bites',
      icon: <Utensils className="w-5 h-5 text-[#D4AF37]" />,
      color: '#181514',
      borderColor: '#4A341E',
      itemsCount: '3 عناصر',
      watermark: <SnackWatermark className="w-44 h-44 text-[#D4AF37] opacity-20" />,
      bgImage: '/images/products/dessert-luxury.jpg',
    },
  ];

  const handleSelectCategory = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setSubCategoryFilter('All');
  };

  return (
    <div className="w-full space-y-4">
      {/* ---------------- 1. MOBILE STICKY HORIZONTAL CATEGORY PILLS ---------------- */}
      <div className="lg:hidden sticky top-[53px] sm:top-[57px] z-30 bg-[#070709]/95 backdrop-blur-xl py-2 -mx-3.5 px-3.5 border-b border-[#D4AF37]/20 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory">
          {/* "All" Category Pill */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleSelectCategory('all')}
            className={`snap-start relative px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black shadow-md shadow-[#D4AF37]/25'
                : 'bg-[#12141A] text-[#9E9EA7] border border-[#222530] hover:border-[#D4AF37]/40'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t('all')}</span>
          </motion.button>

          {/* Individual Category Pills */}
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSelectCategory(cat.id)}
                className={`snap-start relative px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black shadow-md shadow-[#D4AF37]/25'
                    : 'bg-[#12141A] text-[#9E9EA7] border border-[#222530] hover:border-[#D4AF37]/40'
                }`}
              >
                {cat.icon}
                <span>{language === 'ar' ? cat.labelAr : cat.labelEn}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ---------------- 2. DESKTOP 4-CARD CATEGORY SHOWCASE ---------------- */}
      <div className="hidden lg:grid grid-cols-4 gap-4 w-full">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectCategory(cat.id)}
              className={`relative overflow-hidden rounded-3xl p-5 text-white cursor-pointer transition-all border-2 shadow-xl group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1E212E] to-[#12141A] border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.2)]'
                  : 'bg-[#101217] border-[#1E2028] hover:border-[#D4AF37]/60'
              }`}
            >
              {/* Background Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />

              {/* Subtle Atmospheric Category Photography Backdrop */}
              {cat.bgImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  style={{ backgroundImage: `url('${cat.bgImage}')` }}
                />
              )}

              {/* Watermark Illustration */}
              <div className="absolute -end-6 -bottom-6 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110">
                {cat.watermark}
              </div>

              {/* Steam / Smoke rising particle effect for Shisha & Coffee */}
              {cat.hasSteam && (
                <div className="absolute top-8 end-10 pointer-events-none">
                  <div className="w-2.5 h-8 bg-gradient-to-t from-white/25 to-transparent rounded-full blur-[2px] animate-smoke" />
                </div>
              )}

              {/* Top Badge: Available Now with Emerald Glow Dot */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>{language === 'ar' ? 'متوفر الآن' : 'Available'}</span>
                </span>

                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                )}
              </div>

              {/* Info Bottom */}
              <div className="relative z-10 mt-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#181A22] border border-[#23262F] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                    {language === 'ar' ? cat.labelAr : cat.labelEn}
                  </h3>
                </div>
                <p className="text-xs text-[#9E9EA7] font-medium ps-9">
                  {cat.itemsCount}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerHeroBanners;
