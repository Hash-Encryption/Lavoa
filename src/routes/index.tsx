import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Phone, Sparkles, Languages, Coffee } from "lucide-react";
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

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.206 1c.924 0 4.347.253 5.953 3.515.458.94.348 2.528.268 3.686l-.013.195c-.005.085.056.17.143.196.31.09.758.046 1.235-.118.134-.046.268-.069.394-.069.283 0 .534.105.694.29.224.256.267.628.116.978-.246.575-1.01.985-2.27 1.22-.06.012-.115.057-.138.116l-.025.065c-.065.169-.13.36-.207.566-.056.153-.114.312-.176.477l-.017.044c-.032.085-.12.142-.213.133a11.63 11.63 0 0 1-1.562-.3c-.61-.16-1.21-.24-1.785-.238-.616.003-1.196.094-1.726.27-.44.146-.815.338-1.11.552-.455.328-.665.66-.66.985.008.476.386.876.79 1.08.42.213.874.314 1.34.3.334-.01.64-.083.927-.163.44-.12.842-.23 1.165-.065.22.11.39.32.44.563.1.47-.2.883-.76 1.05-.32.094-.614.14-.893.14-.197 0-.38-.025-.552-.063-.27-.06-.525-.09-.75-.09-.186 0-.35.022-.483.063-.28.087-.458.304-.43.567.022.21.175.392.43.536.465.264 1.277.437 2.23.488.54.028 1.018.22 1.34.526.274.26.427.61.43.98.005.68-.49 1.196-1.09 1.36-.434.12-.9.178-1.4.178-.284 0-.576-.018-.87-.054-.613-.075-1.128-.268-1.61-.446-.41-.152-.8-.295-1.22-.353-.25-.035-.508-.053-.77-.053-.261 0-.52.018-.77.053-.42.058-.81.201-1.22.353-.482.178-.997.37-1.61.446-.294.036-.586.054-.87.054-.5 0-.966-.058-1.4-.178-.6-.164-1.095-.68-1.09-1.36.003-.37.156-.72.43-.98.322-.306.8-.498 1.34-.526.953-.051 1.765-.224 2.23-.488.255-.144.408-.326.43-.536.028-.263-.15-.48-.43-.567-.133-.04-.297-.063-.483-.063-.225 0-.48.03-.75.09-.172.038-.355.063-.552.063-.279 0-.573-.046-.893-.14-.56-.167-.86-.58-.76-1.05.05-.243.22-.453.44-.563.323-.165.725-.055 1.165.065.287.08.593.153.927.163.466.014.92-.087 1.34-.3.404-.204.782-.604.79-1.08.005-.325-.205-.657-.66-.985a4.88 4.88 0 0 0-1.11-.552c-.53-.176-1.11-.267-1.726-.27-.575-.002-1.175.078-1.785.238-.55.145-1.063.267-1.562.3-.093.009-.181-.048-.213-.133l-.017-.044a17.7 17.7 0 0 1-.176-.477c-.077-.206-.142-.397-.207-.566l-.025-.065c-.023-.059-.078-.104-.138-.116-1.26-.235-2.024-.645-2.27-1.22-.151-.35-.108-.722.116-.978.16-.185.411-.29.694-.29.126 0 .26.023.394.069.477.164.925.208 1.235.118.087-.026.148-.11.143-.196l-.013-.195c-.08-1.158-.19-2.746.268-3.686C7.847 1.253 11.27 1 12.194 1h.012z" />
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
                    className="glass-card group relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:border-gold/60 hover:shadow-glow-gold"
                  >
                    <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-stretch gap-4">
                      {/* Thumbnail */}
                      <div className="relative shrink-0 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-xl ring-1 ring-gold/25">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div
                            className="h-full w-full grid place-items-center backdrop-blur-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, color-mix(in oklab, var(--charcoal) 70%, transparent), color-mix(in oklab, var(--onyx) 90%, transparent))",
                            }}
                          >
                            <Coffee className="h-7 w-7 text-gold/50" />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight flex-1">
                            {name}
                          </h3>
                          <div
                            className="shrink-0 rounded-full border border-gold/50 px-2.5 py-0.5"
                            style={{ backgroundColor: "color-mix(in oklab, var(--onyx) 85%, transparent)" }}
                          >
                            <span
                              className="font-display font-bold text-sm tabular-nums"
                              style={{ color: "var(--champagne)" }}
                            >
                              S.R {item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {desc && (
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {desc}
                          </p>
                        )}
                        <div className="mt-auto pt-3 h-px w-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
                      </div>
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
              <a href="https://snapchat.com/t/6ipYMBLJ" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:border-gold hover:shadow-glow-gold hover:scale-110">
                <SnapchatIcon className="h-5 w-5" />
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
