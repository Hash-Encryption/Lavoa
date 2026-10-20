'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  RotateCcw,
  X,
  Flame,
  Check,
  User,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderConfirmationModal: React.FC = () => {
  const {
    isOrderPlacedSuccess,
    setIsOrderPlacedSuccess,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    activeTrackingOrder,
    liveCountdownSeconds,
    liveStatus,
    formatCurrency,
    t,
    language,
  } = useCoffee();

  const isOpen = isOrderPlacedSuccess || isTrackingModalOpen;

  const handleClose = () => {
    setIsOrderPlacedSuccess(false);
    setIsTrackingModalOpen(false);
  };

  if (!isOpen || !activeTrackingOrder) return null;

  const mins = Math.floor(liveCountdownSeconds / 60);
  const secs = liveCountdownSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const stages = [
    { key: 'received', label: t('statusReceived'), icon: <Check className="w-4 h-4" /> },
    { key: 'preparing', label: t('statusPreparing'), icon: <Flame className="w-4 h-4" /> },
    { key: 'ready', label: t('statusReady'), icon: <Sparkles className="w-4 h-4" /> },
  ];

  const currentStageIndex =
    liveStatus === 'ready' ? 2 : liveStatus === 'preparing' ? 1 : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#13151A] rounded-[36px] p-6 shadow-2xl border border-[#D4AF37]/40 relative overflow-hidden space-y-5 text-white"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 end-0 w-44 h-44 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 end-4 w-8 h-8 rounded-full bg-[#181A22] border border-[#23262F] flex items-center justify-center text-[#9E9EA7] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Celebratory Icon & Header */}
          <div className="text-center pt-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1, stiffness: 400 }}
              className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 text-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <h2 className="text-xl font-black text-white tracking-tight">
              {t('orderConfirmedTitle')}
            </h2>
            <p className="text-xs text-[#9E9EA7] mt-1 max-w-xs mx-auto">
              {t('orderConfirmedSubtitle')}
            </p>
          </div>

          {/* Live Order Card */}
          <div className="bg-[#181A22] rounded-3xl p-4 border border-[#23262F] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23262F]">
              <div>
                <span className="text-[10px] text-[#9E9EA7] block uppercase tracking-wider">
                  {t('orderNumber')}
                </span>
                <span className="text-base font-black text-[#D4AF37] font-mono">
                  {activeTrackingOrder.receiptNumber}
                </span>
              </div>

              <div className="text-end">
                <span className="text-[10px] text-[#9E9EA7] block uppercase tracking-wider">
                  {t('estimatedTime')}
                </span>
                <span className="text-base font-black text-white font-mono">
                  {liveStatus === 'ready' ? '0:00' : `${timeFormatted} ${t('minsLeft')}`}
                </span>
              </div>
            </div>

            {/* Customer & Table details */}
            <div className="flex items-center justify-between text-xs text-[#9E9EA7]">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-white font-medium">
                  {activeTrackingOrder.customerName || 'ضيف لافوا'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold">
                  {activeTrackingOrder.tableNumber ? `${t('tableChip')} ${activeTrackingOrder.tableNumber}` : t('takeAway')}
                </span>
              </div>
            </div>

            {/* 3-Step Pulsing Progress Stepper */}
            <div className="relative pt-2">
              <div className="absolute top-6 start-6 end-6 h-0.5 bg-[#23262F] -z-0" />
              <div
                className="absolute top-6 start-6 h-0.5 bg-[#D4AF37] transition-all duration-700 -z-0"
                style={{
                  width: `${(currentStageIndex / (stages.length - 1)) * 80}%`,
                }}
              />

              <div className="flex items-center justify-between relative z-10">
                {stages.map((stage, idx) => {
                  const isPassed = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage.key} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                          isPassed
                            ? 'bg-[#D4AF37] text-[#0A0B0E] ring-4 ring-[#D4AF37]/20 font-black'
                            : 'bg-[#13151A] text-[#9E9EA7] border border-[#23262F]'
                        } ${isCurrent ? 'animate-pulse' : ''}`}
                      >
                        {stage.icon}
                      </div>
                      <span
                        className={`text-[10px] font-bold text-center leading-tight ${
                          isPassed ? 'text-white' : 'text-[#65676E]'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items summary */}
            <div className="pt-2 text-xs text-[#9E9EA7] space-y-1 border-t border-[#23262F]">
              <div className="flex justify-between font-bold text-white">
                <span>
                  {activeTrackingOrder.items.length}{' '}
                  {language === 'ar' ? 'طلبات مسجلة' : 'items ordered'}
                </span>
                <span className="text-[#D4AF37] font-mono">
                  {formatCurrency(activeTrackingOrder.total)}
                </span>
              </div>
              <p className="text-[11px] truncate text-[#9E9EA7]">
                {activeTrackingOrder.items
                  .map(
                    (i) =>
                      `${i.quantity}x ${language === 'ar' ? i.product.nameAr : i.product.name}`
                  )
                  .join(' • ')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                alert(
                  language === 'ar'
                    ? 'تم حفظ الفاتورة الإلكترونية لطلب لاونج لافوا!'
                    : "L'Avois digital receipt saved!"
                );
              }}
              className="w-full py-3 bg-[#181A22] hover:bg-[#23262F] border border-[#23262F] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('saveReceipt')}</span>
            </button>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C258] text-[#0A0B0E] rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-[#D4AF37]/20 hover:brightness-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('startNewOrder')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
