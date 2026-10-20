'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCoffee } from '../../../../src/context/CoffeeContext';
import { PRODUCTS } from '../../../../src/data/mockData';
import { CategoryType } from '../../../../src/types';
import { ChevronLeft, ShoppingBag, Search, Plus, Star } from 'lucide-react';
import {
  LatteArtWatermark,
  TeaWatermark,
  SnackWatermark,
  ShishaWatermark,
} from '../../../../src/components/common/BrandIllustrations';
import { DrinkRender } from '../../../../src/components/common/DrinkRender';
import { SplitText } from '../../../../src/components/common/SplitText';
import { ProductCustomizationModal } from '../../../../src/components/customer/ProductCustomizationModal';
import { CustomerCartDrawer } from '../../../../src/components/customer/CustomerCartDrawer';
import { CustomerBottomNav } from '../../../../src/components/customer/CustomerBottomNav';
import { OrderConfirmationModal } from '../../../../src/components/customer/OrderConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryClientView({ initialCategory }: { initialCategory?: string }) {
  const params = useParams();
  const rawId = (params?.id as string) || initialCategory || 'shisha';
  const categoryId: CategoryType = ['shisha', 'coffee', 'tea', 'snack'].includes(rawId)
    ? (rawId as CategoryType)
    : 'shisha';

  const {
    cartTotalCount,
    addToCart,
    setCustomizingProduct,
    setIsCartDrawerOpen,
    t,
    language,
    formatCurrency,
  } = useCoffee();

  const [subFilter, setSubFilter] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');

  const configs: Record<
    CategoryType,
    {
      titleKey: 'shisha' | 'coffee' | 'tea' | 'snack';
      color: string;
      watermark: React.ReactNode;
      subFilters: { key: string; label: string }[];
    }
  > = {
    shisha: {
      titleKey: 'shisha',
      color: '#13151A',
      watermark: <ShishaWatermark className="text-[#D4AF37] opacity-25 w-48 h-48" />,
      subFilters: [
        { key: 'All', label: t('all') },
        { key: 'Classic', label: language === 'ar' ? 'كلاسيك فاخر' : 'Classic' },
        { key: 'Special', label: language === 'ar' ? 'خلطات لافوا' : 'Signature Mix' },
        { key: 'Ice', label: language === 'ar' ? 'آيس منعش' : 'Ice Fresh' },
      ],
    },
    coffee: {
      titleKey: 'coffee',
      color: '#13151A',
      watermark: <LatteArtWatermark className="text-[#D4AF37] opacity-20 w-48 h-48" />,
      subFilters: [
        { key: 'All', label: t('all') },
        { key: 'Signature', label: t('signature') },
        { key: 'Manual', label: t('manual') },
        { key: 'Creamilk', label: t('creamilk') },
      ],
    },
    tea: {
      titleKey: 'tea',
      color: '#13151A',
      watermark: <TeaWatermark className="text-[#D4AF37] opacity-20 w-48 h-48" />,
      subFilters: [
        { key: 'All', label: t('all') },
        { key: 'Japanese', label: language === 'ar' ? 'ياباني أصيل' : 'Japanese' },
        { key: 'Signature', label: t('signature') },
        { key: 'Herbal', label: t('herbal') },
      ],
    },
    snack: {
      titleKey: 'snack',
      color: '#13151A',
      watermark: <SnackWatermark className="text-[#D4AF37] opacity-20 w-48 h-48" />,
      subFilters: [
        { key: 'All', label: t('all') },
        { key: 'Special', label: t('special') },
        { key: 'Snacks', label: t('snacks') },
        { key: 'Dessert', label: language === 'ar' ? 'حلويات' : 'Desserts' },
      ],
    },
  };

  const currentConfig = configs[categoryId];

  const categoryProducts = PRODUCTS.filter((p) => {
    if (p.category !== categoryId) return false;
    if (subFilter !== 'All' && p.subCategory.toLowerCase() !== subFilter.toLowerCase()) {
      return false;
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameAr?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionAr?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A0B0E] flex flex-col pb-28 selection:bg-[#D4AF37] selection:text-[#0A0B0E]">
      <div className="w-full max-w-md mx-auto flex flex-col relative overflow-hidden">
        {/* Top Curved Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden text-white pt-4 pb-6 px-4 rounded-b-[40px] shadow-2xl border-b border-[#23262F] bg-gradient-to-b from-[#181B22] to-[#13151A]"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between mb-4 z-10 relative">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-[#1F222B] hover:bg-[#2A2E3A] border border-[#2A2D37] flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </Link>

            <div className="text-center">
              <SplitText
                text={t(currentConfig.titleKey)}
                className="text-xl font-black tracking-wide text-[#D4AF37]"
                splitType="words"
                duration={0.8}
                delay={40}
              />
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative w-9 h-9 rounded-full bg-[#1F222B] hover:bg-[#2A2E3A] border border-[#2A2D37] flex items-center justify-center text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-[#E05353] text-white text-[9px] font-bold flex items-center justify-center border border-[#0A0B0E]">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative z-10 px-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#9E9E9E] absolute start-3 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full ps-9 pe-4 py-2.5 bg-[#1C1F26] rounded-2xl text-xs text-white placeholder:text-[#6B7280] border border-[#2A2D37] focus:outline-none focus:border-[#D4AF37]/60 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Background Watermark */}
          <div className="absolute -end-6 -bottom-6 pointer-events-none">
            {currentConfig.watermark}
          </div>
        </motion.div>

        {/* Sub-Category Filter Pills */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {currentConfig.subFilters.map((sf) => (
              <button
                key={sf.key}
                onClick={() => setSubFilter(sf.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  subFilter === sf.key
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F22] text-[#0A0B0E] shadow-md'
                    : 'bg-[#13151A] text-[#9E9E9E] border border-[#23262F] hover:border-[#D4AF37]/30'
                }`}
              >
                {sf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="p-4 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={subFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.05 }}
              className="space-y-3"
            >
              {categoryProducts.map((product) => (
                <motion.div
                  key={product.id}
                  onClick={() => setCustomizingProduct(product)}
                  className="bg-[#13151A] rounded-3xl p-3.5 border border-[#23262F] hover:border-[#D4AF37]/50 shadow-lg hover:shadow-xl transition-all flex items-center justify-between gap-3 relative cursor-pointer group"
                >
                  {/* Floating Drink Render */}
                  <div className="w-24 h-24 rounded-2xl bg-[#1A1D24] border border-[#2A2D37] flex items-center justify-center shrink-0 p-1.5">
                    <DrinkRender
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      className="w-20 h-20"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#D4AF37]" />
                        {product.rating}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors truncate">
                      {language === 'ar' ? product.nameAr : product.name}
                    </h4>

                    <p className="text-[11px] text-[#9E9E9E] line-clamp-1 mt-0.5">
                      {language === 'ar' ? product.descriptionAr : product.description}
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-black text-[#D4AF37]">
                        {formatCurrency(product.price)}
                      </span>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setCustomizingProduct(product)}
                          className="px-2.5 py-1 rounded-xl bg-[#1C1F26] border border-[#2A2D37] text-[10px] font-bold text-white hover:border-[#D4AF37]/40"
                        >
                          {t('customizeBtn')}
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F22] text-[#0A0B0E] flex items-center justify-center shadow-md font-bold hover:brightness-110"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <CustomerBottomNav />
      <ProductCustomizationModal />
      <CustomerCartDrawer />
      <OrderConfirmationModal />
    </div>
  );
}
