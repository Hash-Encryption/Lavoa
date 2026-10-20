'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { Clock, Sparkles, ChevronRight, CheckCircle2, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveActiveOrderCard: React.FC = () => {
  const {
    activeOrders,
    activeTrackingOrder,
    liveCountdownSeconds,
    liveStatus,
    setIsTrackingModalOpen,
    t,
    language,
  } = useCoffee();

  if (activeOrders.length === 0 || !activeTrackingOrder) {
    return null;
  }

  const mins = Math.floor(liveCountdownSeconds / 60);
  const secs = liveCountdownSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const progressPercent = Math.min(
    100,
    Math.max(15, Math.round(((90 - liveCountdownSeconds) / 90) * 100))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setIsTrackingModalOpen(true)}
      className="w-full relative overflow-hidden rounded-[26px] bg-[#13151A] text-white p-4 shadow-xl border border-[#D4AF37]/40 cursor-pointer group"
    >
      {/* Golden pulsing glow */}
      <div className="absolute top-0 end-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-bold text-[#D4AF37]">
            {liveStatus === 'ready'
              ? (language === 'ar' ? 'طلبك جاهز ويتم تقديمه لجلستك!' : 'Your order is ready!')
              : t('activeOrderTitle')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#181A22] text-[#D4AF37] border border-[#D4AF37]/40 font-mono text-xs font-black">
            {activeTrackingOrder.receiptNumber}
          </span>
          <ChevronRight className="w-4 h-4 text-[#9E9EA7] group-hover:text-[#D4AF37] rtl:rotate-180 transition-colors" />
        </div>
      </div>

      {/* Gold & Amber Progress Bar */}
      <div className="w-full h-2.5 bg-[#181A22] rounded-full overflow-hidden p-0.5 mb-2.5 relative border border-[#23262F]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFE082] to-[#A68222] rounded-full relative"
          style={{ width: `${liveStatus === 'ready' ? 100 : progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-[#9E9EA7]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>
            {t('estimatedTime')}:{' '}
            <strong className="text-white font-mono">
              {liveStatus === 'ready' ? '0:00' : `${timeFormatted} ${t('minsLeft')}`}
            </strong>
          </span>
        </div>

        <span className="text-[11px] text-[#D4AF37] font-bold flex items-center gap-1">
          {liveStatus === 'ready' ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t('statusReady')}
            </>
          ) : (
            <>
              <Flame className="w-3 h-3 text-[#D4AF37]" />
              {t('statusPreparing')}
            </>
          )}
        </span>
      </div>
    </motion.div>
  );
};
