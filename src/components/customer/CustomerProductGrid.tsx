'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { ProductCard3D } from './ProductCard3D';
import { Plus, Star, Heart, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrinkRender } from '../common/DrinkRender';

export const CustomerProductGrid: React.FC = () => {
  const {
    filteredProducts,
    activeCategory,
    subCategoryFilter,
    setSubCategoryFilter,
    setCustomizingProduct,
    addToCart,
    getItemCountInCart,
    formatCurrency,
    t,
    language,
    isFavorite,
    toggleFavorite,
  } = useCoffee();

  // Subcategory filters map
  const subFiltersMap: Record<string, { key: string; label: string }[]> = {
    shisha: [
      { key: 'All', label: t('all') },
      { key: 'Classic', label: language === 'ar' ? 'كلاسيك فاخر' : 'Classic' },
      { key: 'Signature', label: language === 'ar' ? 'خلطات لافوا' : 'Signature' },
      { key: 'IceFlavors', label: language === 'ar' ? 'آيس منعش' : 'Ice Fresh' },
    ],
    coffee: [
      { key: 'All', label: t('all') },
      { key: 'Signature', label: language === 'ar' ? 'مختصة ومقطرة' : 'Specialty' },
      { key: 'Manual', label: language === 'ar' ? 'اسبريسو كلاسيك' : 'Espresso' },
      { key: 'Creamilk', label: language === 'ar' ? 'لاتيه وميلك' : 'Creamilk' },
    ],
    tea: [
      { key: 'All', label: t('all') },
      { key: 'Signature', label: language === 'ar' ? 'شاي ملكي' : 'Royal Tea' },
      { key: 'Herbal', label: language === 'ar' ? 'موهيتو وأعشاب' : 'Mojito & Herbal' },
    ],
    snack: [
      { key: 'All', label: t('all') },
      { key: 'Special', label: language === 'ar' ? 'حلويات شرقية' : 'Desserts' },
      { key: 'Snacks', label: language === 'ar' ? 'مخبوزات وكيك' : 'Bakery' },
    ],
    all: [
      { key: 'All', label: t('all') },
      { key: 'Classic', label: language === 'ar' ? 'كلاسيك' : 'Classic' },
      { key: 'Signature', label: language === 'ar' ? 'خلطات حصرية' : 'Signature' },
      { key: 'Special', label: language === 'ar' ? 'الأكثر طلباً' : 'Bestsellers' },
    ],
  };

  const activeSubFilters = subFiltersMap[activeCategory] || subFiltersMap.all;

  return (
    <div className="w-full space-y-5">
      {/* ---------------- SUBCATEGORY FILTER PILLS ---------------- */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {activeSubFilters.map((sub) => {
            const isSelected = subCategoryFilter.toLowerCase() === sub.key.toLowerCase();
            return (
              <motion.button
                key={sub.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubCategoryFilter(sub.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black shadow-sm shadow-[#D4AF37]/25'
                    : 'bg-[#12141A] text-[#9E9EA7] border border-[#222530] hover:border-[#D4AF37]/40'
                }`}
              >
                {sub.label}
              </motion.button>
            );
          })}
        </div>

        <span className="text-xs text-[#9E9EA7] font-medium hidden sm:inline shrink-0">
          {filteredProducts.length} {t('itemsTotal')}
        </span>
      </div>

      {/* ---------------- 1. MOBILE EXPERIENCE (< 1024px) ---------------- */}
      <div className="lg:hidden space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const favorited = isFavorite(product.id);
            const inCartCount = getItemCountInCart(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setCustomizingProduct(product)}
                className="bg-[#0E1015] rounded-3xl p-3.5 border border-[#1E2028] active:border-[#D4AF37]/50 shadow-md transition-all flex items-center justify-between gap-3 relative cursor-pointer"
              >
                {/* Product Visual (Studio Photography / Render) */}
                <div className="relative w-24 h-24 rounded-2xl bg-[#14161E] border border-[#222530] flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent pointer-events-none" />
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.nameAr : product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 animate-float">
                      <DrinkRender
                        id={product.id}
                        name={product.name}
                        category={product.category}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-[#D4AF37]" />
                      <span className="font-mono">{product.rating}</span>
                    </span>
                    {product.category === 'shisha' && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-bold flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        <span>{language === 'ar' ? 'شيشة' : 'Shisha'}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white truncate">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h4>

                  <p className="text-[11px] text-[#9E9EA7] line-clamp-1 mt-0.5">
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-sm font-black text-gold-shimmer font-mono">
                      {formatCurrency(product.price)}
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setCustomizingProduct(product)}
                        className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#151722] border border-[#242633] text-[11px] font-bold text-white transition-colors"
                      >
                        {language === 'ar' ? '+ تخصيص' : '+ Custom'}
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => addToCart(product)}
                        className="relative min-w-[36px] min-h-[36px] rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black flex items-center justify-center shadow-xs"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        {inCartCount > 0 && (
                          <span className="absolute -top-1 -end-1 w-4 h-4 bg-[#EF4444] text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-[#070709]">
                            {inCartCount}
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ---------------- 2. DESKTOP EXPERIENCE (>= 1024px) ---------------- */}
      <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ProductCard3D product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center space-y-2">
          <p className="text-sm font-bold text-[#9E9EA7]">
            {language === 'ar'
              ? 'لا توجد منتجات مطابقة في هذا التصنيف حالياً.'
              : 'No matching products found in this category.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerProductGrid;
