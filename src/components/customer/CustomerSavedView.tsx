'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { PRODUCTS } from '../../data/mockData';
import { Heart, Plus, Star } from 'lucide-react';
import { DrinkRender } from '../common/DrinkRender';

export const CustomerSavedView: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    addToCart,
    setCustomizingProduct,
    formatCurrency,
    t,
    language,
  } = useCoffee();

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="w-full space-y-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-white">{t('savedTitle')}</h2>
          <p className="text-xs text-[#9E9E9E]">
            {language === 'ar'
              ? 'مشروباتك وسناكاتك وشيشك المحفوظة للطلب السريع'
              : 'Your saved favorites for quick ordering'}
          </p>
        </div>
        <span className="text-xs font-bold text-[#E05353] bg-[#E05353]/15 border border-[#E05353]/30 px-2.5 py-1 rounded-full">
          {favoriteProducts.length} {language === 'ar' ? 'محفوظة' : 'Saved'}
        </span>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-[#13151A] rounded-3xl p-8 border border-[#23262F] text-center space-y-3">
          <Heart className="w-10 h-10 text-[#E05353] mx-auto opacity-40" />
          <h3 className="font-bold text-sm text-white">{t('savedEmpty')}</h3>
          <p className="text-xs text-[#9E9E9E]">
            {language === 'ar'
              ? 'انقر على أيقونة القلب على أي عنصر لحفظه هنا والوصول إليه بسرعة.'
              : 'Click the heart icon on any item to save it here for quick access.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setCustomizingProduct(product)}
              className="bg-[#13151A] rounded-3xl p-4 border border-[#23262F] hover:border-[#D4AF37]/50 shadow-lg hover:shadow-xl transition-all flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#1A1D24] border border-[#2A2D37] flex items-center justify-center shrink-0 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={language === 'ar' ? product.nameAr : product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <DrinkRender
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    className="w-16 h-16"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-white group-hover:text-[#D4AF37] truncate transition-colors">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="text-[#E05353] p-1 hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <p className="text-[11px] text-[#9E9E9E] line-clamp-1 mt-0.5">
                  {language === 'ar' ? product.descriptionAr : product.description}
                </p>

                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-xs font-black text-[#D4AF37]">
                    {formatCurrency(product.price)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F22] text-[#0A0B0E] flex items-center justify-center shadow-md font-bold hover:brightness-110 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
