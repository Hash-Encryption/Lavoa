'use client';

import React, { useState } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { OrderType, LoungeArea } from '../../types';
import {
  X,
  MapPin,
  User,
  Phone,
  Sparkles,
  Check,
  Armchair,
  SunMedium,
  Crown,
  ChevronRight,
  Coffee,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionTableModal: React.FC<SessionTableModalProps> = ({ isOpen, onClose }) => {
  const {
    branchName,
    loungeArea,
    setLoungeArea,
    tableNumber,
    setTableNumber,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    orderType,
    setOrderType,
    language,
    t,
  } = useCoffee();

  const [tempOrderType, setTempOrderType] = useState<OrderType>(orderType);
  const [tempLoungeArea, setTempLoungeArea] = useState<LoungeArea>(loungeArea);
  const [tempTable, setTempTable] = useState<string>(tableNumber);
  const [tempName, setTempName] = useState<string>(customerName);
  const [tempPhone, setTempPhone] = useState<string>(customerPhone);

  const branches = [
    {
      id: 'b1',
      nameAr: 'لاونج لافوا - فرع التحلية (الرئيسي)',
      nameEn: "L'Avois Lounge - Tahlia St (Main)",
      statusAr: 'مفتوح الآن حتى 3:00 ص',
      statusEn: 'Open now until 3:00 AM',
    },
    {
      id: 'b2',
      nameAr: 'لاونج لافوا - فرع الصفا',
      nameEn: "L'Avois Lounge - Al Safa",
      statusAr: 'مفتوح الآن حتى 2:00 ص',
      statusEn: 'Open now until 2:00 AM',
    },
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const areas: {
    id: LoungeArea;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'indoor',
      titleAr: 'الصالة الداخلية العائلية',
      titleEn: 'Family Indoor Salon',
      descAr: 'أجواء هادئة، إضاءة مدروسة، وتكييف مركزي متكامل',
      descEn: 'Cozy ambiance, bespoke lighting, climate controlled',
      icon: <Armchair className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      id: 'terrace',
      titleAr: 'التراس والجلسات الخارجية',
      titleEn: 'Open-Air Luxury Terrace',
      descAr: 'إطلالة حيوية في الهواء الطلق ومخصصة لعشاق الشيشة',
      descEn: 'Vibrant outdoor breeze, ideal for premium shisha',
      icon: <SunMedium className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      id: 'vip',
      titleAr: 'غرف VIP الخاصة الملكية',
      titleEn: 'Royal Private VIP Suites',
      descAr: 'خصوصية كاملة مع خدمة ضيافة شخصية مخصصة',
      descEn: 'Maximum privacy with personal concierge service',
      icon: <Crown className="w-5 h-5 text-[#D4AF37]" />,
    },
  ];

  const quickTables = ['T4', 'T7', 'T10', 'T14', 'VIP-1', 'VIP-2'];

  const handleSave = () => {
    setOrderType(tempOrderType);
    setLoungeArea(tempLoungeArea);
    setTableNumber(tempTable || 'T4');
    if (tempName.trim()) setCustomerName(tempName.trim());
    if (tempPhone.trim()) setCustomerPhone(tempPhone.trim());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070709]/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal / Draggable Bottom Sheet Container */}
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
                onClose();
              }
            }}
            className="relative w-full max-w-lg bg-[#0E1015] border-t sm:border border-[#D4AF37]/35 rounded-t-[32px] sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-[#2A2E3D]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2028]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {language === 'ar' ? 'تحديد الجلسة وطريقة الاستلام' : 'Session & Order Type'}
                  </h3>
                  <p className="text-[11px] text-[#9E9EA7]">
                    {language === 'ar'
                      ? 'اختر الفرع ومنطقة الجلوس لتسليم طلبك بدقة'
                      : 'Choose branch and seating area for precise delivery'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#181A22] border border-[#23262F] flex items-center justify-center text-[#9E9EA7] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none">
              {/* 1. Animated Segmented Control (Dine-in vs Takeaway) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#D4AF37] block">
                  {language === 'ar' ? 'نوع الطلب' : 'Order Method'}
                </label>
                <div className="grid grid-cols-2 p-1.5 bg-[#14161E] rounded-2xl border border-[#222530] relative">
                  <button
                    type="button"
                    onClick={() => setTempOrderType('dine-in')}
                    className={`py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${
                      tempOrderType === 'dine-in' ? 'text-[#070709] font-black' : 'text-[#9E9EA7] hover:text-white'
                    }`}
                  >
                    <Armchair className="w-4 h-4" />
                    <span>{language === 'ar' ? 'جلسة في اللاونج' : 'Lounge Dine-In'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTempOrderType('takeaway')}
                    className={`py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${
                      tempOrderType === 'takeaway' ? 'text-[#070709] font-black' : 'text-[#9E9EA7] hover:text-white'
                    }`}
                  >
                    <Coffee className="w-4 h-4" />
                    <span>{language === 'ar' ? 'استلام سفري (مشروبات فقط)' : 'Takeaway (Drinks)'}</span>
                  </button>

                  {/* Sliding Pill Indicator */}
                  <motion.div
                    layout
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-xl shadow-md ${
                      tempOrderType === 'dine-in' ? 'start-1.5' : 'end-1.5'
                    }`}
                  />
                </div>
              </div>

              {/* 2. Branch Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#D4AF37] block">
                  {language === 'ar' ? 'الفرع المختار' : 'Selected Branch'}
                </label>
                <div className="space-y-2">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedBranch.id === b.id
                          ? 'bg-[#181A22] border-[#D4AF37] shadow-sm shadow-[#D4AF37]/20'
                          : 'bg-[#12141A] border-[#222530] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedBranch.id === b.id ? 'border-[#D4AF37]' : 'border-[#404452]'
                          }`}
                        >
                          {selectedBranch.id === b.id && (
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">
                            {language === 'ar' ? b.nameAr : b.nameEn}
                          </h4>
                          <span className="text-[10px] text-[#10B981] flex items-center gap-1 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            {language === 'ar' ? b.statusAr : b.statusEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Seating Area Cards (If Dine-In) */}
              {tempOrderType === 'dine-in' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#D4AF37] block">
                    {language === 'ar' ? 'منطقة الجلوس المفضلة' : 'Lounge Seating Area'}
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {areas.map((a) => {
                      const isSelected = tempLoungeArea === a.id;
                      return (
                        <div
                          key={a.id}
                          onClick={() => setTempLoungeArea(a.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#1E202B] to-[#151720] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15'
                              : 'bg-[#12141A] border-[#222530] hover:border-[#D4AF37]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-[#D4AF37] text-[#070709]'
                                  : 'bg-[#181A22] text-[#D4AF37] border border-[#23262F]'
                              }`}
                            >
                              {a.icon}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">
                                {language === 'ar' ? a.titleAr : a.titleEn}
                              </h4>
                              <p className="text-[10px] text-[#9E9EA7] mt-0.5">
                                {language === 'ar' ? a.descAr : a.descEn}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#D4AF37] bg-[#D4AF37] text-[#070709]'
                                : 'border-[#3A3E4E]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Table Number & Presets (If Dine-In) */}
              {tempOrderType === 'dine-in' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#D4AF37]">
                      {language === 'ar' ? 'رقم الطاولة' : 'Table Number'}
                    </label>
                    <span className="text-[10px] text-[#9E9EA7]">
                      {language === 'ar' ? 'مكتوب على ستيكر طاولتك' : 'Printed on table sticker'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempTable}
                      onChange={(e) => setTempTable(e.target.value)}
                      placeholder="مثال: T14"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#14161E] border border-[#2A2E3D] text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                      {quickTables.map((qt) => (
                        <button
                          key={qt}
                          type="button"
                          onClick={() => setTempTable(qt)}
                          className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
                            tempTable === qt
                              ? 'bg-[#D4AF37] text-[#070709] font-black'
                              : 'bg-[#181A22] text-[#9E9EA7] border border-[#23262F] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {qt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Customer Name & Phone (Floating Labels) */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold text-[#D4AF37] block">
                  {language === 'ar' ? 'بيانات العميل (للتأكيد)' : 'Customer Details'}
                </label>

                {/* Name Field */}
                <div className="relative">
                  <User className="w-4 h-4 text-[#9E9EA7] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={language === 'ar' ? 'الاسم الكريم' : 'Full Name'}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[#14161E] border border-[#2A2E3D] text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#9E9EA7] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder={language === 'ar' ? 'رقم الجوال (05xxxxxxxx)' : 'Mobile Phone'}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[#14161E] border border-[#2A2E3D] text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer Confirm Button */}
            <div className="p-4 sm:p-5 border-t border-[#1E2028] bg-[#0E1015]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>{language === 'ar' ? 'تأكيد وحفظ الجلسة' : 'Confirm & Save Details'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SessionTableModal;
