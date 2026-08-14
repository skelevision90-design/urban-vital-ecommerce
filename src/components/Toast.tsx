"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckIcon, SparklesIcon, CloseIcon } from "./Icons";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto bg-[#2A2521] text-[#F8F3E9] px-4 py-3 rounded-2xl shadow-lifted border border-white/10 flex items-center justify-between gap-3 transition-all duration-200 transform translate-y-0 opacity-100"
        >
          <div className="flex items-center gap-3">
            {t.type === "undo" ? (
              <span className="w-7 h-7 rounded-full bg-[#E2606B]/20 text-[#E2606B] flex items-center justify-center flex-shrink-0">
                <SparklesIcon size={15} />
              </span>
            ) : (
              <span className="w-7 h-7 rounded-full bg-[#8CC79B]/20 text-[#8CC79B] flex items-center justify-center flex-shrink-0">
                <CheckIcon size={15} />
              </span>
            )}
            <p className="text-sm font-medium leading-tight text-[#F8F3E9]/90">{t.text}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {t.onAction && t.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  t.onAction?.();
                  removeToast(t.id);
                }}
                className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#8CC79B] text-[#2A2521] rounded-full hover:bg-[#8CC79B]/90 focus-visible:ring-2 focus-visible:ring-[#8CC79B] transition-colors"
              >
                {t.actionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
              className="p-1 text-white/50 hover:text-white rounded-full transition-colors"
            >
              <CloseIcon size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
