'use client';

import React, { useState } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { ProductCard3D } from './ProductCard3D';
import { Plus, Star, Heart, Flame, Sparkles, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrinkRender } from '../common/DrinkRender';

export const CustomerProductGrid: React.FC = () => {
  const [mobileView, setMobileView] = useState<'grid' | 'list'>('grid');
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
      {/* ---------------- SUBCATEGORY FILTER PILLS & VIEW TOGGLE ---------------- */}
      <div className="flex items-center justify-between gap-2 pb-1">
        {/* Scrollable Subcategory Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none min-w-0 flex-1 py-1">
          {activeSubFilters.map((sub) => {
            const isSelected = subCategoryFilter.toLowerCase() === sub.key.toLowerCase();
            return (
              <motion.button
                key={sub.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubCategoryFilter(sub.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
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

        {/* Mobile Grid/List View Toggle */}
        <div className="lg:hidden flex items-center bg-[#12141A] p-0.5 rounded-xl border border-[#222530] shrink-0">
          <button
            onClick={() => setMobileView('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              mobileView === 'grid'
                ? 'bg-[#D4AF37] text-[#070709] shadow-xs'
                : 'text-[#9E9EA7] hover:text-white'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileView('list')}
            className={`p-1.5 rounded-lg transition-all ${
              mobileView === 'list'
                ? 'bg-[#D4AF37] text-[#070709] shadow-xs'
                : 'text-[#9E9EA7] hover:text-white'
            }`}
            aria-label="List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop Total Items Count */}
        <span className="text-xs text-[#9E9EA7] font-medium hidden lg:inline shrink-0">
          {filteredProducts.length} {t('itemsTotal')}
        </span>
      </div>

      {/* ---------------- 1. MOBILE EXPERIENCE (< 1024px) ---------------- */}
      <div className="lg:hidden">
        <AnimatePresence mode="popLayout">
          {mobileView === 'grid' ? (
            /* 2-Column Responsive Grid View for Mobile */
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {filteredProducts.map((product) => {
                const favorited = isFavorite(product.id);
                const inCartCount = getItemCountInCart(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setCustomizingProduct(product)}
                    className="bg-[#0E1015] rounded-2xl p-2.5 border border-[#1E2028] active:border-[#D4AF37]/60 shadow-lg flex flex-col justify-between relative cursor-pointer group"
                  >
                    {/* Top Image with Badges */}
                    <div className="relative w-full h-28 sm:h-32 rounded-xl bg-[#14161E] border border-[#222530] overflow-hidden mb-2">
                      <img
                        src={product.image || '/images/products/coffee-luxury.jpg'}
                        alt={language === 'ar' ? product.nameAr : product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015]/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-1.5 start-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#070709]/85 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                        <Star className="w-2.5 h-2.5 fill-[#D4AF37]" />
                        <span className="font-mono">{product.rating}</span>
                      </div>

                      {/* Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-[#070709]/80 backdrop-blur-md flex items-center justify-center text-[#9E9EA7]"
                        aria-label="Favorite"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            favorited ? 'fill-[#EF4444] text-[#EF4444]' : ''
                          }`}
                        />
                      </button>

                      {/* Category Label */}
                      {product.category === 'shisha' && (
                        <div className="absolute bottom-1.5 start-1.5 px-1.5 py-0.5 rounded-md bg-[#070709]/85 text-[#D4AF37] text-[8px] font-bold flex items-center gap-0.5 border border-[#D4AF37]/30">
                          <Flame className="w-2 h-2" />
                          <span>{language === 'ar' ? 'شيشة' : 'Shisha'}</span>
                        </div>
                      )}
                    </div>

                    {/* Product Name & Short Description */}
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#D4AF37] transition-colors truncate">
                        {language === 'ar' ? product.nameAr : product.name}
                      </h4>
                      <p className="text-[10px] text-[#9E9EA7] line-clamp-1 mt-0.5 leading-tight">
                        {language === 'ar' ? product.descriptionAr : product.description}
                      </p>
                    </div>

                    {/* Bottom Price & Action Buttons */}
                    <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-[#1E2028]">
                      <span className="text-xs sm:text-sm font-black text-gold-shimmer font-mono">
                        {formatCurrency(product.price)}
                      </span>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCustomizingProduct(product)}
                          className="px-2 py-1 rounded-lg bg-[#151722] border border-[#262835] text-[10px] font-bold text-white"
                        >
                          {language === 'ar' ? 'تخصيص' : 'Opt'}
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={() => addToCart(product)}
                          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black flex items-center justify-center shadow-xs"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          {inCartCount > 0 && (
                            <span className="absolute -top-1 -end-1 w-3.5 h-3.5 bg-[#EF4444] text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-[#070709]">
                              {inCartCount}
                            </span>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Detailed 1-Column List View for Mobile */
            <div className="space-y-3">
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
                    transition={{ duration: 0.2 }}
                    onClick={() => setCustomizingProduct(product)}
                    className="bg-[#0E1015] rounded-3xl p-3 border border-[#1E2028] active:border-[#D4AF37]/50 shadow-md transition-all flex items-center justify-between gap-3 relative cursor-pointer"
                  >
                    {/* Product Visual */}
                    <div className="relative w-22 h-22 rounded-2xl bg-[#14161E] border border-[#222530] flex items-center justify-center shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent pointer-events-none" />
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={language === 'ar' ? product.nameAr : product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-16 h-16 animate-float">
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

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <motion.button
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setCustomizingProduct(product)}
                            className="min-h-[32px] px-2.5 py-1 rounded-xl bg-[#151722] border border-[#242633] text-[10px] font-bold text-white transition-colors"
                          >
                            {language === 'ar' ? '+ تخصيص' : '+ Custom'}
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={() => addToCart(product)}
                            className="relative min-w-[32px] min-h-[32px] rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black flex items-center justify-center shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
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
            </div>
          )}
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
