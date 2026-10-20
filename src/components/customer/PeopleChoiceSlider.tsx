'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { DrinkRender } from '../common/DrinkRender';
import { Plus, Star, Heart, Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PeopleChoiceSlider: React.FC = () => {
  const {
    peoplesChoice,
    formatCurrency,
    addToCart,
    setCustomizingProduct,
    isFavorite,
    toggleFavorite,
    language,
    t,
  } = useCoffee();

  return (
    <div className="w-full space-y-3 py-1">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span>{language === 'ar' ? 'الأكثر طلباً وتفضيلاً في اللاونج' : "Lounge Bestsellers"}</span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          </h2>
          <p className="text-xs text-[#9E9EA7]">
            {language === 'ar'
              ? 'أعلى النكهات والمشروبات طلباً من روّاد لاونج لافوا'
              : 'Most requested flavors and specialty beverages'}
          </p>
        </div>

        <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full">
          {peoplesChoice.length} {language === 'ar' ? 'مختارات ملكية' : 'Selected'}
        </span>
      </div>

      {/* Horizontal Slider with peek effect for mobile */}
      <div className="w-full overflow-x-auto scrollbar-none -mx-3.5 px-3.5 py-1.5 snap-x snap-mandatory">
        <div className="flex items-center gap-3 sm:gap-4 min-w-max">
          {peoplesChoice.map((product) => {
            const favorited = isFavorite(product.id);

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setCustomizingProduct(product)}
                className="w-52 sm:w-68 snap-start bg-[#0E1015] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#1E2028] hover:border-[#D4AF37]/50 shadow-xl transition-all flex flex-col justify-between relative group cursor-pointer"
              >
                {/* Top Header */}
                <div className="flex items-center justify-between mb-1 z-10">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141620] border border-[#222530] text-xs font-bold text-white shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-mono">{product.rating}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {product.category === 'shisha' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold flex items-center gap-1 border border-[#D4AF37]/30">
                        <Flame className="w-3 h-3" />
                        <span>{language === 'ar' ? 'شيشة' : 'Shisha'}</span>
                      </span>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`w-8 h-8 rounded-full border border-[#23262F] flex items-center justify-center transition-colors ${
                        favorited
                          ? 'bg-[#EF4444] text-white border-transparent shadow-xs'
                          : 'bg-[#181A22] text-[#9E9EA7] hover:text-[#EF4444]'
                      }`}
                      aria-label="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                </div>

                {/* Studio Photography / Artwork */}
                <div className="w-full h-36 flex items-center justify-center my-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 blur-xl group-hover:bg-[#D4AF37]/25 transition-colors" />
                  </div>
                  {product.image ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/50 shadow-md transition-all">
                      <img
                        src={product.image}
                        alt={language === 'ar' ? product.nameAr : product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative w-32 h-32 animate-float">
                      <DrinkRender
                        id={product.id}
                        name={product.name}
                        category={product.category}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {/* Info & Bottom Actions */}
                <div className="pt-2 border-t border-[#1E2028]">
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors truncate">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h3>
                  <p className="text-[11px] text-[#9E9EA7] line-clamp-1 mt-0.5">
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-black text-gold-shimmer font-mono">
                      {formatCurrency(product.price)}
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setCustomizingProduct(product)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#141620] hover:bg-[#1E202B] border border-[#222530] text-[11px] font-bold text-white transition-colors"
                      >
                        {language === 'ar' ? '+ تخصيص' : '+ Custom'}
                      </button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black flex items-center justify-center shadow-xs"
                        aria-label="Add to cart"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PeopleChoiceSlider;
