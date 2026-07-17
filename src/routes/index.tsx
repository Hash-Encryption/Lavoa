import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Phone, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import { MENU } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09z" />
    </svg>
  );
}

function Index() {
  const [active, setActive] = useState(MENU[0].id);
  const menuRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeCat = MENU.find((c) => c.id === active) ?? MENU[0];

  // Center-scroll the active tab into view on mobile
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab="${active}"]`
    );
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-arabic overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_90%)]" aria-hidden />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 text-gold/80"
          >
            <span className="h-px w-10 bg-gold/60" />
            <Sparkles className="h-4 w-4" />
            <span className="font-display italic tracking-widest text-sm">Est. Midnight</span>
            <Sparkles className="h-4 w-4" />
            <span className="h-px w-10 bg-gold/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 text-5xl sm:text-7xl md:text-8xl font-black leading-tight"
          >
            <span className="bg-gold-gradient bg-clip-text text-transparent">ليالي الفخامة</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            تجربة ليلية استثنائية حيث تلتقي الأناقة بذائقة المذاق — قهوة راقية، معسلات فاخرة، وأجواء لا تُنسى
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToMenu}
            className="group relative mt-10 overflow-hidden rounded-full bg-gold-gradient px-10 py-4 text-primary-foreground font-bold text-base shadow-gold transition-all hover:shadow-glow-gold"
          >
            <span className="relative z-10">استكشف القائمة</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="h-10 w-6 rounded-full border border-gold/40 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1 rounded-full bg-gold"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section ref={menuRef} id="menu" className="relative pb-24">
        <div className="mx-auto max-w-6xl px-4 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display italic text-gold tracking-widest text-sm">The Menu</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black">
              <span className="bg-gold-gradient bg-clip-text text-transparent">قائمتنا الفاخرة</span>
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          </motion.div>
        </div>

        {/* Sticky tabs */}
        <div className="sticky top-0 z-30 mt-10 border-y border-gold/10 bg-background/70 backdrop-blur-xl">
          <div
            ref={tabsRef}
            className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {MENU.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  data-tab={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold"
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items grid */}
        <div className="mx-auto max-w-6xl px-4 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeCat.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.6) }}
                  whileHover={{ y: -6 }}
                  className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-gold/60 hover:shadow-glow-gold"
                >
                  <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-foreground leading-tight flex-1">
                        {item.name}
                      </h3>
                      <div className="shrink-0 rounded-full border border-gold/40 bg-background/50 px-3 py-1">
                        <span className="font-display font-bold text-gold text-sm tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {item.desc && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                    <div className="mt-4 h-px w-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-gold/20 bg-charcoal/40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <p className="font-display italic text-gold tracking-widest text-xs">Midnight Luxury</p>
              <h3 className="mt-2 text-3xl font-black">
                <span className="bg-gold-gradient bg-clip-text text-transparent">ليالي الفخامة</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">تجربة ليلية فاخرة</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="group grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="group grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="tel:+000000000"
                aria-label="Phone"
                className="group grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>

            <a href="tel:+966500000000" className="font-display text-gold text-lg tracking-wide">
              +966 50 000 0000
            </a>

            <div className="mx-auto h-px w-24 bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ليالي الفخامة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
