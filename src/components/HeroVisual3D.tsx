"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { PRODUCTS, ProductVariant } from "@/data/products";
import { LeafIcon, SparklesIcon } from "./Icons";

interface HeroVisual3DProps {
  activeVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  // Knobs configurable as props / tokens
  proximityRadius?: number; // default 320px
  maxTiltX?: number; // default 8deg
  maxTiltY?: number; // default 12deg
}

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  activeVariant,
  onSelectVariant,
  proximityRadius = 320,
  maxTiltX = 8,
  maxTiltY = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const [canAnimate, setCanAnimate] = useState(false);

  // Animation state references (zero React re-renders during 60fps loop)
  const animRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetScale: 1,
    targetSheenX: 50,
    targetSheenY: 50,
    targetSheenOpacity: 0,
    currentRotX: 0,
    currentRotY: 0,
    currentScale: 1,
    currentSheenX: 50,
    currentSheenY: 50,
    currentSheenOpacity: 0,
    isLooping: false,
    rect: null as DOMRect | null,
    centerX: 0,
    centerY: 0,
  });

  // Check hardware capabilities & motion preference
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanAnimate(isFinePointer && !prefersReducedMotion);
  }, []);

  // Update cached bounding rectangle
  const updateCachedRect = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    animRef.current.rect = rect;
    animRef.current.centerX = rect.left + rect.width / 2;
    animRef.current.centerY = rect.top + rect.height / 2;
  }, []);

  useEffect(() => {
    if (!canAnimate) return;

    updateCachedRect();

    // Throttled resize/scroll listeners
    let timer: NodeJS.Timeout | null = null;
    const throttledUpdate = () => {
      if (timer) return;
      timer = setTimeout(() => {
        updateCachedRect();
        timer = null;
      }, 100);
    };

    window.addEventListener("resize", throttledUpdate, { passive: true });
    window.addEventListener("scroll", throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener("resize", throttledUpdate);
      window.removeEventListener("scroll", throttledUpdate);
      if (timer) clearTimeout(timer);
    };
  }, [canAnimate, updateCachedRect]);

  // Main 60fps render loop with lerp and early sleep
  const startLoop = useCallback(() => {
    if (animRef.current.isLooping || !cardRef.current) return;
    animRef.current.isLooping = true;

    const render = () => {
      const state = animRef.current;
      if (!cardRef.current) {
        state.isLooping = false;
        return;
      }

      // Enter lerp ≈ 0.12, Exit lerp ≈ 0.18 (exit ≈65% of enter time)
      const isEntering = state.targetScale > 1.001;
      const lerp = isEntering ? 0.12 : 0.18;

      state.currentRotX += (state.targetRotX - state.currentRotX) * lerp;
      state.currentRotY += (state.targetRotY - state.currentRotY) * lerp;
      state.currentScale += (state.targetScale - state.currentScale) * lerp;
      state.currentSheenX += (state.targetSheenX - state.currentSheenX) * lerp;
      state.currentSheenY += (state.targetSheenY - state.currentSheenY) * lerp;
      state.currentSheenOpacity += (state.targetSheenOpacity - state.currentSheenOpacity) * lerp;

      // Apply transform directly to GPU layer
      cardRef.current.style.transform = `perspective(1200px) rotateX(${state.currentRotX.toFixed(
        3
      )}deg) rotateY(${state.currentRotY.toFixed(3)}deg) scale3d(${state.currentScale.toFixed(
        3
      )}, ${state.currentScale.toFixed(3)}, 1)`;

      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle at ${state.currentSheenX.toFixed(
          1
        )}% ${state.currentSheenY.toFixed(1)}%, rgba(255, 255, 255, ${state.currentSheenOpacity.toFixed(
          3
        )}) 0%, transparent 65%)`;
      }

      // Check if settled to stop looping and save main thread
      const diffX = Math.abs(state.targetRotX - state.currentRotX);
      const diffY = Math.abs(state.targetRotY - state.currentRotY);
      const diffScale = Math.abs(state.targetScale - state.currentScale);
      const diffSheen = Math.abs(state.targetSheenOpacity - state.currentSheenOpacity);

      if (diffX < 0.005 && diffY < 0.005 && diffScale < 0.001 && diffSheen < 0.005 && !isEntering) {
        state.currentRotX = state.targetRotX;
        state.currentRotY = state.targetRotY;
        state.currentScale = state.targetScale;
        state.currentSheenOpacity = state.targetSheenOpacity;
        cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (sheenRef.current) {
          sheenRef.current.style.background = "none";
        }
        state.isLooping = false;
        return;
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  // Window mousemove proximity tracking
  useEffect(() => {
    if (!canAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      const state = animRef.current;
      if (!state.rect) updateCachedRect();
      if (!state.rect) return;

      const cursorX = e.clientX;
      const cursorY = e.clientY;
      const dx = cursorX - state.centerX;
      const dy = cursorY - state.centerY;
      const distance = Math.hypot(dx, dy);

      if (distance <= proximityRadius) {
        // Linear 0 to 1 influence normalized by distance
        const linearFactor = 1 - distance / proximityRadius;
        // Smooth sinusoidal ease 1 -> 0
        const influence = Math.sin((linearFactor * Math.PI) / 2);

        // Normalize direction components
        const normX = dx / (proximityRadius * 0.75);
        const normY = dy / (proximityRadius * 0.75);

        // rotateY follows X, rotateX follows -Y
        state.targetRotY = Math.min(Math.max(normX * maxTiltY, -maxTiltY), maxTiltY) * influence;
        state.targetRotX = Math.min(Math.max(-normY * maxTiltX, -maxTiltX), maxTiltX) * influence;
        state.targetScale = 1 + 0.03 * influence;

        // Specular sheen tracking
        const relX = ((cursorX - state.rect.left) / state.rect.width) * 100;
        const relY = ((cursorY - state.rect.top) / state.rect.height) * 100;
        state.targetSheenX = Math.min(Math.max(relX, 0), 100);
        state.targetSheenY = Math.min(Math.max(relY, 0), 100);
        state.targetSheenOpacity = 0.18 * influence;

        startLoop();
      } else {
        // Cursor outside radius -> gracefully return to rest
        if (state.targetScale !== 1 || state.targetRotX !== 0 || state.targetRotY !== 0) {
          state.targetRotX = 0;
          state.targetRotY = 0;
          state.targetScale = 1;
          state.targetSheenOpacity = 0;
          startLoop();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [canAnimate, proximityRadius, maxTiltX, maxTiltY, startLoop, updateCachedRect]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] mx-auto perspective-1200 flex items-center justify-center py-6 select-none"
      style={
        {
          ["--proximity-radius" as string]: `${proximityRadius}px`,
          ["--tilt-max-x" as string]: `${maxTiltX}deg`,
          ["--tilt-max-y" as string]: `${maxTiltY}deg`,
        } as React.CSSProperties
      }
    >
      {/* 3D Tilting Card Surface */}
      <div
        ref={cardRef}
        className="relative w-full aspect-[4/4.6] rounded-[36px] bg-white/70 backdrop-blur-sm border border-white/60 shadow-lifted p-6 sm:p-8 flex flex-col items-center justify-between preserve-3d will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 20px 45px -10px ${activeVariant.glowColor}, 0 2px 10px rgba(42, 37, 33, 0.04)`,
        }}
      >
        {/* Specular Sheen Highlight Layer */}
        <div
          ref={sheenRef}
          className="absolute inset-0 rounded-[36px] pointer-events-none z-40 transition-opacity duration-150"
        />

        {/* 1. Fixed Depth Layer: Background Glow Blob [translateZ: -30px] */}
        <div
          className="absolute inset-4 rounded-full pointer-events-none blur-2xl opacity-65 transition-colors duration-500"
          style={{
            transform: "translateZ(-30px)",
            backgroundColor: activeVariant.accentColor,
          }}
        />

        {/* 2. Fixed Depth Layer: Dashed Orbit Ring [translateZ: 10px] */}
        <div
          className="absolute inset-6 rounded-full border-2 border-dashed border-[#2A2521]/15 pointer-events-none"
          style={{
            transform: "translateZ(10px)",
          }}
        />

        {/* Top Header Row within Card: Variant Eyebrow & Natural Emblem */}
        <div
          className="w-full flex items-center justify-between z-20"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeVariant.accentColor }}
            />
            <span className="label-smallcaps text-[#2A2521]/80">
              {activeVariant.name} • {activeVariant.flavour}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/80 shadow-sm border border-[#2A2521]/10 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/emblem.png"
              alt="Urban Vital Emblem"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 3. Fixed Depth Layer: Main Pack Pouch Shot [translateZ: 70px] */}
        <div
          className="relative w-[210px] sm:w-[250px] aspect-[1/1] my-auto flex items-center justify-center pointer-events-none"
          style={{
            transform: "translateZ(70px)",
          }}
        >
          <Image
            src={activeVariant.packImage}
            alt={`Urban Vital ${activeVariant.name} Multivitamin Powder - ${activeVariant.flavourLine}`}
            width={280}
            height={280}
            priority
            className="w-full h-full object-contain filter drop-shadow-[0_16px_20px_rgba(42,37,33,0.18)] transition-all duration-300 transform scale-100"
          />
        </div>

        {/* 4. Fixed Depth Layer: 4 Interactive Flavour Chips [translateZ: 40-90px differentiated] */}
        {/* Chip 1: SPROUT (Strawberry) [translateZ: 45px] */}
        <button
          type="button"
          onClick={() => onSelectVariant(PRODUCTS[0])}
          className={`absolute top-16 -left-3 sm:-left-4 z-30 px-3 py-1.5 rounded-full bg-white shadow-soft border text-xs font-bold flex items-center gap-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
            activeVariant.id === "sprout"
              ? "border-[#E2606B] text-[#2A2521] ring-2 ring-[#E2606B]/30 scale-105"
              : "border-black/10 text-[#2A2521]/78 hover:border-[#E2606B]/50 hover:scale-102"
          }`}
          style={{
            transform: "translateZ(45px)",
          }}
          aria-label="Select SPROUT Strawberry Flavour"
          aria-pressed={activeVariant.id === "sprout"}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2606B]" />
          <span>🍓 Strawberry</span>
        </button>

        {/* Chip 2: GOLD (Malt) [translateZ: 85px] */}
        <button
          type="button"
          onClick={() => onSelectVariant(PRODUCTS[1])}
          className={`absolute top-16 -right-3 sm:-right-4 z-30 px-3 py-1.5 rounded-full bg-white shadow-soft border text-xs font-bold flex items-center gap-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#C0812F] ${
            activeVariant.id === "gold"
              ? "border-[#C0812F] text-[#2A2521] ring-2 ring-[#C0812F]/30 scale-105"
              : "border-black/10 text-[#2A2521]/78 hover:border-[#C0812F]/50 hover:scale-102"
          }`}
          style={{
            transform: "translateZ(85px)",
          }}
          aria-label="Select GOLD Malt Flavour"
          aria-pressed={activeVariant.id === "gold"}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C0812F]" />
          <span>🌾 Malt Grain</span>
        </button>

        {/* Chip 3: JUNIOR (Cocoa) [translateZ: 60px] */}
        <button
          type="button"
          onClick={() => onSelectVariant(PRODUCTS[2])}
          className={`absolute bottom-20 -left-3 sm:-left-4 z-30 px-3 py-1.5 rounded-full bg-white shadow-soft border text-xs font-bold flex items-center gap-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#B4643C] ${
            activeVariant.id === "junior"
              ? "border-[#B4643C] text-[#2A2521] ring-2 ring-[#B4643C]/30 scale-105"
              : "border-black/10 text-[#2A2521]/78 hover:border-[#B4643C]/50 hover:scale-102"
          }`}
          style={{
            transform: "translateZ(60px)",
          }}
          aria-label="Select JUNIOR Cocoa Flavour"
          aria-pressed={activeVariant.id === "junior"}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4A2C1F]" />
          <span>🍫 Pure Cocoa</span>
        </button>

        {/* Chip 4: CORE (Vanilla) [translateZ: 75px] */}
        <button
          type="button"
          onClick={() => onSelectVariant(PRODUCTS[3])}
          className={`absolute bottom-20 -right-3 sm:-right-4 z-30 px-3 py-1.5 rounded-full bg-white shadow-soft border text-xs font-bold flex items-center gap-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D9A84E] ${
            activeVariant.id === "core"
              ? "border-[#D9A84E] text-[#2A2521] ring-2 ring-[#D9A84E]/30 scale-105"
              : "border-black/10 text-[#2A2521]/78 hover:border-[#D9A84E]/50 hover:scale-102"
          }`}
          style={{
            transform: "translateZ(75px)",
          }}
          aria-label="Select CORE Vanilla Flavour"
          aria-pressed={activeVariant.id === "core"}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9A84E]" />
          <span>🍦 Real Vanilla</span>
        </button>

        {/* 5. Fixed Depth Layer: Bottom Badge "REAL FOOD → DAILY NUTRITION" [translateZ: 55px] */}
        <div
          className="w-full mt-2 py-2 px-4 rounded-2xl bg-[#2A2521] text-[#F8F3E9] flex items-center justify-between shadow-soft z-30"
          style={{
            transform: "translateZ(55px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#8CC79B]">
              <LeafIcon size={16} />
            </span>
            <span className="label-smallcaps text-[11px] text-white tracking-[0.14em]">
              REAL FOOD → DAILY NUTRITION
            </span>
          </div>
          <span className="text-xs text-white/70 font-medium">Net Wt. 200g</span>
        </div>
      </div>
    </div>
  );
};
