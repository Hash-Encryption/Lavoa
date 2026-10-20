export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export type CategoryType = 'shisha' | 'coffee' | 'tea' | 'snack';
export type CategoryFilter = 'all' | 'shisha' | 'coffee' | 'tea' | 'snack';

export type DrinkSize = 'small' | 'medium' | 'large';
export type MilkOption = 'whole' | 'skim' | 'almond' | 'oat';
export type SweetnessOption = 'none' | 'less' | 'normal' | 'extra';
export type TemperatureOption = 'normal' | 'extra_ice' | 'no_ice';

// Shisha Specific Modifiers
export type ShishaHeadType = 'clay' | 'apple' | 'pineapple';
export type ShishaHose = 'disposable' | 'silicone';
export type ShishaSmoke = 'light' | 'medium' | 'dense';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: CategoryType;
  subCategory: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  descriptionAr: string;
  ingredients?: string;
  ingredientsAr?: string;
  isPopular?: boolean;
  calories?: number;
}

export interface ItemCustomization {
  // Beverage modifiers
  size?: DrinkSize;
  milk?: MilkOption;
  sweetness?: SweetnessOption;
  temperature?: TemperatureOption;

  // Shisha modifiers
  headType?: ShishaHeadType;
  hose?: ShishaHose;
  iceTip?: boolean;
  smokeDensity?: ShishaSmoke;

  notes: string;
  additionalPrice: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization: ItemCustomization;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'dine-in' | 'takeaway';
export type LoungeArea = 'indoor' | 'terrace' | 'vip';
export type PaymentMethod = 'cash_waiter' | 'apple_pay' | 'card';
export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';

export interface CustomerOrder {
  id: string;
  receiptNumber: string;
  customerName?: string;
  customerPhone?: string;
  items: CartItem[];
  orderType: OrderType;
  loungeArea?: LoungeArea;
  tableNumber?: string;
  pickupTime?: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
  timeLeftSeconds: number;
}

export type CustomerMobileTab = 'home' | 'orders' | 'starred' | 'profile';

export interface SalesDataPoint {
  time: string;
  Coffee: number;
  Tea: number;
  Snack: number;
}

export interface ItemPerformancePoint {
  item: string;
  sales: number;
  orders: number;
  rating: number;
}

export interface Transaction {
  id: string;
  name: string;
  email: string;
  phone: string;
  items: string;
  value: number;
  status: 'Paid' | 'Pending' | 'Refunded';
}
