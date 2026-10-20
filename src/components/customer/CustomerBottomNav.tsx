'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { CustomerMobileTab } from '../../types';
import { Home, Receipt, Heart, User, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomerBottomNav: React.FC = () => {
  const {
    activeMobileTab,
    setActiveMobileTab,
    cartTotalCount,
    total,
    formatCurrency,
    setIsCartDrawerOpen,
    t,
    language,
  } = useCoffee();

  const tabs: { key: CustomerMobileTab; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: t('navHome'), icon: <Home className="w-5 h-5" /> },
    { key: 'orders', label: t('navOrders'), icon: <Receipt className="w-5 h-5" /> },
    { key: 'starred', label: t('navSaved'), icon: <Heart className="w-5 h-5" /> },
    { key: 'profile', label: t('navProfile'), icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 start-0 end-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="w-full max-w-md mx-auto space-y-2 pointer-events-auto">
        {/* Sticky Cart Bar (Appears when cart has items) */}
        <AnimatePresence>
          {cartTotalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ type: 'spring', damping: 24, stiffness: 340 }}
              onClick={() => setIsCartDrawerOpen(true)}
              className="w-full bg-gradient-to-r from-[#171922] via-[#12141C] to-[#0E1015] text-white rounded-2xl p-3 px-4 shadow-[0_10px_35px_rgba(0,0,0,0.85)] border border-[#D4AF37]/50 flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#AA7C11] text-[#070709] flex items-center justify-center font-bold shadow-md shadow-[#D4AF37]/30">
                  <ShoppingBag className="w-4 h-4 stroke-[2.4]" />
                  <span className="absolute -top-1.5 -end-1.5 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#070709] animate-pulse">
                    {cartTotalCount}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-black block text-white">
                    {language === 'ar' ? 'سلة طلبات الجلسة' : 'Active Lounge Order'}
                  </span>
                  <span className="text-xs text-gold-shimmer font-mono font-black">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-black text-[#070709] bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] px-3.5 py-2 rounded-xl shadow-md hover:brightness-105 transition-all">
                <span>{language === 'ar' ? 'عرض السلة وإتمام الطلب' : 'Checkout'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Floating Navigation Dock */}
        <nav className="w-full bg-[#0E1015]/95 text-[#9E9EA7] rounded-full p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.9)] border border-[#222530] flex items-center justify-around backdrop-blur-xl">
          {tabs.map((tab) => {
            const isActive = activeMobileTab === tab.key;

            return (
              <motion.button
                key={tab.key}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveMobileTab(tab.key)}
                className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] ${
                  isActive ? 'text-[#D4AF37]' : 'hover:text-white'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-1 start-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-[#D4AF37] font-black' : 'text-[#9E9EA7]'
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CustomerBottomNav;
