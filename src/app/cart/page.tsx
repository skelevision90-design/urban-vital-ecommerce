"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, CURRENCY } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import {
  LeafIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ChevronRightIcon,
  SparklesIcon,
  CheckIcon,
  ShieldLockIcon,
} from "@/components/Icons";

export default function CartPage() {
  const {
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
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(inputCoupon);
    setInputCoupon("");
  };

  // Cross-sell items: products not currently in cart
  const cartItemIds = items.map((i) => i.id);
  const crossSellProducts = PRODUCTS.filter((p) => !cartItemIds.includes(p.id));

  return (
    <div className="w-full flex flex-col bg-[#F8F3E9] min-h-[calc(100vh-140px)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#2A2521]/60 mb-6">
          <Link href="/" className="hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded px-1">
            Home
          </Link>
          <ChevronRightIcon size={14} />
          <Link href="/shop" className="hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded px-1">
            Shop
          </Link>
          <ChevronRightIcon size={14} />
          <span className="text-[#2A2521] font-bold" aria-current="page">
            Your Cart ({itemCount})
          </span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              Review Items
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-1">
              Shopping Cart
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 hover:text-[#E2606B] transition-colors flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <span>→</span>
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Line Items */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Free Shipping Progress Ribbon (Motif 3) */}
              <div className="bg-white rounded-3xl p-5 border border-[#2A2521]/10 shadow-soft">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <div className="flex items-center gap-1.5 text-[#2A2521]">
                    <span className="text-[#8CC79B]">
                      <LeafIcon size={16} />
                    </span>
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-[#8CC79B] font-extrabold">
                        Congratulations! You unlocked FREE Pan-India Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <strong className="text-[#E2606B]">
                          {CURRENCY.symbol}
                          {amountNeededForFreeShipping}
                        </strong>{" "}
                        more to qualify for FREE shipping!
                      </span>
                    )}
                  </div>
                  <span className="text-[#2A2521]/60">
                    Threshold: {CURRENCY.symbol}
                    {freeShippingThreshold}
                  </span>
                </div>

                {/* Progress bar with leaf indicator */}
                <div className="relative w-full h-3 bg-[#F8F3E9] rounded-full overflow-hidden border border-[#2A2521]/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#8CC79B] to-[#E2606B] transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-4 sm:p-6 border border-[#2A2521]/10 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200"
                  >
                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, #F8F3E9 0%, ${item.variant.accentColor}25 100%)`,
                        }}
                      >
                        <Image
                          src={item.variant.packImage}
                          alt={item.variant.name}
                          width={90}
                          height={90}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${item.variant.accentColor}20`,
                              color: "#2A2521",
                            }}
                          >
                            {item.variant.name}
                          </span>
                          <span className="text-xs text-[#2A2521]/55">{item.variant.weight}</span>
                        </div>

                        <Link
                          href={`/shop/${item.variant.id}`}
                          className="font-serif text-lg font-bold text-[#2A2521] hover:text-[#E2606B] transition-colors mt-0.5"
                        >
                          {item.variant.flavourLine}
                        </Link>

                        <span className="text-xs text-[#2A2521]/65 font-medium mt-0.5">
                          Unit: {CURRENCY.symbol}
                          {item.variant.price}
                        </span>
                      </div>
                    </div>

                    {/* Stepper + Total + Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#2A2521]/5">
                      {/* Quantity Stepper (44px target) */}
                      <div className="flex items-center border border-[#2A2521]/15 rounded-xl bg-[#F8F3E9] p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.variant.name}`}
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2A2521] hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="w-9 text-center font-bold text-sm text-[#2A2521]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.variant.name}`}
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2A2521] hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-xs text-[#2A2521]/55 uppercase block font-semibold">
                          Total
                        </span>
                        <span className="font-serif text-lg font-extrabold text-[#2A2521]">
                          {CURRENCY.symbol}
                          {item.variant.price * item.quantity}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.variant.name} from cart`}
                        className="p-2 text-[#2A2521]/50 hover:text-[#E2606B] rounded-xl hover:bg-[#E2606B]/10 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2A2521]/10 shadow-lifted">
                <h2 className="font-serif text-2xl font-bold text-[#2A2521] pb-4 border-b border-[#2A2521]/10">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3.5 py-5 text-sm border-b border-[#2A2521]/10">
                  <div className="flex items-center justify-between text-[#2A2521]/78">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-bold text-[#2A2521]">
                      {CURRENCY.symbol}
                      {subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#2A2521]/78">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-[#8CC79B] font-bold">FREE</strong>
                      ) : (
                        <span className="font-bold text-[#2A2521]">
                          {CURRENCY.symbol}
                          {shipping}
                        </span>
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#8CC79B] font-bold">
                      <span className="flex items-center gap-1">
                        <span>Coupon ({promoCode})</span>
                        <button
                          type="button"
                          onClick={removePromoCode}
                          className="text-[10px] underline text-red-500 ml-1"
                        >
                          Remove
                        </button>
                      </span>
                      <span>
                        − {CURRENCY.symbol}
                        {discountAmount}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#2A2521] pt-3 border-t border-[#2A2521]/5">
                    <span className="font-serif text-lg font-bold">Estimated Total</span>
                    <span className="font-serif text-2xl font-extrabold text-[#2A2521]">
                      {CURRENCY.symbol}
                      {total}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input WITH visible label + helper text */}
                <form onSubmit={handleApplyCoupon} className="mt-5">
                  <label
                    htmlFor="promo-code-input"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/70 mb-1.5"
                  >
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promo-code-input"
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. NATURAL10"
                      className="flex-grow px-3.5 py-2.5 rounded-xl border border-[#2A2521]/15 bg-[#F8F3E9] text-xs font-bold uppercase text-[#2A2521] focus-visible:ring-2 focus-visible:ring-[#E2606B] min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#2A2521] text-[#F8F3E9] text-xs font-bold uppercase tracking-wider hover:bg-[#2A2521]/90 min-h-[44px]"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Helper / Status text */}
                  {promoError && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5" role="alert">
                      {promoError}
                    </p>
                  )}
                  {promoSuccess && (
                    <p className="text-xs text-[#8CC79B] font-bold mt-1.5 flex items-center gap-1">
                      <CheckIcon size={14} />
                      {promoSuccess}
                    </p>
                  )}
                  {!promoError && !promoSuccess && (
                    <p className="text-[11px] text-[#2A2521]/55 mt-1.5">
                      Use code <strong>NATURAL10</strong> for 10% off your order.
                    </p>
                  )}
                </form>

                {/* Checkout CTA Button */}
                <Link
                  href="/checkout"
                  className="mt-6 w-full py-4 px-6 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base tracking-wide flex items-center justify-center gap-2 min-h-[48px] shadow-lifted transition-all duration-200 active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                >
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#2A2521]/60">
                  <ShieldLockIcon size={16} className="text-[#8CC79B]" />
                  <span>256-Bit SSL Encrypted Safe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State View */
          <div className="bg-white rounded-3xl p-12 sm:p-16 border border-[#2A2521]/10 shadow-soft text-center max-w-xl mx-auto flex flex-col items-center">
            {/* CSS Splash Illustration with Brand Emblems */}
            <div className="w-24 h-24 rounded-full bg-[#E2606B]/15 text-[#E2606B] flex items-center justify-center mb-6">
              <SparklesIcon size={40} />
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#2A2521]">
              Your Cart is Empty
            </h2>
            <p className="mt-3 text-base text-[#2A2521]/78 leading-relaxed">
              Looks like you haven't added any 100% natural multivitamin powders to your cart yet.
            </p>

            <Link
              href="/shop"
              className="mt-8 px-8 py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base tracking-wide shadow-lifted hover:scale-105 active:scale-95 transition-all duration-200 min-h-[48px] flex items-center justify-center"
            >
              Shop the Range
            </Link>
          </div>
        )}

        {/* Cross-Sell Row: Flavours not in cart */}
        {crossSellProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#2A2521]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
                  Complete The Routine
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A2521] mt-1">
                  You Might Also Like
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 hover:text-[#E2606B] transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {crossSellProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
