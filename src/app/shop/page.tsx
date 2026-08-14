"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, ProductVariant, CURRENCY } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ClaimRibbon } from "@/components/ClaimRibbon";
import {
  ChevronRightIcon,
  CheckIcon,
  LeafIcon,
  SparklesIcon,
} from "@/components/Icons";

export default function ShopPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("featured");

  const filterOptions = [
    { id: "all", label: "All Flavours" },
    { id: "Growth & Immunity", label: "Growth & Immunity" },
    { id: "Bone & Heart", label: "Bone & Heart" },
    { id: "Focus & Energy", label: "Focus & Energy" },
    { id: "Daily Energy", label: "Daily Energy" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedFilter !== "all") {
      list = list.filter((p) => p.tagline.toLowerCase().includes(selectedFilter.toLowerCase()));
    }

    if (selectedSort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedFilter, selectedSort]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Header with Diagonal Motif Band & Breadcrumbs */}
      <section className="relative pt-8 pb-12 bg-gradient-to-b from-[#F8F3E9] to-white border-b border-[#2A2521]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#2A2521]/60 mb-4">
            <Link href="/" className="hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded px-1">
              Home
            </Link>
            <ChevronRightIcon size={14} />
            <span className="text-[#2A2521] font-bold" aria-current="page">
              Shop
            </span>
          </nav>

          <div className="max-w-2xl">
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              The 100% Natural Range
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2A2521] mt-2">
              The Range
            </h1>
            {/* Secondary-opacity intro line */}
            <p className="mt-3 text-base sm:text-lg text-[#2A2521]/78 leading-relaxed">
              Every variant is formulated around real wholefoods, free from preservatives and artificial additives. Net Wt. 200g per pouch.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Sort Toolbar */}
      <section className="py-6 bg-white border-b border-[#2A2521]/5 sticky top-[69px] z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Benefit Filter Chips (Motif 2 Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" role="group" aria-label="Filter by health benefit">
            {filterOptions.map((opt) => {
              const isSelected = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFilter(opt.id)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                    isSelected
                      ? "bg-[#2A2521] text-[#F8F3E9] shadow-sm"
                      : "bg-[#F8F3E9] text-[#2A2521]/78 hover:bg-[#2A2521]/10 hover:text-[#2A2521]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <label htmlFor="sort-select" className="text-xs font-bold uppercase tracking-wider text-[#2A2521]/60">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#F8F3E9] border border-[#2A2521]/10 text-xs font-bold text-[#2A2521] focus-visible:ring-2 focus-visible:ring-[#E2606B] cursor-pointer min-h-[44px]"
            >
              <option value="featured">Featured Flavours</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Screen-reader Live Region for filter results */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredProducts.length} multivitamin powders for filter {selectedFilter}.
      </div>

      {/* 3. Product Listing Grid */}
      <section className="py-14 bg-[#F8F3E9] min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#2A2521]/10 shadow-soft max-w-lg mx-auto flex flex-col items-center">
              <span className="w-14 h-14 rounded-full bg-[#E2606B]/15 text-[#E2606B] flex items-center justify-center mb-4">
                <SparklesIcon size={26} />
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                No matching flavours found
              </h3>
              <p className="mt-2 text-sm text-[#2A2521]/78">
                Try selecting "All Flavours" to see the complete 100% natural lineup.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter("all");
                  setSelectedSort("featured");
                }}
                className="mt-6 px-6 py-3 rounded-full bg-[#2A2521] text-[#F8F3E9] font-bold text-xs uppercase tracking-wider hover:bg-[#2A2521]/90 min-h-[44px]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Comparison Matrix ("Not sure which one?") */}
      <section className="py-20 bg-white border-t border-[#2A2521]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              Variant Breakdown
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
              Not Sure Which One to Choose?
            </h2>
            <p className="mt-2 text-base text-[#2A2521]/78">
              Compare all four targeted recipes side by side.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-3xl border border-[#2A2521]/10 shadow-soft bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F3E9] border-b border-[#2A2521]/10">
                  <th className="p-5 font-serif text-base font-bold text-[#2A2521]">Feature / Benefit</th>
                  {PRODUCTS.map((p) => (
                    <th key={p.id} className="p-5 text-center">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${p.accentColor}20`,
                          color: "#2A2521",
                        }}
                      >
                        {p.name}
                      </span>
                      <p className="font-serif text-base font-bold text-[#2A2521] mt-1">{p.flavour}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2521]/10 text-sm">
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Primary Health Target</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Growth & Immunity</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Bone & Heart Health</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Focus & Brain Energy</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Daily Foundation</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Hero Wholefood Source</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Real Strawberry Puree</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Sprouted Barley Malt</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Criollo Raw Cocoa</td>
                  <td className="p-5 text-center text-[#2A2521]/80">Bourbon Vanilla Pod</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">100% Natural Resources</td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-5 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8CC79B]/30 text-[#2A2521]">
                        <CheckIcon size={14} />
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Zero Preservatives / Sugar</td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-5 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8CC79B]/30 text-[#2A2521]">
                        <CheckIcon size={14} />
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Net Weight</td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-5 text-center font-semibold text-[#2A2521]/78">
                      200g (20 Servings)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Price</td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-5 text-center font-extrabold text-[#2A2521] text-base">
                      {CURRENCY.symbol}{p.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#2A2521]">Action</td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-5 text-center">
                      <Link
                        href={`/shop/${p.id}`}
                        className="inline-block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#E2606B] hover:bg-[#d44d58] transition-colors"
                      >
                        Select
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-3xl border border-[#2A2521]/10 p-6 bg-[#F8F3E9]/40 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{ backgroundColor: `${p.accentColor}25`, color: "#2A2521" }}
                  >
                    {p.name}
                  </span>
                  <span className="font-extrabold text-lg text-[#2A2521]">
                    {CURRENCY.symbol}{p.price}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2A2521]">{p.flavourLine}</h3>
                  <p className="text-xs text-[#2A2521]/78 font-semibold mt-0.5">{p.tagline}</p>
                </div>
                <div className="flex flex-col gap-2 text-xs text-[#2A2521]/80 pt-3 border-t border-[#2A2521]/10">
                  <div className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-[#8CC79B]" />
                    <span>Hero: {p.ingredients[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-[#8CC79B]" />
                    <span>100% Natural • 0% Preservatives</span>
                  </div>
                </div>
                <Link
                  href={`/shop/${p.id}`}
                  className="mt-2 w-full py-3 rounded-xl bg-[#2A2521] text-white text-xs font-bold uppercase tracking-wider text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Repeat Dark Claim Ribbon near footer */}
      <ClaimRibbon />
    </div>
  );
}
