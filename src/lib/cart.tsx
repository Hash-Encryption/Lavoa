import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  imageUrl?: string;
  qty: number;
};

export type OrderType = "dine-in" | "takeaway";

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
  orderType: OrderType;
  tableNumber: string;
  notes: string;
  setIsOpen: (open: boolean) => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  setNotes: (notes: string) => void;
  addItem: (item: { name: string; nameEn: string; price: number; imageUrl?: string }, categoryId?: string) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  getItemQty: (id: string) => number;
  getItemId: (nameEn: string, name: string, categoryId?: string) => string;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "lavoa_cart_v1";

export const WHATSAPP_NUMBER = "966551117889";

export function getItemId(nameEn: string, name: string, categoryId = ""): string {
  const base = nameEn || name;
  return `${categoryId}_${base.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON parse errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items, isLoaded]);

  const addItem = (item: { name: string; nameEn: string; price: number; imageUrl?: string }, categoryId = "") => {
    const id = getItemId(item.nameEn, item.name, categoryId);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id,
          name: item.name,
          nameEn: item.nameEn,
          price: item.price,
          imageUrl: item.imageUrl,
          qty: 1,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const increment = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decrement = (id: string) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        if (i.qty > 1) return [{ ...i, qty: i.qty - 1 }];
        return [];
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQty = (id: string) => {
    return items.find((i) => i.id === id)?.qty ?? 0;
  };

  const { itemCount, totalPrice } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const item of items) {
      count += item.qty;
      total += item.qty * item.price;
    }
    return { itemCount: count, totalPrice: total };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        isOpen,
        orderType,
        tableNumber,
        notes,
        setIsOpen,
        setOrderType,
        setTableNumber,
        setNotes,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        getItemQty,
        getItemId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
