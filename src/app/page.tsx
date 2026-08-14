"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, BRAND_CLAIMS, PARENT_TESTIMONIALS, FAQS, ProductVariant } from "@/data/products";
import { HeroVisual3D } from "@/components/HeroVisual3D";
import { ClaimRibbon } from "@/components/ClaimRibbon";
import { ProductCard } from "@/components/ProductCard";
import {
  LeafIcon,
  StarIcon,
  ChevronDownIcon,
  CheckIcon,
  SparklesIcon,
  ScoopIcon,
  MixesIcon,
  ShieldLockIcon,
} from "@/components/Icons";

export default function HomePage() {
  const [activeHeroVariant, setActiveHeroVariant] = useState<ProductVariant>(PRODUCTS[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Split-Screen Story Arc with 3D Tilt Parallax Showcase)    */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 diagonal-split-hero overflow-hidden">
        {/* Background splash organic ambient glow */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: activeHeroVariant.accentColor }}
        />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[#8CC79B]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Story Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow Pill (Motif 2) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8CC79B]/25 text-[#2A2521] border border-[#8CC79B]/40 mb-6">
                <span className="text-[#2A2521]">
                  <LeafIcon size={14} />
                </span>
                <span className="label-smallcaps text-[11px] text-[#2A2521]">
                  100% NATURAL • NO PRESERVATIVES
                </span>
              </div>

              {/* H1 Headline (Fraunces Warm Serif) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A2521] leading-[1.08] tracking-tight">
                Real food. <br />
                Growing kids. <br />
                <span className="italic font-normal text-[#E2606B]">One scoop.</span>
              </h1>

              {/* Secondary Opacity Subline (78% tier) */}
              <p className="mt-6 text-lg sm:text-xl text-[#2A2521]/78 font-normal leading-relaxed max-w-xl">
                Multivitamin powder for children made only from natural ingredients — no preservatives, no harmful chemicals. Mixes with water or milk.
              </p>

              {/* CTAs Row */}
              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base tracking-wide shadow-soft hover:shadow-lifted transition-all duration-200 active:scale-95 text-center min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                >
                  Shop the Range
                </Link>

                <a
                  href="#flavours"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/80 hover:bg-white text-[#2A2521] border border-[#2A2521]/15 font-bold text-base tracking-wide shadow-sm hover:shadow-soft transition-all duration-200 active:scale-95 text-center min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#2A2521]"
                >
                  Meet the Flavours
                </a>
              </div>

              {/* Trust Rating Bar */}
              <div className="mt-10 pt-6 border-t border-[#2A2521]/10 flex flex-wrap items-center gap-6 text-sm text-[#2A2521]/78">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#D9A84E]">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={18} />
                    ))}
                  </div>
                  <span className="font-extrabold text-[#2A2521] ml-1">4.9 / 5</span>
                </div>
                <span className="text-[#2A2521]/40 select-none">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8CC79B]" />
                  <span>1,400+ Verified Parents</span>
                </div>
                <span className="text-[#2A2521]/40 select-none hidden sm:inline">•</span>
                <span className="hidden sm:inline text-xs text-[#2A2521]/55">
                  Net Wt. 200g per pouch
                </span>
              </div>
            </div>

            {/* Right Column: 3D Tilt + Depth Parallax Hero Showcase */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <HeroVisual3D
                activeVariant={activeHeroVariant}
                onSelectVariant={setActiveHeroVariant}
                proximityRadius={320}
                maxTiltX={8}
                maxTiltY={12}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIGNATURE DARK CLAIM RIBBON (Motif 3)                                  */}
      {/* ========================================================================= */}
      <ClaimRibbon />

      {/* ========================================================================= */}
      {/* 3. WHY PARENTS TRUST IT (3 Benefit Cards with Leaf Bullets & Layered Shadows) */}
      {/* ========================================================================= */}
      <section id="why-natural" className="py-20 bg-[#F8F3E9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              The Clean Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
              Why Parents Trust Urban Vital
            </h2>
            <p className="mt-3 text-base text-[#2A2521]/78">
              We replaced factory synthetics, chalky fillers, and sugar syrups with whole food nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E2606B]/15 text-[#E2606B] flex items-center justify-center mb-6">
                  <SparklesIcon size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                  Nothing Artificial
                </h3>
                <p className="mt-3 text-sm text-[#2A2521]/78 leading-relaxed">
                  Every micronutrient is freeze-dried straight from real strawberries, sprouted barley, whole cocoa, and cured vanilla. No artificial food coloring or chemical essences.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-[#2A2521]/8 flex flex-col gap-2.5 text-xs text-[#2A2521]/78 font-semibold">
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>Real freeze-dried fruit powders</span>
                </li>
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>100% plant-bioavailable minerals</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#8CC79B]/25 text-[#2A2521] flex items-center justify-center mb-6">
                  <ShieldLockIcon size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                  No Preservatives
                </h3>
                <p className="mt-3 text-sm text-[#2A2521]/78 leading-relaxed">
                  Formulated with strictly 0% chemical preservatives, zero sodium benzoate, zero refined sugar, and zero gluten. Packaged in moisture-barrier airtight pouches.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-[#2A2521]/8 flex flex-col gap-2.5 text-xs text-[#2A2521]/78 font-semibold">
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>Zero refined sugars & zero artificial sweeteners</span>
                </li>
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>FSSAI & GMP clean-room certified</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D9A84E]/25 text-[#C0812F] flex items-center justify-center mb-6">
                  <ScoopIcon size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                  Made for Growing Kids
                </h3>
                <p className="mt-3 text-sm text-[#2A2521]/78 leading-relaxed">
                  Tailored RDA proportions designed specifically for ages 2 to 14. Supports daily immunity, bone density, and classroom focus in one easy daily scoop.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-[#2A2521]/8 flex flex-col gap-2.5 text-xs text-[#2A2521]/78 font-semibold">
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>10-Second instant dissolve in water or milk</span>
                </li>
                <li className="flex items-center gap-2">
                  <LeafIcon size={14} className="text-[#8CC79B]" />
                  <span>Delicious authentic taste kids love</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAVOUR LINEUP (4 Themed Product Cards with Accent Tokens)             */}
      {/* ========================================================================= */}
      <section id="flavours" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
                The Flavour Lineup
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
                Four Natural Flavours. Four Targeted Benefits.
              </h2>
              <p className="mt-2 text-base text-[#2A2521]/78 max-w-xl">
                Every pouch contains 200g of pure nutrition powder. Choose your child's favourite daily taste.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2A2521] hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded p-1"
            >
              <span>Explore All 4 Packs</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW TO USE (3 Steps with Pill Numbers & Diagonal Divider Above)        */}
      {/* ========================================================================= */}
      <section id="how-to-use" className="py-20 bg-[#F8F3E9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label-smallcaps text-[#8CC79B] text-[#2A2521] tracking-[0.14em]">
              Daily Routine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
              Three Simple Steps to Daily Nutrition
            </h2>
            <p className="mt-2 text-base text-[#2A2521]/78">
              Effortless morning nutrition that takes less than 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft text-center flex flex-col items-center">
              {/* Step Pill Number (Motif 2) */}
              <span className="w-12 h-12 rounded-full bg-[#E2606B] text-white font-extrabold text-lg flex items-center justify-center mb-6 shadow-sm">
                1
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                Scoop
              </h3>
              <p className="mt-2 text-sm text-[#2A2521]/78 leading-relaxed">
                Add 1 level scoop (10g) of Urban Vital powder into a glass, shaker cup, or breakfast bowl.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft text-center flex flex-col items-center">
              <span className="w-12 h-12 rounded-full bg-[#C0812F] text-white font-extrabold text-lg flex items-center justify-center mb-6 shadow-sm">
                2
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                Mix with Water or Milk
              </h3>
              <p className="mt-2 text-sm text-[#2A2521]/78 leading-relaxed">
                Pour 150ml of cold or warm water, cow's milk, or plant milk. Stir briskly for 10 seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft text-center flex flex-col items-center">
              <span className="w-12 h-12 rounded-full bg-[#8CC79B] text-[#2A2521] font-extrabold text-lg flex items-center justify-center mb-6 shadow-sm">
                3
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2A2521]">
                Enjoy!
              </h3>
              <p className="mt-2 text-sm text-[#2A2521]/78 leading-relaxed">
                Watch your child drink pure wholefood nutrition with delight. Smooth, velvety, and delicious!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INGREDIENT STORY BAND (Diagonal Split Background)                     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#2A2521] text-[#F8F3E9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="label-smallcaps text-[#8CC79B] tracking-[0.14em]">
                From Soil to Scoop
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 leading-tight">
                Nutrition as Nature Intended. Nothing Less.
              </h2>
              <p className="mt-5 text-base text-white/80 leading-relaxed">
                Synthetic vitamins are manufactured using petroleum derivatives and harsh solvents. At Urban Vital, we source exclusively from certified sustainable organic farms: sun-kissed ripe strawberries, sprouted barley malts, heirloom unalkalized cacao, and fragrant Bourbon vanilla pods.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="font-serif text-3xl font-bold text-[#8CC79B]">
                    100%
                  </span>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">
                    Food-Derived Actives
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="font-serif text-3xl font-bold text-[#E2606B]">
                    0%
                  </span>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">
                    Chemical Preservatives
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/10 border border-white/10 flex flex-col justify-between">
                <span className="text-2xl">🍓</span>
                <div>
                  <h4 className="font-bold text-white text-base">Real Strawberries</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Freeze-dried at peak sweetness for bioavailable Vitamin C.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/10 border border-white/10 flex flex-col justify-between">
                <span className="text-2xl">🌾</span>
                <div>
                  <h4 className="font-bold text-white text-base">Sprouted Malt</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Traditional sprouted barley rich in natural B-vitamins & minerals.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/10 border border-white/10 flex flex-col justify-between">
                <span className="text-2xl">🍫</span>
                <div>
                  <h4 className="font-bold text-white text-base">Criollo Cocoa</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Raw polyphenol-rich cocoa with clean plant DHA for focus.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/10 border border-white/10 flex flex-col justify-between">
                <span className="text-2xl">🍦</span>
                <div>
                  <h4 className="font-bold text-white text-base">Bourbon Vanilla</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Authentic ground vanilla beans infused with 18 vital micronutrients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PARENT TESTIMONIALS (3 Cards with Verified Badges & Ratings)           */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#F8F3E9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              Real Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
              Loved by Over 1,400+ Parents
            </h2>
            <p className="mt-2 text-base text-[#2A2521]/78">
              Hear how Urban Vital transformed morning routines across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARENT_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white p-8 border border-[#2A2521]/10 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D9A84E] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-sm text-[#2A2521]/80 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#2A2521]/8 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#2A2521]">{t.author}</h4>
                    <p className="text-xs text-[#2A2521]/60">{t.childAge}</p>
                    <p className="text-[11px] text-[#2A2521]/50 mt-0.5">{t.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#8CC79B]/20 text-[#2A2521] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckIcon size={12} className="text-[#8CC79B]" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ ACCORDION (4 Questions, Keyboard Accessible with Smooth Expand)   */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-smallcaps text-[#E2606B] tracking-[0.14em]">
              Common Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-2">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-base text-[#2A2521]/78">
              Everything you need to know about ingredients, safety, and serving sizes.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#2A2521]/10 overflow-hidden bg-[#F8F3E9]/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-base sm:text-lg text-[#2A2521] hover:text-[#E2606B] transition-colors focus-visible:ring-2 focus-visible:ring-[#E2606B]"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`ml-4 w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#E2606B]" : "text-[#2A2521]/60"
                      }`}
                    >
                      <ChevronDownIcon size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 text-sm sm:text-base text-[#2A2521]/78 leading-relaxed animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM CTA BANNER (Shop the Range)                                     */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F8F3E9] text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-[36px] bg-[#2A2521] text-[#F8F3E9] p-10 sm:p-14 shadow-lifted relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <span className="label-smallcaps text-[#8CC79B] tracking-[0.16em]">
              Start Today
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Give Your Child the Power of 100% Natural Nutrition
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80">
              Four delicious variants crafted to support growth, immunity, bones, and focus. Free shipping on orders over ₹999.
            </p>
            <Link
              href="/shop"
              className="mt-8 px-9 py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base tracking-wide shadow-lifted hover:scale-105 active:scale-95 transition-all duration-200 min-h-[48px] flex items-center justify-center"
            >
              Shop All 4 Flavours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
