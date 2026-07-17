import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Phone, Sparkles, Languages } from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import { MENU } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  component: Index,
});

type Lang = "ar" | "en";

const T = {
  ar: {
    tagline: "Est. Midnight",
    brand: "لافوا",
    subBrand: "LAVOA",
    hero: "تجربة ليلية استثنائية حيث تلتقي الأناقة بذائقة المذاق — قهوة راقية، معسلات فاخرة، وأجواء لا تُنسى",
    cta: "استكشف القائمة",
    menuKicker: "The Menu",
    menuTitle: "قائمتنا الفاخرة",
    footerTag: "تجربة ليلية فاخرة",
    rights: "جميع الحقوق محفوظة",
    switchTo: "EN",
  },
  en: {
    tagline: "Est. Midnight",
    brand: "LAVOA",
    subBrand: "لافوا",
    hero: "An extraordinary nightly experience where elegance meets exquisite taste — refined coffee, premium shisha, and an unforgettable ambience",
    cta: "Explore the Menu",
    menuKicker: "The Menu",
    menuTitle: "Our Luxury Menu",
    footerTag: "A Luxury Night Experience",
    rights: "All rights reserved",
    switchTo: "عربي",
  },
} as const;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09z" />
    </svg>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [active, setActive] = useState(MENU[0].id);
  const menuRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeCat = MENU.find((c) => c.id === active) ?? MENU[0];
  const t = T[lang];
  const isAr = lang === "ar";

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      lang={lang}
      className={`min-h-screen bg-background text-foreground overflow-x-hidden ${
        isAr ? "font-arabic" : ""
      }`}
    >
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        aria-label="Switch language"
        className="fixed top-5 z-50 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/70 px-4 py-2 text-sm font-bold text-gold backdrop-blur-xl shadow-gold transition-all hover:border-gold hover:shadow-glow-gold"
        style={isAr ? { left: "1.25rem" } : { right: "1.25rem" }}
      >
        <Languages className="h-4 w-4" />
        <span>{t.switchTo}</span>
      </button>

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
            className="flex items-center gap-3 text-gold/80"
          >
            <span className="h-px w-10 bg-gold/60" />
            <Sparkles className="h-4 w-4" />
            <span className="font-display italic tracking-[0.35em] text-xs">{t.tagline}</span>
            <Sparkles className="h-4 w-4" />
            <span className="h-px w-10 bg-gold/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 text-6xl sm:text-8xl md:text-9xl font-black leading-none tracking-tight text-champagne drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]"
            style={{ color: "var(--champagne)" }}
          >
            {t.brand}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-3 font-display italic text-gold tracking-[0.4em] text-sm"
          >
            {t.subBrand}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {t.hero}
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
            <span className="relative z-10">{t.cta}</span>
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
            <p className="font-display italic text-gold tracking-[0.35em] text-xs">{t.menuKicker}</p>
            <h2
              className="mt-3 text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: "var(--champagne)" }}
            >
              {t.menuTitle}
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          </motion.div>
        </div>

        {/* Sticky tabs */}
        <div className="sticky top-0 z-30 mt-10 border-y border-gold/10 bg-background/70 backdrop-blur-xl">
          <div
            ref={tabsRef}
            className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 [&::-webkit-scrollbar]:hidden"
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
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold"
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {isAr ? cat.label : cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items grid */}
        <div className="mx-auto max-w-6xl px-4 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id + lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeCat.items.map((item, i) => {
                const name = isAr ? item.name : item.nameEn;
                const desc = isAr ? item.desc : item.descEn;
                return (
                  <motion.article
                    key={name}
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
                          {name}
                        </h3>
                        <div
                          className="shrink-0 rounded-full border border-gold/50 bg-onyx/80 px-3 py-1"
                          style={{ backgroundColor: "color-mix(in oklab, var(--onyx) 85%, transparent)" }}
                        >
                          <span
                            className="font-display font-bold text-sm tabular-nums"
                            style={{ color: "var(--champagne)" }}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {desc && (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      )}
                      <div className="mt-4 h-px w-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-gold/20 bg-charcoal/40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <p className="font-display italic text-gold tracking-[0.35em] text-xs">
                Midnight Luxury
              </p>
              <h3
                className="mt-2 text-4xl font-black tracking-tight"
                style={{ color: "var(--champagne)" }}
              >
                {t.brand}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{t.footerTag}</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="TikTok" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href="tel:+000000000" aria-label="Phone" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110">
                <Phone className="h-5 w-5" />
              </a>
            </div>

            <a href="tel:+966500000000" className="font-display text-gold text-lg tracking-wide">
              +966 50 000 0000
            </a>

            <div className="mx-auto h-px w-24 bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t.brand}. {t.rights}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
