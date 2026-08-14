"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CURRENCY, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import {
  LeafIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  CartIcon,
  NaturalIcon,
  NoPreservativesIcon,
  MixesIcon,
  StarIcon,
  ShieldLockIcon,
} from "@/components/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const variantIdParam = (params?.variant as string) || "sprout";

  // Find active variant or default to SPROUT
  const initialVariant =
    PRODUCTS.find((p) => p.id.toLowerCase() === variantIdParam.toLowerCase()) || PRODUCTS[0];

  const [activeVariant, setActiveVariant] = useState<ProductVariant>(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("ingredients");

  // Keep state synced if URL parameter changes directly
  useEffect(() => {
    const matched = PRODUCTS.find((p) => p.id.toLowerCase() === variantIdParam.toLowerCase());
    if (matched) {
      setActiveVariant(matched);
    }
  }, [variantIdParam]);

  const handleVariantSwitch = (variant: ProductVariant) => {
    setActiveVariant(variant);
    // Smoothly update browser URL without full reload
    window.history.replaceState(null, "", `/shop/${variant.id}`);
  };

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(activeVariant.id, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 250);
  };

  const otherFlavours = PRODUCTS.filter((p) => p.id !== activeVariant.id);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#F8F3E9] py-4 border-b border-[#2A2521]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#2A2521]/60">
            <Link href="/" className="hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded px-1">
              Home
            </Link>
            <ChevronRightIcon size={14} />
            <Link href="/shop" className="hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded px-1">
              Shop
            </Link>
            <ChevronRightIcon size={14} />
            <span className="text-[#2A2521] font-bold uppercase tracking-wider" aria-current="page">
              {activeVariant.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Screen Reader Announcement for live variant switch */}
      <div className="sr-only" aria-live="polite">
        Switched to {activeVariant.name} {activeVariant.flavourLine}. Price is {CURRENCY.symbol}{activeVariant.price}.
      </div>

      {/* 2. Main Product Showcase Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Pack Shot on Diagonal Accent Panel with Splash Curve */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                className="relative w-full aspect-[4/4.2] rounded-[36px] p-8 sm:p-12 flex items-center justify-center overflow-hidden border border-[#2A2521]/10 shadow-lifted transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, #F8F3E9 25%, ${activeVariant.accentColor}25 100%)`,
                }}
              >
                {/* Diagonal Accent Split Motif Geometry */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: activeVariant.accentColor }}
                />

                {/* Splash Curve Mask SVG in Background */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    d="M50 150 C 120 80, 280 80, 350 160 C 400 220, 320 340, 200 350 C 80 360, 20 220, 50 150 Z"
                    fill={activeVariant.accentColor}
                  />
                </svg>

                {/* Main Pack Pouch Shot with explicit dimensions (no layout shift) */}
                <div className="relative w-[280px] sm:w-[340px] aspect-[1/1] z-10">
                  <Image
                    key={activeVariant.id}
                    src={activeVariant.packImage}
                    alt={`Urban Vital ${activeVariant.name} Multivitamin Powder - ${activeVariant.flavourLine}`}
                    width={420}
                    height={420}
                    priority
                    loading="eager"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(42,37,33,0.18)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Quick Trust Badges below image */}
              <div className="w-full grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="py-2.5 px-2 rounded-2xl bg-[#F8F3E9] text-[11px] font-bold text-[#2A2521] border border-[#2A2521]/5">
                  ✓ 100% Natural
                </div>
                <div className="py-2.5 px-2 rounded-2xl bg-[#F8F3E9] text-[11px] font-bold text-[#2A2521] border border-[#2A2521]/5">
                  ✓ No Preservatives
                </div>
                <div className="py-2.5 px-2 rounded-2xl bg-[#F8F3E9] text-[11px] font-bold text-[#2A2521] border border-[#2A2521]/5">
                  ✓ Net Wt. 200g
                </div>
              </div>
            </div>

            {/* Right Column: Variant Details, Switcher, Stepper & CTAs */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Variant Pill & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
                  style={{
                    backgroundColor: `${activeVariant.accentColor}20`,
                    borderColor: `${activeVariant.accentColor}60`,
                    color: "#2A2521",
                  }}
                >
                  {activeVariant.name}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#2A2521]/78">
                  <div className="flex text-[#D9A84E]">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={15} />
                    ))}
                  </div>
                  <span className="font-bold text-[#2A2521]">{activeVariant.rating}</span>
                  <span className="text-[#2A2521]/50">({activeVariant.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* H1 & Flavour Line */}
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] leading-tight">
                Multivitamin Powder
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#E2606B] font-semibold mt-1">
                {activeVariant.flavourLine}
              </p>

              {/* Benefit Callout at 78% opacity */}
              <p className="mt-4 text-base text-[#2A2521]/78 leading-relaxed">
                {activeVariant.description}
              </p>

              {/* Price & Weight */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521]">
                  {CURRENCY.symbol}
                  {activeVariant.price}
                </span>
                <span className="text-sm font-semibold text-[#2A2521]/55">
                  ({activeVariant.weight} • 20 Servings)
                </span>
              </div>

              {/* Variant Switcher Pills (Live Swap without layout shift) */}
              <div className="mt-8 pt-6 border-t border-[#2A2521]/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/60 mb-3">
                  Select Flavour Variant:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRODUCTS.map((variant) => {
                    const isSelected = activeVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleVariantSwitch(variant)}
                        aria-pressed={isSelected}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between min-h-[64px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          isSelected
                            ? "bg-[#2A2521] text-[#F8F3E9] border-[#2A2521] shadow-soft scale-[1.02]"
                            : "bg-[#F8F3E9] text-[#2A2521] border-[#2A2521]/10 hover:border-[#2A2521]/30"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{variant.name}</span>
                        <span
                          className={`text-[11px] font-medium ${
                            isSelected ? "text-white/80" : "text-[#2A2521]/60"
                          }`}
                        >
                          {variant.flavour}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart Action */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                {/* Stepper (44px min targets) */}
                <div className="flex items-center border border-[#2A2521]/15 rounded-2xl bg-[#F8F3E9] p-1 w-full sm:w-auto justify-between">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[#2A2521] hover:bg-white disabled:opacity-40 transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                  >
                    <MinusIcon size={16} />
                  </button>

                  <span className="w-12 text-center font-bold text-base text-[#2A2521]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[#2A2521] hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`flex-grow w-full py-4 px-8 rounded-2xl font-bold text-base tracking-wide flex items-center justify-center gap-2 min-h-[48px] shadow-lifted transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                    justAdded
                      ? "bg-[#8CC79B] text-[#2A2521]"
                      : "bg-[#E2606B] hover:bg-[#d44d58] text-white"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <CheckIcon size={20} />
                      <span>Added to Cart!</span>
                    </>
                  ) : isAdding ? (
                    <span>Adding to Cart...</span>
                  ) : (
                    <>
                      <CartIcon size={20} />
                      <span>
                        Add to Cart • {CURRENCY.symbol}
                        {activeVariant.price * quantity}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Claim Icon Row (3 Claims) */}
              <div className="mt-8 pt-6 border-t border-[#2A2521]/10 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#8CC79B]/20 text-[#2A2521] flex items-center justify-center">
                    <NaturalIcon size={18} />
                  </div>
                  <span className="text-xs font-bold text-[#2A2521]">100% Natural</span>
                  <span className="text-[10px] text-[#2A2521]/60">Wholefood origin</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#E2606B]/20 text-[#E2606B] flex items-center justify-center">
                    <NoPreservativesIcon size={18} />
                  </div>
                  <span className="text-xs font-bold text-[#2A2521]">0% Preservatives</span>
                  <span className="text-[10px] text-[#2A2521]/60">Chemical free</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#D9A84E]/25 text-[#C0812F] flex items-center justify-center">
                    <MixesIcon size={18} />
                  </div>
                  <span className="text-xs font-bold text-[#2A2521]">Water or Milk</span>
                  <span className="text-[10px] text-[#2A2521]/60">Instant 10s mix</span>
                </div>
              </div>

              {/* Accordions: Ingredients / How to Use / Storage & Shipping */}
              <div className="mt-10 flex flex-col gap-3">
                {/* 1. Ingredients */}
                <div className="border border-[#2A2521]/10 rounded-2xl overflow-hidden bg-[#F8F3E9]/40">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === "ingredients" ? "" : "ingredients")
                    }
                    aria-expanded={openAccordion === "ingredients"}
                    className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#2A2521] text-left hover:text-[#E2606B] transition-colors min-h-[44px]"
                  >
                    <span className="flex items-center gap-2">
                      <LeafIcon size={16} className="text-[#8CC79B]" />
                      Full Clean Ingredients List
                    </span>
                    <ChevronDownIcon
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === "ingredients" ? "rotate-180 text-[#E2606B]" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "ingredients" && (
                    <div className="px-5 pb-5 text-sm text-[#2A2521]/80 leading-relaxed border-t border-[#2A2521]/5 pt-3 animate-in fade-in duration-200">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {activeVariant.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8CC79B]" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-[#2A2521]/8">
                        <p className="text-[11px] text-[#2A2521]/60">
                          <strong>Allergen info:</strong> Free from gluten, soy, dairy, artificial sweeteners, and synthetic coloring agents.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. How to Use */}
                <div className="border border-[#2A2521]/10 rounded-2xl overflow-hidden bg-[#F8F3E9]/40">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === "usage" ? "" : "usage")}
                    aria-expanded={openAccordion === "usage"}
                    className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#2A2521] text-left hover:text-[#E2606B] transition-colors min-h-[44px]"
                  >
                    <span className="flex items-center gap-2">
                      <MixesIcon size={16} className="text-[#C0812F]" />
                      Serving Size & Daily Directions
                    </span>
                    <ChevronDownIcon
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === "usage" ? "rotate-180 text-[#E2606B]" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "usage" && (
                    <div className="px-5 pb-5 text-sm text-[#2A2521]/80 leading-relaxed border-t border-[#2A2521]/5 pt-3 animate-in fade-in duration-200">
                      <ol className="flex flex-col gap-2 text-xs">
                        {activeVariant.usageInstructions.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-bold text-[#E2606B]">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* 3. Storage & Shipping */}
                <div className="border border-[#2A2521]/10 rounded-2xl overflow-hidden bg-[#F8F3E9]/40">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")
                    }
                    aria-expanded={openAccordion === "shipping"}
                    className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#2A2521] text-left hover:text-[#E2606B] transition-colors min-h-[44px]"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldLockIcon size={16} className="text-[#8CC79B]" />
                      Storage, Shelf Life & Pan-India Shipping
                    </span>
                    <ChevronDownIcon
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === "shipping" ? "rotate-180 text-[#E2606B]" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "shipping" && (
                    <div className="px-5 pb-5 text-xs text-[#2A2521]/80 leading-relaxed border-t border-[#2A2521]/5 pt-3 animate-in fade-in duration-200 flex flex-col gap-2">
                      <p>
                        <strong>Storage:</strong> {activeVariant.storageInfo}
                      </p>
                      <p>
                        <strong>Shipping:</strong> {activeVariant.shippingInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Flavours Section */}
      <section className="py-20 bg-[#F8F3E9] border-t border-[#2A2521]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
                Complete The Routine
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-[#2A2521] mt-1">
                Explore Other Flavours
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#2A2521] hover:text-[#E2606B] transition-colors"
            >
              View Full Range →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherFlavours.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mobile Sticky Bottom Action Bar (Safe Area Compliant) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#2A2521]/10 px-4 py-3 shadow-lifted flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#2A2521]/60 tracking-wider">
            {activeVariant.name} • {activeVariant.flavour}
          </span>
          <p className="font-serif text-lg font-extrabold text-[#2A2521]">
            {CURRENCY.symbol}
            {activeVariant.price * quantity}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm min-h-[44px] ${
            justAdded ? "bg-[#8CC79B] text-[#2A2521]" : "bg-[#E2606B] text-white"
          }`}
        >
          {justAdded ? (
            <>
              <CheckIcon size={16} />
              <span>Added</span>
            </>
          ) : isAdding ? (
            <span>Adding...</span>
          ) : (
            <>
              <CartIcon size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
