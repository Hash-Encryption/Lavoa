'use client';

import React from 'react';
import { useCoffee } from '../../src/context/CoffeeContext';
import { CustomerHeader } from '../../src/components/customer/CustomerHeader';
import { CinematicHeroSection } from '../../src/components/customer/CinematicHeroSection';
import { LiveActiveOrderCard } from '../../src/components/customer/LiveActiveOrderCard';
import { CustomerHeroBanners } from '../../src/components/customer/CustomerHeroBanners';
import { PeopleChoiceSlider } from '../../src/components/customer/PeopleChoiceSlider';
import { CustomerProductGrid } from '../../src/components/customer/CustomerProductGrid';
import { ProductCustomizationModal } from '../../src/components/customer/ProductCustomizationModal';
import { CustomerCartDrawer } from '../../src/components/customer/CustomerCartDrawer';
import { OrderConfirmationModal } from '../../src/components/customer/OrderConfirmationModal';
import { CustomerBottomNav } from '../../src/components/customer/CustomerBottomNav';
import { CustomerOrdersView } from '../../src/components/customer/CustomerOrdersView';
import { CustomerSavedView } from '../../src/components/customer/CustomerSavedView';
import { CustomerProfileView } from '../../src/components/customer/CustomerProfileView';
import { AmbientBackground } from '../../src/components/common/AmbientBackground';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerAppPage() {
  const { activeMobileTab, activeCategory, t, language } = useCoffee();

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col text-[#F3F4F6] selection:bg-[#D4AF37] selection:text-[#070709] relative">
      {/* Dynamic Ambient Background: Floating Gold Orbs & Subtle Hookah Mist */}
      <AmbientBackground />

      {/* 1. Universal Top Header (Adaptive Mobile & Desktop with Sticky Glassmorphism) */}
      <CustomerHeader />

      {/* 2. Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-32 lg:pb-16 relative z-10">
        {/* ============================================================== */}
        {/* MOBILE EXPERIENCE (< 1024px)                                   */}
        {/* ============================================================== */}
        <div className="lg:hidden w-full max-w-md mx-auto space-y-5">
          {/* Mobile Tab Routing: Orders vs Saved vs Profile vs Home */}
          {activeMobileTab === 'orders' ? (
            <CustomerOrdersView />
          ) : activeMobileTab === 'starred' ? (
            <CustomerSavedView />
          ) : activeMobileTab === 'profile' ? (
            <CustomerProfileView />
          ) : (
            <>
              {/* Cinematic Hero Section with Corrected LAVOIA LOUNGE & 3D VIP Card */}
              <CinematicHeroSection />

              {/* Live Active Order Card (If active order exists) */}
              <LiveActiveOrderCard />

              {/* Category Showcase & Sticky Mobile Horizontal Pills */}
              <div className="pt-1">
                <CustomerHeroBanners />
              </div>

              {/* Lounge Bestsellers Horizontal Slider */}
              <div className="pt-2">
                <PeopleChoiceSlider />
              </div>

              {/* Full Menu Catalog */}
              <div className="pt-3 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-black text-base text-white flex items-center gap-2">
                    <span>{language === 'ar' ? 'قائمة المنيو الفاخرة' : 'Full Luxury Catalog'}</span>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </h3>
                </div>
                <CustomerProductGrid />
              </div>
            </>
          )}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP EXPERIENCE (>= 1024px)                                 */}
        {/* ============================================================== */}
        <div className="hidden lg:block space-y-9">
          {/* Desktop Cinematic Hero with 3D Tilt VIP Card */}
          <CinematicHeroSection />

          {/* Live Active Order Widget for Desktop (If exists) */}
          <LiveActiveOrderCard />

          {/* 4-Card Category Showcase */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#1E2028]">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>{language === 'ar' ? 'أقسام وتصنيفات لاونج لافوا' : 'LAVOIA Lounge Categories'}</span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              </h2>
            </div>
            <CustomerHeroBanners />
          </section>

          {/* Lounge Bestsellers Slider */}
          <section className="pt-2">
            <PeopleChoiceSlider />
          </section>

          {/* 4-Column Product Catalog Grid with 3D Interactive Spotlight Cards */}
          <section className="pt-4 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2028]">
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>{language === 'ar' ? 'قائمة الطلبات الكاملة' : 'Full Menu Catalog'}</span>
                <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-3 py-1 rounded-full">
                  LAVOIA EXCLUSIVE
                </span>
              </h2>
            </div>
            <CustomerProductGrid />
          </section>
        </div>
      </main>

      {/* 3. Mobile Bottom Floating Dock & Sticky Cart */}
      <CustomerBottomNav />

      {/* 4. Global Modals & Drawers */}
      <ProductCustomizationModal />
      <CustomerCartDrawer />
      <OrderConfirmationModal />
    </div>
  );
}
