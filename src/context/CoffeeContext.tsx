'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import {
  Product,
  CartItem,
  CategoryFilter,
  CategoryType,
  ItemCustomization,
  CustomerOrder,
  OrderType,
  LoungeArea,
  PaymentMethod,
  OrderStatus,
  CustomerMobileTab,
} from '../types';
import { PRODUCTS } from '../data/mockData';
import { TRANSLATIONS, Language, Direction } from '../translations';

interface CoffeeContextType {
  // Localization
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof TRANSLATIONS)['ar']) => string;
  formatCurrency: (amount: number) => string;
  getProductName: (p: Product) => string;
  getProductDescription: (p: Product) => string;
  getProductIngredients: (p: Product) => string;

  // Catalog & Navigation
  activeCategory: CategoryFilter;
  setActiveCategory: (cat: CategoryFilter) => void;
  subCategoryFilter: string;
  setSubCategoryFilter: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredProducts: Product[];
  peoplesChoice: Product[];

  // Mobile Bottom Navigation Tabs
  activeMobileTab: CustomerMobileTab;
  setActiveMobileTab: (tab: CustomerMobileTab) => void;

  // Customer & Lounge Table Info (Real & Persistent)
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  branchName: string;
  loungeArea: LoungeArea;
  setLoungeArea: (area: LoungeArea) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;

  // Cart & Pricing
  cart: CartItem[];
  addToCart: (product: Product, customization?: Partial<ItemCustomization>, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getItemCountInCart: (productId: string) => number;
  cartTotalCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  applyPromoCode: (code: string) => boolean;

  // Checkout & Payment
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;
  placeOrder: () => void;

  // Live Order Tracking (Persistent)
  activeOrders: CustomerOrder[];
  activeTrackingOrder: CustomerOrder | null;
  setActiveTrackingOrder: (order: CustomerOrder | null) => void;
  liveCountdownSeconds: number;
  liveStatus: OrderStatus;

  // Favorites (Persistent)
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Modals & Drawers
  customizingProduct: Product | null;
  setCustomizingProduct: (p: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isOrderPlacedSuccess: boolean;
  setIsOrderPlacedSuccess: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const CoffeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language & RTL Setup
  const [language, setLanguageState] = useState<Language>('ar');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('lavois_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const savedLang = localStorage.getItem('lavois_lang') as Language;
      if (savedLang === 'ar' || savedLang === 'en') {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
      }
    }
  }, []);

  const t = (key: keyof (typeof TRANSLATIONS)['ar']): string => {
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.ar[key] ?? String(key);
  };

  const formatCurrency = (amount: number): string => {
    const rounded = Number(amount.toFixed(2));
    if (language === 'ar') {
      const sar = Number((rounded * 3.75).toFixed(0));
      return `${sar} ر.س`;
    }
    return `$${rounded.toFixed(2)}`;
  };

  const getProductName = (p: Product): string => {
    if (language === 'ar' && p.nameAr) return p.nameAr;
    return p.name;
  };

  const getProductDescription = (p: Product): string => {
    if (language === 'ar' && p.descriptionAr) return p.descriptionAr;
    return p.description;
  };

  const getProductIngredients = (p: Product): string => {
    if (language === 'ar' && p.ingredientsAr) return p.ingredientsAr;
    return p.ingredients || '';
  };

  // 2. Navigation & Catalog Filter State
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMobileTab, setActiveMobileTab] = useState<CustomerMobileTab>('home');

  // Customer & Lounge Table Info (Persistent)
  const [customerName, setCustomerNameState] = useState<string>('محمد السعيد');
  const [customerPhone, setCustomerPhoneState] = useState<string>('0554128990');
  const branchName = language === 'ar' ? 'لاونج لافوا - فرع التحلية' : "L'Avois Lounge - Tahlia St";
  const [loungeArea, setLoungeAreaState] = useState<LoungeArea>('indoor');
  const [tableNumber, setTableNumberState] = useState<string>('T4');
  const [pickupTime, setPickupTime] = useState<string>('10-15 دقيقة');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');

  const setCustomerName = (name: string) => {
    setCustomerNameState(name);
    if (typeof window !== 'undefined') localStorage.setItem('lavois_name', name);
  };

  const setCustomerPhone = (phone: string) => {
    setCustomerPhoneState(phone);
    if (typeof window !== 'undefined') localStorage.setItem('lavois_phone', phone);
  };

  const setLoungeArea = (area: LoungeArea) => {
    setLoungeAreaState(area);
    if (typeof window !== 'undefined') localStorage.setItem('lavois_area', area);
  };

  const setTableNumber = (table: string) => {
    setTableNumberState(table);
    if (typeof window !== 'undefined') localStorage.setItem('lavois_table', table);
  };

  // 3. Persistent Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load persistent customer info & cart on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedName = localStorage.getItem('lavois_name');
        if (savedName) setCustomerNameState(savedName);

        const savedPhone = localStorage.getItem('lavois_phone');
        if (savedPhone) setCustomerPhoneState(savedPhone);

        const savedTable = localStorage.getItem('lavois_table');
        if (savedTable) setTableNumberState(savedTable);

        const savedArea = localStorage.getItem('lavois_area') as LoungeArea;
        if (savedArea) setLoungeAreaState(savedArea);

        const savedCart = localStorage.getItem('lavois_cart');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCart(parsed);
          } else {
            // Default initial authentic sample items
            setCart([
              {
                id: 'init-sh1',
                product: PRODUCTS[0], // Double Apple Al-Fakher
                quantity: 1,
                customization: {
                  headType: 'clay',
                  hose: 'disposable',
                  iceTip: true,
                  smokeDensity: 'medium',
                  notes: 'جمر طبيعي خفيف وسحب سلس',
                  additionalPrice: 2.6, // +10 SAR ice tip
                },
                unitPrice: 19.9,
                totalPrice: 19.9,
              },
              {
                id: 'init-c1',
                product: PRODUCTS[9], // Flat White
                quantity: 1,
                customization: {
                  size: 'medium',
                  milk: 'whole',
                  sweetness: 'normal',
                  temperature: 'normal',
                  notes: 'رسمة لاتيه أرت متقنة',
                  additionalPrice: 0.5,
                },
                unitPrice: 5.3,
                totalPrice: 5.3,
              },
            ]);
          }
        } else {
          setCart([
            {
              id: 'init-sh1',
              product: PRODUCTS[0],
              quantity: 1,
              customization: {
                headType: 'clay',
                hose: 'disposable',
                iceTip: true,
                smokeDensity: 'medium',
                notes: 'جمر طبيعي خفيف وسحب سلس',
                additionalPrice: 2.6,
              },
              unitPrice: 19.9,
              totalPrice: 19.9,
            },
          ]);
        }
      } catch (e) {
        console.error('Error restoring localStorage state:', e);
      }
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lavois_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash_waiter');

  // Modals & Drawers
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isOrderPlacedSuccess, setIsOrderPlacedSuccess] = useState<boolean>(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);

  // Favorites (Persistent)
  const [favorites, setFavorites] = useState<string[]>(['sh1', 'sh3', 'c2']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavs = localStorage.getItem('lavois_favs');
      if (savedFavs) {
        try {
          setFavorites(JSON.parse(savedFavs));
        } catch (_) {}
      }
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      if (typeof window !== 'undefined') localStorage.setItem('lavois_favs', JSON.stringify(next));
      return next;
    });
  };
  const isFavorite = (productId: string) => favorites.includes(productId);

  // 4. Cart Modifiers & Calculations
  const addToCart = (
    product: Product,
    customizationOptions?: Partial<ItemCustomization>,
    quantity: number = 1
  ) => {
    const isShisha = product.category === 'shisha';

    let defaultCustomization: ItemCustomization;
    if (isShisha) {
      defaultCustomization = {
        headType: 'clay',
        hose: 'disposable',
        iceTip: false,
        smokeDensity: 'medium',
        notes: '',
        additionalPrice: 0,
      };
    } else {
      defaultCustomization = {
        size: 'medium',
        milk: 'whole',
        sweetness: 'normal',
        temperature: 'normal',
        notes: '',
        additionalPrice: 0.5,
      };
    }

    const finalCustomization = { ...defaultCustomization, ...customizationOptions };

    // Calculate modifier upcharges
    let addPrice = 0;
    if (isShisha) {
      if (finalCustomization.headType === 'apple') addPrice += 4.0; // +15 SAR
      if (finalCustomization.headType === 'pineapple') addPrice += 6.5; // +25 SAR
      if (finalCustomization.hose === 'silicone') addPrice += 1.3; // +5 SAR
      if (finalCustomization.iceTip) addPrice += 2.6; // +10 SAR
    } else {
      if (finalCustomization.size === 'medium') addPrice += 0.5;
      if (finalCustomization.size === 'large') addPrice += 1.0;
      if (finalCustomization.milk === 'oat' || finalCustomization.milk === 'almond') addPrice += 0.5;
    }

    finalCustomization.additionalPrice = addPrice;
    const unitPrice = product.price + addPrice;
    const totalPrice = unitPrice * quantity;

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      quantity,
      customization: finalCustomization,
      unitPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newItem]);

    const title = language === 'ar' ? (product.nameAr || product.name) : product.name;
    toast.success(
      language === 'ar' ? `تمت إضافة "${title}" لطلبات طاولتك!` : `Added "${title}" to your table order!`,
      {
        description: `${quantity}x • ${formatCurrency(totalPrice)}`,
        duration: 2500,
      }
    );
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemCountInCart = (productId: string): number => {
    return cart.filter((i) => i.product.id === productId).reduce((sum, i) => sum + i.quantity, 0);
  };

  // Financial Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.15; // 15% VAT
  const total = taxableAmount + tax;

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'LAVOIS10' || trimmed === 'VIP10' || trimmed === 'GREEN10') {
      setPromoApplied(true);
      toast.success(
        language === 'ar' ? 'تم تفعيل خصم لافوا 10% بنجاح!' : "10% L'Avois VIP discount applied!"
      );
      return true;
    } else {
      toast.error(
        language === 'ar' ? 'كود الخصم غير صالح. جرّب: LAVOIS10' : 'Invalid code. Try: LAVOIS10'
      );
      return false;
    }
  };

  // 5. Active Orders & Persistent Live Tracking
  const [activeOrders, setActiveOrders] = useState<CustomerOrder[]>([]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<CustomerOrder | null>(null);
  const [liveCountdownSeconds, setLiveCountdownSeconds] = useState<number>(75);
  const [liveStatus, setLiveStatus] = useState<OrderStatus>('preparing');

  // Load persistent orders on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedOrders = localStorage.getItem('lavois_orders');
        if (savedOrders) {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setActiveOrders(parsed);
            setActiveTrackingOrder(parsed[0]);
          } else {
            // Default sample active order
            const initialOrder: CustomerOrder = {
              id: 'ord-LV-8492',
              receiptNumber: '#LV-8492',
              customerName: 'محمد السعيد',
              customerPhone: '0554128990',
              items: [
                {
                  id: 'item-init-1',
                  product: PRODUCTS[2], // L'Avois Royal Signature
                  quantity: 1,
                  customization: {
                    headType: 'clay',
                    hose: 'disposable',
                    iceTip: true,
                    smokeDensity: 'medium',
                    notes: 'جمر هادئ وسريع',
                    additionalPrice: 2.6,
                  },
                  unitPrice: 25.2,
                  totalPrice: 25.2,
                },
              ],
              orderType: 'dine-in',
              loungeArea: 'indoor',
              tableNumber: 'T4',
              paymentMethod: 'cash_waiter',
              subtotal: 25.2,
              discount: 0,
              tax: 3.78,
              total: 28.98,
              status: 'preparing',
              createdAt: 'منذ دقيقة',
              estimatedMinutes: 3,
              timeLeftSeconds: 75,
            };
            setActiveOrders([initialOrder]);
            setActiveTrackingOrder(initialOrder);
          }
        }
      } catch (_) {}
    }
  }, []);

  // Live timer tick
  useEffect(() => {
    if (liveCountdownSeconds <= 0) {
      setLiveStatus('ready');
      return;
    }

    const interval = setInterval(() => {
      setLiveCountdownSeconds((prev) => {
        if (prev <= 1) {
          setLiveStatus('ready');
          return 0;
        }
        if (prev <= 25) {
          setLiveStatus('ready');
        } else if (prev <= 60) {
          setLiveStatus('preparing');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [liveCountdownSeconds]);

  // 6. Real Place Order Flow
  const placeOrder = () => {
    if (cart.length === 0) return;

    const receiptNum = `#LV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      receiptNumber: receiptNum,
      customerName,
      customerPhone,
      items: [...cart],
      orderType,
      loungeArea: orderType === 'dine-in' ? loungeArea : undefined,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      pickupTime: orderType === 'takeaway' ? pickupTime : undefined,
      paymentMethod,
      subtotal,
      discount,
      tax,
      total,
      status: 'received',
      createdAt: language === 'ar' ? 'الآن' : 'Just now',
      estimatedMinutes: 4,
      timeLeftSeconds: 90,
    };

    setActiveOrders((prev) => {
      const next = [newOrder, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('lavois_orders', JSON.stringify(next));
      }
      return next;
    });

    setActiveTrackingOrder(newOrder);
    setLiveCountdownSeconds(90);
    setLiveStatus('received');

    // Confetti explosion in gold & emerald colors
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFE082', '#A68222', '#121316', '#FFFFFF'],
      });
    } catch (_) {}

    clearCart();
    setIsCartDrawerOpen(false);
    setIsOrderPlacedSuccess(true);
  };

  // 7. Filtered Products & People's Choice
  const peoplesChoice = PRODUCTS.filter((p) => p.isPopular).slice(0, 8);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    if (subCategoryFilter !== 'All') {
      if (product.subCategory.toLowerCase() !== subCategoryFilter.toLowerCase()) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchNameAr = product.nameAr?.toLowerCase().includes(q) || false;
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchDescAr = product.descriptionAr?.toLowerCase().includes(q) || false;
      return matchName || matchNameAr || matchDesc || matchDescAr;
    }

    return true;
  });

  return (
    <CoffeeContext.Provider
      value={{
        language,
        direction,
        toggleLanguage,
        setLanguage,
        t,
        formatCurrency,
        getProductName,
        getProductDescription,
        getProductIngredients,
        activeCategory,
        setActiveCategory,
        subCategoryFilter,
        setSubCategoryFilter,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        peoplesChoice,
        activeMobileTab,
        setActiveMobileTab,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        branchName,
        loungeArea,
        setLoungeArea,
        tableNumber,
        setTableNumber,
        pickupTime,
        setPickupTime,
        orderType,
        setOrderType,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemCountInCart,
        cartTotalCount,
        subtotal,
        discount,
        tax,
        total,
        promoCode,
        setPromoCode,
        promoApplied,
        applyPromoCode,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        activeOrders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        liveCountdownSeconds,
        liveStatus,
        favorites,
        toggleFavorite,
        isFavorite,
        customizingProduct,
        setCustomizingProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isOrderPlacedSuccess,
        setIsOrderPlacedSuccess,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) throw new Error('useCoffee must be used within a CoffeeProvider');
  return context;
};
