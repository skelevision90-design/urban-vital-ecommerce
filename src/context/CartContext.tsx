"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { PRODUCTS, CURRENCY, ProductVariant } from "@/data/products";

export interface CartItem {
  id: string; // product variant id
  variant: ProductVariant;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "undo";
  text: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
  discountAmount: number;
  promoCode: string;
  promoError: string;
  promoSuccess: string;
  total: number;
  toasts: ToastMessage[];
  addToCart: (variantId: string, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "urban_vital_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>("");
  const [promoSuccess, setPromoSuccess] = useState<string>("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Restore cart on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Re-hydrate with actual product references from data file
          const validItems: CartItem[] = [];
          parsed.forEach((raw) => {
            const product = PRODUCTS.find((p) => p.id === raw.id);
            if (product && typeof raw.quantity === "number" && raw.quantity > 0) {
              validItems.push({
                id: product.id,
                variant: product,
                quantity: Math.min(raw.quantity, 99),
              });
            }
          });
          setItems(validItems);
        }
      }
    } catch (e) {
      // Fallback gracefully on restricted environments
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const serialized = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serialized));
    } catch (e) {
      // Fallback gracefully on storage quota limits
    }
  }, [items, isHydrated]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const duration = toast.duration || 4000;
      const newToast: ToastMessage = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const addToCart = useCallback(
    (variantId: string, quantity = 1) => {
      const product = PRODUCTS.find((p) => p.id === variantId);
      if (!product) return;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === variantId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(updated[existingIndex].quantity + quantity, 99),
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: product.id,
              variant: product,
              quantity: Math.min(quantity, 99),
            },
          ];
        }
      });

      addToast({
        type: "success",
        text: `Added ${quantity > 1 ? `${quantity}x ` : ""}${product.name} (${product.flavour}) to your cart!`,
        duration: 3500,
      });
    },
    [addToast]
  );

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === variantId ? { ...item, quantity: Math.min(Math.max(1, quantity), 99) } : item
      )
    );
  }, []);

  const removeFromCart = useCallback(
    (variantId: string) => {
      const targetItem = items.find((i) => i.id === variantId);
      if (!targetItem) return;

      const previousItems = [...items];
      setItems((prev) => prev.filter((i) => i.id !== variantId));

      // 5-second Undo Toast (accessible polite announcement)
      addToast({
        type: "undo",
        text: `Removed ${targetItem.variant.name} from cart.`,
        actionLabel: "Undo",
        onAction: () => {
          setItems(previousItems);
          addToast({
            type: "success",
            text: `Restored ${targetItem.variant.name} to cart.`,
            duration: 3000,
          });
        },
        duration: 5000,
      });
    },
    [items, addToast]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode("");
    setDiscountPercent(0);
    setPromoError("");
    setPromoSuccess("");
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
  }, []);

  const applyPromoCode = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError("Please enter a coupon code.");
      setPromoSuccess("");
      return;
    }

    if (clean === "NATURAL10") {
      setDiscountPercent(0.1);
      setPromoCode("NATURAL10");
      setPromoSuccess("10% discount applied!");
      setPromoError("");
      addToast({ type: "success", text: "Coupon NATURAL10 applied: 10% discount!" });
    } else if (clean === "GROWTH15") {
      setDiscountPercent(0.15);
      setPromoCode("GROWTH15");
      setPromoSuccess("15% discount applied!");
      setPromoError("");
      addToast({ type: "success", text: "Coupon GROWTH15 applied: 15% discount!" });
    } else {
      setPromoError("Invalid coupon code. Try 'NATURAL10' for 10% off.");
      setPromoSuccess("");
    }
  }, [addToast]);

  const removePromoCode = useCallback(() => {
    setPromoCode("");
    setDiscountPercent(0);
    setPromoError("");
    setPromoSuccess("");
  }, []);

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.variant.price * curr.quantity, 0);
  const freeShippingThreshold = CURRENCY.freeShippingThreshold;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 79;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const discountAmount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        freeShippingProgress,
        discountAmount,
        promoCode,
        promoError,
        promoSuccess,
        total,
        toasts,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
