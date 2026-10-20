'use client';

import React from 'react';
import { useCoffee } from '../../context/CoffeeContext';
import { Clock, CheckCircle2, ChevronRight, RotateCcw, Coffee } from 'lucide-react';
import { DrinkRender } from '../common/DrinkRender';

export const CustomerOrdersView: React.FC = () => {
  const {
    activeOrders,
    setActiveTrackingOrder,
    setIsTrackingModalOpen,
    formatCurrency,
    t,
    language,
    addToCart,
  } = useCoffee();

  return (
    <div className="w-full space-y-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-white">{t('navOrders')}</h2>
          <p className="text-xs text-[#9E9E9E]">
            {language === 'ar' ? 'سجل طلباتك وحالتها الحية' : 'Your live orders & history'}
          </p>
        </div>
        <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
          {activeOrders.length} {language === 'ar' ? 'طلبات' : 'Orders'}
        </span>
      </div>

      {activeOrders.length === 0 ? (
        <div className="bg-[#13151A] rounded-3xl p-8 border border-[#23262F] text-center space-y-3">
          <Coffee className="w-10 h-10 text-[#D4AF37] mx-auto opacity-50" />
          <h3 className="font-bold text-sm text-white">
            {language === 'ar' ? 'لا توجد طلبات سابقة' : 'No orders yet'}
          </h3>
          <p className="text-xs text-[#9E9E9E]">
            {language === 'ar'
              ? 'تصفح قائمة الشيشة والمشروبات واطلب جلستك لتظهر تفاصيلها هنا.'
              : 'Browse our shisha & beverages menu and order to track it here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => {
                setActiveTrackingOrder(order);
                setIsTrackingModalOpen(true);
              }}
              className="bg-[#13151A] rounded-3xl p-4 border border-[#23262F] hover:border-[#D4AF37]/50 shadow-lg hover:shadow-xl transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#23262F]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#D4AF37]">
                    {order.receiptNumber}
                  </span>
                  <span className="text-[10px] text-[#9E9E9E]">• {order.createdAt}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    order.status === 'ready'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : order.status === 'preparing'
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30'
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {order.status === 'ready'
                      ? t('statusReady')
                      : order.status === 'preparing'
                      ? t('statusPreparing')
                      : t('statusReceived')}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#9E9E9E] rtl:rotate-180" />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-[#E0E2EC] font-medium">
                      {item.quantity}x {language === 'ar' ? item.product.nameAr : item.product.name}
                    </span>
                    <span className="text-[#D4AF37] font-mono">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Repeat Order */}
              <div className="flex items-center justify-between pt-2 border-t border-[#23262F]">
                <div>
                  <span className="text-[10px] text-[#9E9E9E] block">{t('total')}</span>
                  <span className="text-sm font-black text-[#D4AF37]">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    order.items.forEach((i) => addToCart(i.product, i.customization, i.quantity));
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#1C1F26] hover:bg-[#252833] border border-[#2A2D37] text-xs font-bold text-white rounded-xl transition-colors hover:border-[#D4AF37]/40"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{language === 'ar' ? 'إعادة الطلب' : 'Re-order'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
