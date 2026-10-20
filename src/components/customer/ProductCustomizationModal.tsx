'use client';

import React, { useState, useEffect } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import {
  DrinkSize,
  MilkOption,
  SweetnessOption,
  TemperatureOption,
  ShishaHeadType,
  ShishaHose,
  ShishaSmoke,
} from '../../types';
import { X, Minus, Plus, Sparkles, Check, Flame, Wind, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrinkRender } from '../common/DrinkRender';

export const ProductCustomizationModal: React.FC = () => {
  const {
    customizingProduct,
    setCustomizingProduct,
    addToCart,
    formatCurrency,
    t,
    language,
  } = useCoffee();

  const isShisha = customizingProduct?.category === 'shisha';

  // Beverage options
  const [size, setSize] = useState<DrinkSize>('medium');
  const [milk, setMilk] = useState<MilkOption>('whole');
  const [sweetness, setSweetness] = useState<SweetnessOption>('normal');
  const [temperature, setTemperature] = useState<TemperatureOption>('normal');

  // Shisha options
  const [headType, setHeadType] = useState<ShishaHeadType>('clay');
  const [hose, setHose] = useState<ShishaHose>('disposable');
  const [iceTip, setIceTip] = useState<boolean>(false);
  const [smokeDensity, setSmokeDensity] = useState<ShishaSmoke>('medium');

  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset when product changes
  useEffect(() => {
    if (customizingProduct) {
      setSize('medium');
      setMilk('whole');
      setSweetness('normal');
      setTemperature('normal');
      setHeadType('clay');
      setHose('disposable');
      setIceTip(false);
      setSmokeDensity('medium');
      setNotes('');
      setQuantity(1);
    }
  }, [customizingProduct]);

  if (!customizingProduct) return null;

  // Additional price calculator
  const calculateExtra = () => {
    let extra = 0;
    if (isShisha) {
      if (headType === 'apple') extra += 4.0; // ~15 SAR
      if (headType === 'pineapple') extra += 6.6; // ~25 SAR
      if (iceTip) extra += 2.67; // ~10 SAR
    } else {
      if (size === 'large') extra += 1.07; // ~4 SAR
      if (milk === 'oat' || milk === 'almond') extra += 0.8; // ~3 SAR
    }
    return extra;
  };

  const extraPerItem = calculateExtra();
  const unitPrice = customizingProduct.price + extraPerItem;
  const totalPrice = unitPrice * quantity;

  const handleConfirmAdd = () => {
    addToCart(
      customizingProduct,
      {
        size: !isShisha ? size : undefined,
        milk: !isShisha ? milk : undefined,
        sweetness: !isShisha ? sweetness : undefined,
        temperature: !isShisha ? temperature : undefined,
        headType: isShisha ? headType : undefined,
        hose: isShisha ? hose : undefined,
        iceTip: isShisha ? iceTip : undefined,
        smokeDensity: isShisha ? smokeDensity : undefined,
        notes,
        additionalPrice: extraPerItem,
      },
      quantity
    );
    setCustomizingProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCustomizingProduct(null)}
          className="fixed inset-0 bg-[#070709]/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal / Bottom Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100 || info.velocity.y > 400) {
              setCustomizingProduct(null);
            }
          }}
          className="relative w-full max-w-lg bg-[#0E1015] border-t sm:border border-[#D4AF37]/35 rounded-t-[32px] sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Mobile Drag Handle */}
          <div className="sm:hidden w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 rounded-full bg-[#2A2E3D]" />
          </div>

          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2028]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#14161F] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                {customizingProduct.image ? (
                  <img
                    src={customizingProduct.image}
                    alt={language === 'ar' ? customizingProduct.nameAr : customizingProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DrinkRender
                    id={customizingProduct.id}
                    name={customizingProduct.name}
                    category={customizingProduct.category}
                    className="w-8 h-8"
                  />
                )}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {language === 'ar' ? customizingProduct.nameAr : customizingProduct.name}
                </h3>
                <span className="text-xs font-mono font-bold text-gold-shimmer">
                  {formatCurrency(unitPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCustomizingProduct(null)}
              className="w-8 h-8 rounded-full bg-[#181A22] border border-[#23262F] flex items-center justify-center text-[#9E9EA7] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none">
            {/* ---------------- SHISHA SPECIFIC OPTIONS ---------------- */}
            {isShisha ? (
              <>
                {/* 1. Head Type */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#D4AF37]">
                      {language === 'ar' ? 'نوع الرأس' : 'Head Type'}
                    </label>
                    <span className="text-[10px] text-[#9E9EA7]">
                      {language === 'ar' ? 'اختر تجربة التدخين' : 'Select smoking experience'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'clay', labelAr: 'فخار كلاسيك', labelEn: 'Classic Clay', price: '+0' },
                      { id: 'apple', labelAr: 'رأس تفاح طبيعي', labelEn: 'Fresh Apple', price: '+15 ر.س' },
                      { id: 'pineapple', labelAr: 'رأس أناناس ملكي', labelEn: 'Royal Pineapple', price: '+25 ر.س' },
                    ].map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setHeadType(h.id as ShishaHeadType)}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          headType === h.id
                            ? 'bg-[#181A24] border-[#D4AF37] shadow-sm shadow-[#D4AF37]/20 text-white'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span className="block text-xs font-bold">
                          {language === 'ar' ? h.labelAr : h.labelEn}
                        </span>
                        <span className="block text-[10px] text-[#D4AF37] font-mono mt-0.5">
                          {h.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Ice Tip Toggle */}
                <div className="p-3.5 rounded-2xl bg-[#12141A] border border-[#222530] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{language === 'ar' ? 'مبسم آيس مثلج (Ice Tip)' : 'Iced Cooling Tip'}</span>
                    </h4>
                    <p className="text-[10px] text-[#9E9EA7] mt-0.5">
                      {language === 'ar' ? 'لسحب دخان بارد ومنعش للحلق' : 'Chilled smooth velvet smoke (+10 SAR)'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIceTip(!iceTip)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      iceTip ? 'bg-[#D4AF37]' : 'bg-[#222530]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-[#070709] transition-transform ${
                        iceTip ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0.5 rtl:-translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* 3. Hose Option */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'نوع اللي (Hose)' : 'Hose Type'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'disposable', labelAr: 'لي استخدام واحد صحي (معقم)', labelEn: 'Hygienic Disposable' },
                      { id: 'silicone', labelAr: 'لي سيليكون فاخر لافوا', labelEn: 'Luxury Silicone' },
                    ].map((hs) => (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => setHose(hs.id as ShishaHose)}
                        className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                          hose === hs.id
                            ? 'bg-[#181A24] border-[#D4AF37] text-white shadow-xs'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7]'
                        }`}
                      >
                        {language === 'ar' ? hs.labelAr : hs.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Smoke Density */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'كثافة السحبة' : 'Smoke Density'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'light', labelAr: 'خفيف وناعم', labelEn: 'Light' },
                      { id: 'medium', labelAr: 'متوسط ومتزن', labelEn: 'Balanced' },
                      { id: 'dense', labelAr: 'ثقيل وكثيف', labelEn: 'Heavy & Dense' },
                    ].map((sd) => (
                      <button
                        key={sd.id}
                        type="button"
                        onClick={() => setSmokeDensity(sd.id as ShishaSmoke)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          smokeDensity === sd.id
                            ? 'bg-[#181A24] border-[#D4AF37] text-white'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7]'
                        }`}
                      >
                        {language === 'ar' ? sd.labelAr : sd.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* ---------------- BEVERAGE OPTIONS ---------------- */
              <>
                {/* Size */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'الحجم' : 'Size'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'small', labelAr: 'صغير (8oz)', labelEn: 'Small' },
                      { id: 'medium', labelAr: 'وسط (12oz)', labelEn: 'Regular' },
                      { id: 'large', labelAr: 'كبير (16oz)', labelEn: 'Large (+4 ر.س)' },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setSize(sz.id as DrinkSize)}
                        className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                          size === sz.id
                            ? 'bg-[#181A24] border-[#D4AF37] text-white shadow-xs'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7]'
                        }`}
                      >
                        {language === 'ar' ? sz.labelAr : sz.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milk */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'نوع الحليب' : 'Milk Preference'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'whole', labelAr: 'حليب كامل الدسم', labelEn: 'Whole Milk' },
                      { id: 'skim', labelAr: 'قليل الدسم', labelEn: 'Skimmed Milk' },
                      { id: 'oat', labelAr: 'حليب شوفان (+3 ر.س)', labelEn: 'Oat Milk' },
                      { id: 'almond', labelAr: 'حليب لوز (+3 ر.س)', labelEn: 'Almond Milk' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMilk(m.id as MilkOption)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          milk === m.id
                            ? 'bg-[#181A24] border-[#D4AF37] text-white shadow-xs'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7]'
                        }`}
                      >
                        {language === 'ar' ? m.labelAr : m.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sweetness */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'مستوى الحلاوة' : 'Sweetness'}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', labelAr: 'بدون سكر', labelEn: 'Zero' },
                      { id: 'less', labelAr: 'خفيف', labelEn: 'Less' },
                      { id: 'normal', labelAr: 'مضبوط', labelEn: 'Regular' },
                      { id: 'extra', labelAr: 'زيادة', labelEn: 'Extra' },
                    ].map((sw) => (
                      <button
                        key={sw.id}
                        type="button"
                        onClick={() => setSweetness(sw.id as SweetnessOption)}
                        className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          sweetness === sw.id
                            ? 'bg-[#181A24] border-[#D4AF37] text-white'
                            : 'bg-[#12141A] border-[#222530] text-[#9E9EA7]'
                        }`}
                      >
                        {language === 'ar' ? sw.labelAr : sw.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Special Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#D4AF37] block">
                {language === 'ar' ? 'ملاحظات خاصة للباريستا / المعلم' : 'Special Notes'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder={
                  language === 'ar'
                    ? 'مثال: فحم إضافي بعد 30 دقيقة، حرارة خفيفة...'
                    : 'e.g. Extra hot, light ice, extra charcoal...'
                }
                className="w-full p-3 rounded-2xl bg-[#14161E] border border-[#222530] text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#12141A] border border-[#222530]">
              <span className="text-xs font-bold text-white">
                {language === 'ar' ? 'الكمية' : 'Quantity'}
              </span>

              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-[#1A1C26] border border-[#2A2E3D] text-white flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </motion.button>

                <span className="text-sm font-mono font-black text-white w-6 text-center">
                  {quantity}
                </span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-[#1A1C26] border border-[#2A2E3D] text-white flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 sm:p-5 border-t border-[#1E2028] bg-[#0E1015]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmAdd}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-105 transition-all flex items-center justify-between px-6"
            >
              <span>{language === 'ar' ? 'إضافة إلى طلب الجلسة' : 'Add to Order'}</span>
              <span className="font-mono text-base font-black">
                {formatCurrency(totalPrice)}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductCustomizationModal;
