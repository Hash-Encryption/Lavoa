'use client';

import React, { useState } from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import {
  Bell,
  Flame,
  Receipt,
  Wine,
  Sparkles,
  Check,
  X,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface TableServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableServiceModal: React.FC<TableServiceModalProps> = ({ isOpen, onClose }) => {
  const { tableNumber, loungeArea, language, t } = useCoffee();
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestConfirmed, setRequestConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const services = [
    {
      id: 'coals',
      titleAr: 'طلب / تغيير جمر الشيشة',
      titleEn: 'Request Fresh Coals',
      descAr: 'تبديل فحم الشيشة بجمر طبيعي مشتعل ونظيف',
      descEn: 'Replace shisha charcoal with fresh natural coals',
      icon: <Flame className="w-5 h-5 text-[#D4AF37]" />,
      badgeAr: 'سريع • دقيقة واحدة',
      badgeEn: 'Quick • 1 min',
    },
    {
      id: 'waiter',
      titleAr: 'استدعاء النادل إلى الطاولة',
      titleEn: 'Call Waiter to Table',
      descAr: 'طلب حضور كابتن الصالة أو النادل لمساعدتك فوراً',
      descEn: 'Request immediate table concierge assistance',
      icon: <Bell className="w-5 h-5 text-[#D4AF37]" />,
      badgeAr: 'فوري',
      badgeEn: 'Instant',
    },
    {
      id: 'bill',
      titleAr: 'طلب الحساب / الفاتورة',
      titleEn: 'Request Bill / Receipt',
      descAr: 'طلب جهاز الدفع المتنقل (مدى / Apple Pay) أو كاش',
      descEn: 'Bring mobile POS card machine or cash receipt',
      icon: <Receipt className="w-5 h-5 text-[#D4AF37]" />,
      badgeAr: 'دفع عند الطاولة',
      badgeEn: 'Pay at Table',
    },
    {
      id: 'refresh',
      titleAr: 'طلب ماء مثلج أو كؤوس إضافية',
      titleEn: 'Ice Water & Glasses',
      descAr: 'مياه معدنية باردة، ثلج إضافي، أو مناديل معطرة',
      descEn: 'Chilled mineral water, extra ice or wet wipes',
      icon: <Wine className="w-5 h-5 text-[#D4AF37]" />,
      badgeAr: 'ضيافة مجانية',
      badgeEn: 'Complimentary',
    },
  ];

  const handleSendService = (serviceId: string, serviceTitle: string) => {
    setIsSubmitting(true);
    setActiveRequest(serviceId);

    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 40]);
      }
    } catch (_) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setRequestConfirmed(serviceTitle);
      toast.success(
        language === 'ar'
          ? `تم استلام طلب (${serviceTitle}) لطاولة ${tableNumber} — الطاقم في الطريق إليك!`
          : `Request (${serviceTitle}) dispatched to table ${tableNumber}!`
      );
    }, 700);
  };

  const handleReset = () => {
    setRequestConfirmed(null);
    setActiveRequest(null);
    setCustomNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#0E1015] border-t sm:border border-[#D4AF37]/40 rounded-t-[32px] sm:rounded-3xl shadow-[0_-15px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh] z-10 text-white"
        >
          {/* Mobile Drag Handle */}
          <div className="sm:hidden w-full pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#2A2E3D]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2028]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] flex items-center justify-center shadow-md shadow-[#D4AF37]/25 font-bold shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>{language === 'ar' ? 'خدمة الطاولة السريعة' : 'Instant Table Service'}</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium">
                  {language === 'ar' ? `طاولة رقم (${tableNumber}) • متصل بنظام اللاونج` : `Table (${tableNumber}) • Connected`}
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

          {/* Body Content */}
          <div className="p-6 space-y-4 overflow-y-auto scrollbar-none flex-1">
            {requestConfirmed ? (
              /* Success / In-Progress Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">
                    {language === 'ar' ? 'تم استدعاء الطاقم بنجاح!' : 'Concierge Dispatched!'}
                  </h4>
                  <p className="text-xs text-[#9E9EA7] max-w-xs mx-auto leading-relaxed">
                    {language === 'ar'
                      ? `تم إشعار كابتن الصالة لخدمة طاولة (${tableNumber}) بطلبك: "${requestConfirmed}". سيتواجد معك خلال ثوانٍ.`
                      : `Table (${tableNumber}) service dispatched for "${requestConfirmed}". Help is on the way.`}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#141620] border border-[#222530] max-w-xs mx-auto flex items-center justify-center gap-2 text-xs font-mono text-[#D4AF37]">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'ar' ? 'الوقت المقدر للوصول: 1 - 2 دقيقة' : 'ETA: 1 - 2 mins'}</span>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-[#1A1C26] hover:bg-[#222532] text-xs font-bold text-white border border-[#2E3244] transition-all"
                >
                  {language === 'ar' ? 'تم، العودة إلى القائمة' : 'Done, Back to Menu'}
                </button>
              </motion.div>
            ) : (
              <>
                <p className="text-xs text-[#9E9EA7] leading-relaxed">
                  {language === 'ar'
                    ? 'اضغط على الخدمة المطلوبة لطاولتك وسيتم تنبيه طاقم الضيافة فوراً بدون الحاجة للبحث عن النادل.'
                    : 'Tap any service below to instantly alert lounge staff to your table.'}
                </p>

                {/* 4 Interactive Service Cards */}
                <div className="space-y-2.5">
                  {services.map((srv) => (
                    <motion.button
                      key={srv.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendService(srv.id, language === 'ar' ? srv.titleAr : srv.titleEn)}
                      disabled={isSubmitting}
                      className="w-full p-4 rounded-2xl bg-[#12141A] border border-[#1E2028] hover:border-[#D4AF37]/50 active:border-[#D4AF37] text-start flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#181A24] border border-[#262835] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/50 transition-colors">
                          {srv.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                              {language === 'ar' ? srv.titleAr : srv.titleEn}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#9E9EA7] line-clamp-1 mt-0.5">
                            {language === 'ar' ? srv.descAr : srv.descEn}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-[#D4AF37]">
                          {language === 'ar' ? srv.badgeAr : srv.badgeEn}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#9E9EA7] group-hover:text-white rtl:rotate-180 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Quick Note Input */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'طلب خاص أو ملاحظة إضافية للطاقم' : 'Custom Request'}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder={
                        language === 'ar'
                          ? 'اكتب طلبك هنا (مثال: طلب سكر زيادة، تبديل لي الشيشة...)'
                          : 'Type any request for your table...'
                      }
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#141620] border border-[#222530] text-xs text-white placeholder:text-[#656875] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!customNote.trim()) return;
                        handleSendService('custom', customNote);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB] text-[#070709] font-black text-xs shrink-0 shadow-md hover:brightness-105 transition-all"
                    >
                      {language === 'ar' ? 'إرسال' : 'Send'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TableServiceModal;
