'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { LAvoisLogo } from '../common/BrandIllustrations';
import { SessionTableModal } from './SessionTableModal';
import {
  Search,
  ShoppingBag,
  MapPin,
  Languages,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  Coffee,
  Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomerHeader: React.FC = () => {
  const {
    language,
    toggleLanguage,
    t,
    branchName,
    loungeArea,
    tableNumber,
    orderType,
    searchQuery,
    setSearchQuery,
    cartTotalCount,
    total,
    formatCurrency,
    setIsCartDrawerOpen,
    filteredProducts,
    setCustomizingProduct,
    setIsTableServiceOpen,
  } = useCoffee();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format Lounge Area Arabic / English
  const getAreaLabel = () => {
    if (orderType === 'takeaway') {
      return language === 'ar' ? 'استلام سفري' : 'Takeaway';
    }
    if (loungeArea === 'terrace') {
      return language === 'ar' ? `طاولة (${tableNumber}) • التراس الخارجي` : `Table (${tableNumber}) • Terrace`;
    }
    if (loungeArea === 'vip') {
      return language === 'ar' ? `جناح VIP (${tableNumber}) • ملكي` : `VIP Suite (${tableNumber})`;
    }
    return language === 'ar' ? `طاولة (${tableNumber}) • الصالة الداخلية` : `Table (${tableNumber}) • Indoor`;
  };

  return (
    <>
      {/* ---------------- MOBILE HEADER (< 1024px) ---------------- */}
      <header className="lg:hidden w-full sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between border-b border-[#D4AF37]/20 shadow-lg">
        {/* Logo with Green Status Dot */}
        <LAvoisLogo size="sm" showStatus={true} />

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Table Service Concierge Bell */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsTableServiceOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161822] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center transition-all relative shadow-sm"
            aria-label="Table Service"
          >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          </motion.button>

          {/* Quick Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#12141A] border border-[#222530] text-[#9E9EA7] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Session / Table Capsule */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSessionModalOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#14161F] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold shadow-xs active:bg-[#1E212D]"
          >
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate max-w-[85px] sm:max-w-none">
              {orderType === 'dine-in' ? `طاولة ${tableNumber}` : t('takeAway')}
            </span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </motion.button>

          {/* Language Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full bg-[#12141A] border border-[#222530] text-white text-[11px] sm:text-xs font-bold shadow-xs hover:border-[#D4AF37]/40"
          >
            <Languages className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </motion.button>

          {/* Gold Cart Button with Count Badge */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] flex items-center justify-center shadow-md shadow-[#D4AF37]/25 font-black shrink-0"
            aria-label={t('cartTitle')}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -end-1 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#070709] animate-pulse">
                {cartTotalCount}
              </span>
            )}
          </motion.button>
        </div>
      </header>

      {/* Mobile Expanding Search Bar */}
      <AnimatePresence>
        {isSearchOpenMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden sticky top-[57px] z-30 bg-[#0A0B0E]/95 backdrop-blur-xl px-4 py-2.5 border-b border-[#222530]"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#9E9EA7] absolute start-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث في الشيشة، القهوة المختصة، الحلا...'
                    : 'Search shisha, specialty coffee, snacks...'
                }
                autoFocus
                className="w-full ps-9 pe-9 py-2 bg-[#14161E] rounded-full border border-[#D4AF37]/40 text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 text-[#9E9EA7] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- DESKTOP HEADER (>= 1024px) ---------------- */}
      <header className="hidden lg:block w-full sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo & Branch/Session Capsule */}
          <div className="flex items-center gap-6">
            <LAvoisLogo size="md" showStatus={true} />

            {/* Interactive Session Capsule */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSessionModalOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12141A] border border-[#262835] hover:border-[#D4AF37]/60 shadow-md text-xs text-white font-medium transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#070709] transition-colors">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-[10px] text-[#9E9EA7] leading-none">
                  {branchName}
                </span>
                <span className="text-[#D4AF37] font-bold text-xs leading-tight mt-0.5">
                  {getAreaLabel()}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#9E9EA7] group-hover:text-white transition-colors" />
            </motion.button>
          </div>

          {/* Center Smart Expandable Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-md relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#9E9EA7] absolute start-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder={
                  language === 'ar'
                    ? 'ابحث في الشيشة، القهوة المختصة، الحلا...'
                    : 'Search shisha, specialty coffee, snacks...'
                }
                className="w-full ps-10 pe-9 py-2.5 bg-[#12141A] rounded-full border border-[#222530] text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 text-[#9E9EA7] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Auto-Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full start-0 end-0 mt-2 bg-[#0E1015] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#D4AF37] flex items-center justify-between">
                    <span>
                      {language === 'ar' ? 'نتائج البحث السريع' : 'Search Suggestions'}
                    </span>
                    <span className="text-[#9E9EA7]">
                      {filteredProducts.length} {t('itemsTotal')}
                    </span>
                  </div>

                  {filteredProducts.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setCustomizingProduct(p);
                        setIsSearchFocused(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#181A22] transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#14161E] border border-[#222530] flex items-center justify-center text-[#D4AF37]">
                          {p.category === 'shisha' ? (
                            <Flame className="w-4 h-4" />
                          ) : (
                            <Coffee className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            {language === 'ar' ? p.nameAr : p.name}
                          </h4>
                          <span className="text-[10px] text-[#9E9EA7] line-clamp-1">
                            {language === 'ar' ? p.descriptionAr : p.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#D4AF37]">
                        {formatCurrency(p.price)}
                      </span>
                    </div>
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="py-6 text-center text-xs text-[#9E9EA7]">
                      {language === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching results'}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Controls: Table Service, Language & Gold Cart */}
          <div className="flex items-center gap-3">
            {/* Table Service Concierge Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTableServiceOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#181A24] border border-[#D4AF37]/50 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070709] shadow-sm transition-all"
            >
              <Bell className="w-4 h-4" />
              <span>{language === 'ar' ? 'طلب النادل' : 'Call Waiter'}</span>
            </motion.button>

            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#12141A] border border-[#222530] text-xs font-bold text-white hover:border-[#D4AF37]/40 shadow-xs transition-colors"
            >
              <Languages className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </motion.button>

            {/* Gold Cart Button with Count + Total in SAR */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] text-xs font-black shadow-lg shadow-[#D4AF37]/25 hover:brightness-105 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -end-2 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center border border-[#070709]">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span>{t('cartTitle')}</span>
              {cartTotalCount > 0 && (
                <span className="ps-2 border-s border-[#070709]/20 font-mono font-black">
                  {formatCurrency(total)}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Global Session & Table Modal */}
      <SessionTableModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />
    </>
  );
};

export default CustomerHeader;
