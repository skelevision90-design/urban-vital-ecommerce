"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductVariant, CURRENCY } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { CheckIcon, LeafIcon, CartIcon } from "./Icons";

interface ProductCardProps {
  product: ProductVariant;
  lazy?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lazy = true }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || justAdded) return;

    setIsAdding(true);
    setTimeout(() => {
      addToCart(product.id, 1);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 250);
  };

  return (
    <div className="group relative rounded-3xl bg-white border border-[#2A2521]/10 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* 1. Diagonal Accent Top Header (Motif 1) */}
      <div
        className="relative pt-6 px-6 pb-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.accentColor}18 0%, ${product.accentSecondary}25 100%)`,
        }}
      >
        {/* Subtle diagonal split background geometry */}
        <div
          className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-30 blur-xl pointer-events-none"
          style={{ backgroundColor: product.accentColor }}
        />

        <div className="flex items-center justify-between relative z-10">
          {/* Pill Badge (Motif 2) */}
          <span
            className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: `${product.accentColor}50`,
              color: "#2A2521",
            }}
          >
            {product.name}
          </span>
          <span className="text-xs text-[#2A2521]/55 font-medium">{product.weight}</span>
        </div>

        {/* Product Pack Shot */}
        <Link
          href={`/shop/${product.id}`}
          className="block relative w-full aspect-[4/3.8] mt-2 mb-1 group-hover:scale-105 transition-transform duration-300"
          aria-label={`View ${product.name} Multivitamin Powder - ${product.flavourLine}`}
        >
          <Image
            src={product.packImage}
            alt={`Urban Vital ${product.name} Multivitamin Powder pouch - ${product.flavourLine}`}
            width={260}
            height={260}
            loading={lazy ? "lazy" : "eager"}
            className="w-full h-full object-contain filter drop-shadow-[0_12px_18px_rgba(42,37,33,0.12)]"
          />
        </Link>
      </div>

      {/* 2. Product Details */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div>
          {/* Flavour in Warm Serif (Fraunces) */}
          <Link href={`/shop/${product.id}`} className="group-hover:text-[#E2606B] transition-colors">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2521] leading-tight">
              {product.flavourLine}
            </h3>
          </Link>

          {/* Benefit at 78% Opacity Tier */}
          <p className="text-sm text-[#2A2521]/78 font-medium mt-1 line-clamp-2">
            {product.tagline}
          </p>

          {/* Key Ingredients highlights with Leaf mark (Motif 4) */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2A2521]/60">
            <span className="text-[#8CC79B] flex-shrink-0">
              <LeafIcon size={14} />
            </span>
            <span className="truncate">{product.ingredients[0]}</span>
          </div>
        </div>

        {/* 3. Bottom Row: Price & CTAs */}
        <div className="pt-3 border-t border-[#2A2521]/8 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-[#2A2521]/55 uppercase tracking-wider font-semibold">
              Price
            </span>
            <span className="text-xl font-extrabold text-[#2A2521]">
              {CURRENCY.symbol}
              {product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/shop/${product.id}`}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2A2521] bg-[#2A2521]/5 hover:bg-[#2A2521]/10 min-h-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
            >
              View
            </Link>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              aria-label={`Add ${product.name} to cart`}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider min-h-[44px] flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                justAdded
                  ? "bg-[#8CC79B] text-[#2A2521]"
                  : "bg-[#E2606B] hover:bg-[#d44d58] text-white"
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
                  <CartIcon size={15} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
