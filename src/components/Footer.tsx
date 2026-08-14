import React from "react";
import Link from "next/link";
import { LeafIcon, ShieldLockIcon } from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#2A2521] text-[#F8F3E9] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background leaf watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 text-white/[0.02] pointer-events-none">
        <LeafIcon size={480} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10 relative z-10">
        {/* Col 1 & 2: Brand Story */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#8CC79B]/20 text-[#8CC79B] flex items-center justify-center">
              <LeafIcon size={18} />
            </span>
            <span className="font-bold tracking-[0.16em] uppercase text-base text-white">
              URBAN VITAL
            </span>
          </div>

          {/* Tier 2: 80% opacity text */}
          <p className="text-sm leading-relaxed text-white/80 max-w-sm">
            Nourishing the next generation with pure multivitamin powders crafted exclusively from natural fruits, whole sprouted grains, and clean organic botanicals. Zero preservatives, zero synthetic shortcuts.
          </p>

          <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
            <ShieldLockIcon size={16} className="text-[#8CC79B]" />
            <span>FSSAI Certified • 100% Chemical-Free Clean Nutrition</span>
          </div>
        </div>

        {/* Col 3: The Flavours */}
        <div>
          <h4 className="label-smallcaps text-xs text-white mb-4 tracking-[0.14em]">
            The Lineup
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/shop/sprout" className="text-white/80 hover:text-white transition-colors">
                SPROUT • Strawberry
              </Link>
            </li>
            <li>
              <Link href="/shop/gold" className="text-white/80 hover:text-white transition-colors">
                GOLD • Malt Cereal
              </Link>
            </li>
            <li>
              <Link href="/shop/junior" className="text-white/80 hover:text-white transition-colors">
                JUNIOR • Raw Cocoa
              </Link>
            </li>
            <li>
              <Link href="/shop/core" className="text-white/80 hover:text-white transition-colors">
                CORE • Real Vanilla
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Quick Links */}
        <div>
          <h4 className="label-smallcaps text-xs text-white mb-4 tracking-[0.14em]">
            Explore
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/shop" className="text-white/80 hover:text-white transition-colors">
                Shop All Range
              </Link>
            </li>
            <li>
              <Link href="/#why-natural" className="text-white/80 hover:text-white transition-colors">
                Why Natural
              </Link>
            </li>
            <li>
              <Link href="/#how-to-use" className="text-white/80 hover:text-white transition-colors">
                How to Use
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="text-white/80 hover:text-white transition-colors">
                Parent FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Trust & Guarantee */}
        <div>
          <h4 className="label-smallcaps text-xs text-white mb-4 tracking-[0.14em]">
            Commitment
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC79B]" />
              <span>100% Money-back taste guarantee</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC79B]" />
              <span>Eco-friendly foil pouches</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC79B]" />
              <span>Pan-India express dispatch</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row: Payments & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 relative z-10">
        <div>
          <p>© {new Date().getFullYear()} Urban Vital Nutrition Pvt Ltd. All rights reserved.</p>
        </div>

        {/* Payment SVG Badges */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold text-white/80 border border-white/10">
            UPI / GPay
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold text-white/80 border border-white/10">
            VISA
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold text-white/80 border border-white/10">
            Mastercard
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold text-white/80 border border-white/10">
            RuPay
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold text-white/80 border border-white/10">
            Cash on Delivery
          </span>
        </div>
      </div>
    </footer>
  );
};
