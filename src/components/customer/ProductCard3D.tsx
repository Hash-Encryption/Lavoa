'use client';

import React, { useState, useRef } from 'react';
import { Product } from '../../types';
import { useCoffee } from '../../context/CoffeeContext';
import { DrinkRender } from '../common/DrinkRender';
import { Plus, Star, Heart, Flame, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ProductCard3DProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onCustomize?: (product: Product) => void;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onAddToCart,
  onCustomize,
}) => {
  const {
    language,
    formatCurrency,
    isFavorite,
    toggleFavorite,
    addToCart,
    setCustomizingProduct,
    getItemCountInCart,
    t,
  } = useCoffee();

  const cardRef = useRef<HTMLDivElement>(null);
  const favorited = isFavorite(product.id);
  const inCartCount = getItemCountInCart(product.id);

  // Spotlight mouse tracking coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleOpenCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomizingProduct(product);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setCustomizingProduct(product)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative rounded-3xl bg-[#0E1015] border border-[#1E2028] hover:border-[#D4AF37]/50 p-4 sm:p-5 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden group select-none"
    >
      {/* 1. Dynamic Cursor Spotlight Glow Layer */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(212, 175, 55, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* 2. Top Header Bar: Rating & Category Badge & Favorite Button */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          {/* Star Rating */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141620] border border-[#222530] text-xs font-bold text-white shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-mono">{product.rating}</span>
          </div>

          {/* Category Badge */}
          {product.category === 'shisha' ? (
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold flex items-center gap-1 border border-[#D4AF37]/30">
              <Flame className="w-3 h-3" />
              <span>{language === 'ar' ? 'شيشة فاخرة' : 'Shisha'}</span>
            </span>
          ) : (
            product.isPopular && (
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[#F3E5AB] text-[10px] font-bold flex items-center gap-1 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{language === 'ar' ? 'الأكثر طلباً' : 'Popular'}</span>
              </span>
            )
          )}
        </div>

        {/* Favorite Heart Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
            favorited
              ? 'bg-[#EF4444] text-white border-transparent shadow-md shadow-[#EF4444]/30'
              : 'bg-[#141620] border-[#222530] text-[#9E9EA7] hover:text-[#EF4444] hover:border-[#EF4444]/40'
          }`}
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      {/* 3. Product Visual with Radial Gold Glow & Studio Photography */}
      <div className="w-full h-44 sm:h-48 flex items-center justify-center my-2 relative z-10">
        {/* Ambient Radial Golden Aura behind product */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-[#D4AF37]/15 blur-2xl group-hover:scale-125 group-hover:bg-[#D4AF37]/25 transition-all duration-500" />
        </div>

        {product.image ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/60 shadow-lg shadow-black/60 transition-all duration-300">
            <img
              src={product.image}
              alt={language === 'ar' ? product.nameAr : product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Subtle Gradient Vignette overlay for luxury tone */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015]/80 via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center animate-float">
            <DrinkRender
              id={product.id}
              name={product.name}
              category={product.category}
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* 4. Product Info */}
      <div className="relative z-10 pt-2 border-t border-[#1E2028]">
        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors truncate">
          {language === 'ar' ? product.nameAr : product.name}
        </h3>

        <p className="text-xs text-[#9E9EA7] line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
          {language === 'ar' ? product.descriptionAr : product.description}
        </p>

        {/* 5. Bottom Actions: Price, Customize Button & Quick Add */}
        <div className="flex items-center justify-between mt-3.5 pt-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#9E9EA7] uppercase font-bold">
              {language === 'ar' ? 'السعر' : 'Price'}
            </span>
            <span className="text-base font-black text-gold-shimmer font-mono">
              {formatCurrency(product.price)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Customize Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenCustomize}
              className="px-3 py-2 rounded-xl bg-[#151722] hover:bg-[#1E202F] border border-[#262835] hover:border-[#D4AF37]/50 text-[11px] font-bold text-white transition-all shadow-xs"
            >
              {language === 'ar' ? '+ تخصيص' : '+ Custom'}
            </motion.button>

            {/* Quick Add Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black flex items-center justify-center shadow-md shadow-[#D4AF37]/25 hover:brightness-105 transition-all"
              aria-label="Add to order"
            >
              <Plus className="w-4 h-4 stroke-[3]" />

              {/* In-cart count badge */}
              {inCartCount > 0 && (
                <span className="absolute -top-1 -end-1 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#070709] animate-pulse">
                  {inCartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard3D;
