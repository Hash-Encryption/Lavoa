'use client';

import React, { useState } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { PaymentMethod, LoungeArea } from '../../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Banknote,
  Sparkles,
  User,
  Phone,
  MapPin,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrinkRender } from '../common/DrinkRender';

export const CustomerCartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    tax,
    total,
    formatCurrency,
    t,
    language,
    orderType,
    setOrderType,
    loungeArea,
    setLoungeArea,
    tableNumber,
    setTableNumber,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    promoCode,
    setPromoCode,
    promoApplied,
    applyPromoCode,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
  } = useCoffee();

  const [localPromoInput, setLocalPromoInput] = useState('');

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
        <div className="fixed inset-0" onClick={() => setIsCartDrawerOpen(false)} />

        <motion.div
          initial={{ x: language === 'ar' ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: language === 'ar' ? '-100%' : '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#13151A] text-white h-full shadow-2xl flex flex-col z-10 overflow-hidden border-s border-[#23262F]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#23262F] flex items-center justify-between bg-[#181A22]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0A0B0E] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{t('cartTitle')}</h3>
                <span className="text-[11px] text-[#9E9EA7]">
                  {cart.length} {t('stickyCartItems')} &bull; {orderType === 'dine-in' ? `${t('tableChip')} ${tableNumber}` : t('takeAway')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#E05353] hover:underline font-medium"
                >
                  {language === 'ar' ? 'إفراغ' : 'Clear'}
                </button>
              )}
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#23262F] flex items-center justify-center text-[#9E9EA7] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-[#181A22] border border-[#23262F] flex items-center justify-center text-[#D4AF37]">
                  <Flame className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-bold text-base text-white">{t('emptyCartTitle')}</h4>
                <p className="text-xs text-[#9E9EA7] max-w-xs">{t('emptyCartMsg')}</p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#D4AF37] text-[#0A0B0E] rounded-2xl text-xs font-black shadow-md hover:brightness-105"
                >
                  {t('exploreMenu')}
                </button>
              </div>
            ) : (
              <>
                {/* 1. Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#181A22] rounded-2xl p-3 border border-[#23262F] flex items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#13151A] border border-[#23262F] flex items-center justify-center shrink-0 overflow-hidden">
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={language === 'ar' ? item.product.nameAr : item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <DrinkRender
                            id={item.product.id}
                            name={item.product.name}
                            category={item.product.category}
                            className="w-14 h-14"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-white truncate">
                            {language === 'ar' ? item.product.nameAr : item.product.name}
                          </h4>
                          <span className="font-bold text-xs text-[#D4AF37]">
                            {formatCurrency(item.totalPrice)}
                          </span>
                        </div>

                        {/* Modifiers description */}
                        <p className="text-[10px] text-[#9E9EA7] mt-0.5 truncate">
                          {item.product.category === 'shisha' ? (
                            <>
                              رأس {item.customization.headType === 'apple' ? 'تفاح طبيعي' : item.customization.headType === 'pineapple' ? 'أناناس طبيعي' : 'فخار'}
                              {item.customization.iceTip && ' • آيس بازوكا'}
                              {` • دخان ${item.customization.smokeDensity || 'معتدل'}`}
                            </>
                          ) : (
                            <>
                              {item.customization.size} &bull; {item.customization.milk} milk
                            </>
                          )}
                        </p>
                        {item.customization.notes && (
                          <p className="text-[10px] text-[#D4AF37] italic truncate">
                            &quot;{item.customization.notes}&quot;
                          </p>
                        )}

                        {/* Stepper */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-[#13151A] border border-[#23262F] rounded-xl px-1.5 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-[#9E9EA7] hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-[11px] w-4 text-center text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-[#9E9EA7] hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#65676E] hover:text-[#E05353] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. Customer & Table Information (Real & Editable) */}
                <div className="bg-[#181A22] rounded-2xl p-3 border border-[#23262F] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white border-b border-[#23262F] pb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t('selectLocation')}</span>
                    </span>
                    <span className="text-[#D4AF37] text-[11px]">
                      {orderType === 'dine-in' ? `${t('tableChip')} ${tableNumber}` : t('takeAway')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#9E9EA7] block">{t('customerNameLabel')}</span>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#13151A] border border-[#23262F] rounded-lg px-2 py-1 text-white text-xs mt-0.5 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9E9EA7] block">{t('tableNumberInput')}</span>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full bg-[#13151A] border border-[#23262F] rounded-lg px-2 py-1 text-white text-xs mt-0.5 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Promo Code */}
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={localPromoInput}
                      onChange={(e) => setLocalPromoInput(e.target.value)}
                      placeholder={t('promoCodePlaceholder')}
                      className="flex-1 px-3.5 py-2 bg-[#181A22] border border-[#23262F] rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={() => applyPromoCode(localPromoInput)}
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C258] text-[#0A0B0E] text-xs font-black rounded-xl transition-colors shrink-0"
                    >
                      {t('applyPromo')}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-[#D4AF37] font-bold mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {t('promoApplied')}
                    </p>
                  )}
                </div>

                {/* 4. Payment Method Options */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white block">
                    {t('paymentMethodTitle')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'cash_waiter' as PaymentMethod, label: t('payWaiter'), icon: <Banknote className="w-3.5 h-3.5" /> },
                      { key: 'apple_pay' as PaymentMethod, label: t('payApple'), icon: '' },
                      { key: 'card' as PaymentMethod, label: t('payMada'), icon: <CreditCard className="w-3.5 h-3.5" /> },
                    ].map((pm) => (
                      <button
                        key={pm.key}
                        onClick={() => setPaymentMethod(pm.key)}
                        className={`p-2 rounded-xl text-[10px] font-bold border flex flex-col items-center justify-center gap-1 transition-all ${
                          paymentMethod === pm.key
                            ? 'bg-[#D4AF37] text-[#0A0B0E] border-[#D4AF37] shadow-sm font-black'
                            : 'bg-[#181A22] text-[#9E9EA7] border-[#23262F]'
                        }`}
                      >
                        <span className="text-xs">{pm.icon}</span>
                        <span className="truncate max-w-full text-center leading-tight">{pm.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Summary Breakdown */}
                <div className="pt-3 border-t border-[#23262F] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#9E9EA7]">
                    <span>{t('subtotal')}</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-[#D4AF37] font-bold">
                      <span>{t('discount')} (10%)</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#9E9EA7]">
                    <span>{t('tax')}</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>

                  <div className="flex items-center justify-between text-base font-black text-white pt-2 border-t border-[#23262F]">
                    <span>{t('total')}</span>
                    <span className="text-[#D4AF37] font-mono">{formatCurrency(total)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#23262F] bg-[#181A22]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={placeOrder}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E5C258] text-[#0A0B0E] font-black text-sm shadow-lg shadow-[#D4AF37]/20 flex items-center justify-between transition-all hover:brightness-105"
              >
                <span>{t('confirmOrderCta')}</span>
                <span className="bg-black/20 px-3 py-1 rounded-xl text-xs font-mono font-black text-[#0A0B0E]">
                  {formatCurrency(total)}
                </span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
