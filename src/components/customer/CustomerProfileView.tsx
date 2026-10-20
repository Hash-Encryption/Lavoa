'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { Award, Gift, Sparkles, MapPin, CreditCard, ChevronRight, Bell, ShieldCheck } from 'lucide-react';

export const CustomerProfileView: React.FC = () => {
  const { t, language, branchName } = useCoffee();

  return (
    <div className="w-full space-y-4 py-2">
      <div>
        <h2 className="text-base font-black text-white">{t('profileTitle')}</h2>
        <p className="text-xs text-[#9E9E9E]">
          {language === 'ar'
            ? 'برنامج مكافآت اللاونج وعضويتك الملكية الفاخرة'
            : 'Lounge rewards & royal membership tier'}
        </p>
      </div>

      {/* Loyalty Member Card */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1C1F26] via-[#252833] to-[#121418] text-white p-5 shadow-2xl border border-[#D4AF37]/40">
        {/* Subtle gold glow & decorative crown motif */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Award className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="text-xs font-bold text-[#E5E7EB]">{t('rewardsBadge')}</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F22] text-[#0A0B0E] text-[10px] font-black uppercase tracking-wider shadow-sm">
            VIP ROYAL TIER
          </span>
        </div>

        <div className="space-y-1 relative z-10">
          <span className="text-[11px] text-[#9E9E9E]">{t('loyaltyPoints')}</span>
          <h3 className="text-2xl font-black font-mono text-[#D4AF37]">{t('pointsCount')}</h3>
        </div>

        {/* Progress Bar towards free brew / shisha */}
        <div className="mt-4 space-y-1.5 relative z-10">
          <div className="w-full h-2 bg-[#2D313C] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3D77B] rounded-full w-[85%]" />
          </div>
          <p className="text-[11px] text-[#D1D5DB]">{t('freeCoffeeReward')}</p>
        </div>
      </div>

      {/* Settings & Info Rows */}
      <div className="bg-[#13151A] rounded-3xl p-2 border border-[#23262F] divide-y divide-[#23262F]">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <span className="text-xs font-bold text-white block">
                {language === 'ar' ? 'الفرع واللاونج' : 'Lounge Branch'}
              </span>
              <span className="text-[11px] text-[#9E9E9E]">{branchName}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9E9E9E] rtl:rotate-180" />
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <span className="text-xs font-bold text-white block">
                {language === 'ar' ? 'طرق الدفع المفضلة' : 'Payment Methods'}
              </span>
              <span className="text-[11px] text-[#9E9E9E]">Apple Pay • Mada • كاش عند الجلسة</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9E9E9E] rtl:rotate-180" />
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <span className="text-xs font-bold text-white block">
                {language === 'ar' ? 'قسائم الخصم والضيافة' : 'Coupons & Hospitality'}
              </span>
              <span className="text-[11px] text-[#D4AF37] font-bold">
                {language === 'ar' ? '2 كوبونات VIP نشطة' : '2 VIP Vouchers Active'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9E9E9E] rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
};
