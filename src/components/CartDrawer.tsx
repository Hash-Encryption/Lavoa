import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Utensils, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useCart, WHATSAPP_NUMBER } from "@/lib/cart";

type Props = {
  lang: "ar" | "en";
};

export function CartDrawer({ lang }: Props) {
  const {
    items,
    itemCount,
    totalPrice,
    isOpen,
    setIsOpen,
    increment,
    decrement,
    removeItem,
    clearCart,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    notes,
    setNotes,
  } = useCart();

  const isAr = lang === "ar";

  const handleCheckout = () => {
    if (items.length === 0) return;

    const brandTitle = isAr ? "👑 *طلب جديد من لافوا لاونج | LAVOA*" : "👑 *New Order from LAVOA LOUNGE*";
    const divider = "━━━━━━━━━━━━━━━━━━━━";
    
    const typeText = orderType === "dine-in" 
      ? (isAr ? `📍 نوع الطلب: جلسة داخل اللاونج ${tableNumber ? `(طاولة: ${tableNumber})` : ""}` : `📍 Order Type: Dine-in ${tableNumber ? `(Table: ${tableNumber})` : ""}`)
      : (isAr ? "🛍️ نوع الطلب: استلام خارجي (تيك أواي)" : "🛍️ Order Type: Takeaway");

    const itemsHeader = isAr ? "📋 *تفاصيل الأصناف:*" : "📋 *Order Items:*";
    const itemsList = items
      .map((item) => {
        const title = isAr ? item.name : item.nameEn;
        const linePrice = (item.price * item.qty).toFixed(2);
        return `• ${item.qty}× ${title} — ${linePrice} ر.س`;
      })
      .join("\n");

    const totalText = isAr 
      ? `💵 *المجموع الإجمالي: ${totalPrice.toFixed(2)} ر.س*` 
      : `💵 *Total Amount: S.R ${totalPrice.toFixed(2)}*`;

    const notesText = notes.trim()
      ? (isAr ? `\n📝 ملاحظات: ${notes.trim()}` : `\n📝 Special Requests: ${notes.trim()}`)
      : "";

    const message = `${brandTitle}\n${divider}\n${typeText}\n${divider}\n${itemsHeader}\n${itemsList}\n${divider}\n${totalText}${notesText}\n${divider}\n${isAr ? "شكراً لكم، بانتظار تأكيد الطلب ✨" : "Thank you, awaiting your confirmation ✨"}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: isAr ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={`absolute top-0 bottom-0 ${
              isAr ? "left-0" : "right-0"
            } flex w-full max-w-md flex-col border-x border-gold/30 bg-[#0d0d11]/95 text-foreground shadow-2xl backdrop-blur-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold border border-gold/30 shadow-gold">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display" style={{ color: "var(--champagne)" }}>
                    {isAr ? "سلة الطلبات" : "Your Order"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {itemCount} {isAr ? (itemCount === 1 ? "صنف محدد" : "أصناف محددة") : itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-400 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{isAr ? "تفريغ" : "Clear"}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gold/30">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12 px-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/10 border border-gold/25 text-gold/60 mb-4">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    {isAr ? "سلتك فارغة حالياً" : "Your order is empty"}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    {isAr
                      ? "تصفح قائمتنا الفاخرة واختر ما يناسب ذائقتك من القهوة، الحلويات، والمشروبات."
                      : "Explore our menu and add your favorite coffees, desserts, or shisha."}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow-gold transition-all"
                  >
                    {isAr ? "استكشف القائمة" : "Browse Menu"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => {
                      const name = isAr ? item.name : item.nameEn;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white/[0.02] p-3 transition-colors hover:border-gold/40"
                        >
                          {/* Thumbnail */}
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={name}
                              className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-gold/20"
                            />
                          ) : (
                            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-onyx border border-gold/20">
                              <Utensils className="h-6 w-6 text-gold/40" />
                            </div>
                          )}

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground leading-tight truncate">
                              {name}
                            </h4>
                            <div className="mt-1 text-xs text-gold/80 font-display">
                              S.R {item.price.toFixed(2)}
                            </div>

                            {/* Counter Stepper */}
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-onyx/80 px-2 py-0.5">
                              <button
                                onClick={() => decrement(item.id)}
                                className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:text-gold transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-bold tabular-nums text-foreground">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => increment(item.id)}
                                className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:text-gold transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Subtotal & Delete */}
                          <div className="flex flex-col items-end justify-between self-stretch">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground/60 hover:text-rose-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-display text-sm font-bold text-gold tabular-nums">
                              S.R {(item.price * item.qty).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Options */}
                  <div className="mt-6 space-y-4 rounded-xl border border-gold/25 bg-black/40 p-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gold">
                      {isAr ? "نوع الطلب" : "Order Type"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType("dine-in")}
                        className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all border ${
                          orderType === "dine-in"
                            ? "bg-gold/20 border-gold text-gold shadow-gold"
                            : "border-white/10 text-muted-foreground hover:border-gold/40"
                        }`}
                      >
                        <Utensils className="h-3.5 w-3.5" />
                        <span>{isAr ? "جلسة باللاونج" : "Dine-in"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType("takeaway")}
                        className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all border ${
                          orderType === "takeaway"
                            ? "bg-gold/20 border-gold text-gold shadow-gold"
                            : "border-white/10 text-muted-foreground hover:border-gold/40"
                        }`}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>{isAr ? "استلام خارجي" : "Takeaway"}</span>
                      </button>
                    </div>

                    {orderType === "dine-in" && (
                      <div className="space-y-1 pt-1">
                        <label className="text-xs text-muted-foreground">
                          {isAr ? "رقم الطاولة (اختياري)" : "Table Number (Optional)"}
                        </label>
                        <input
                          type="text"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          placeholder={isAr ? "مثال: طاولة 5 أو VIP 2" : "e.g. Table 5 or VIP"}
                          className="w-full rounded-lg border border-gold/30 bg-onyx/80 px-3 py-2.5 text-[16px] text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-1 pt-1">
                      <label className="text-xs text-muted-foreground">
                        {isAr ? "ملاحظات إضافية (اختياري)" : "Special Requests (Optional)"}
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        placeholder={isAr ? "مثال: سكر زيادة، خالي من الثلج، رأس أناناس..." : "Any preferences or notes..."}
                        className="w-full rounded-lg border border-gold/30 bg-onyx/80 px-3 py-2.5 text-[16px] text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gold/25 bg-[#0a0a0e] p-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{isAr ? "المجموع الفرعي" : "Subtotal"}</span>
                    <span className="tabular-nums">S.R {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{isAr ? "الضريبة المقدرة (شاملة)" : "Taxes (Included)"}</span>
                    <span className="text-emerald-400 font-medium">{isAr ? "شامل الضريبة" : "Included"}</span>
                  </div>
                  <div className="h-px bg-gold/20 my-2" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {isAr ? "المجموع النهائي" : "Total Amount"}
                    </span>
                    <span className="font-display text-2xl font-black text-gold tabular-nums">
                      S.R {totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="group relative w-full overflow-hidden rounded-full bg-[#25D366] py-3.5 px-6 font-bold text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all hover:bg-[#20ba5a] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span className="text-sm sm:text-base font-bold">
                    {isAr ? "إرسال الطلب عبر واتساب" : "Order via WhatsApp"}
                  </span>
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
