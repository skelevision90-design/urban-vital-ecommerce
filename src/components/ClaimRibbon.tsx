import React from "react";
import { NaturalIcon, NoPreservativesIcon, MixesIcon } from "./Icons";

export const ClaimRibbon: React.FC<{ className?: string }> = ({ className = "" }) => {
  const claims = [
    {
      title: "100% Natural",
      subtitle: "Pure plant & fruit extracts",
      icon: NaturalIcon,
    },
    {
      title: "No Preservatives",
      subtitle: "Zero artificial chemicals or sugars",
      icon: NoPreservativesIcon,
    },
    {
      title: "Mixes with Water or Milk",
      subtitle: "Smooth 10-second instant dissolve",
      icon: MixesIcon,
    },
  ];

  return (
    <div className={`w-full bg-[#2A2521] text-[#F8F3E9] py-5 px-4 sm:px-6 relative overflow-hidden ${className}`}>
      {/* Subtle ribbon edge decor */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {claims.map((claim, idx) => {
          const Icon = claim.icon;
          return (
            <div
              key={claim.title}
              className="flex items-center gap-3.5 group text-left w-full md:w-auto justify-start md:justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#8CC79B] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Icon size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-wide text-white flex items-center gap-1.5">
                  {claim.title}
                  {idx < 2 && (
                    <span className="hidden md:inline-block text-white/30 ml-8 font-light select-none">
                      •
                    </span>
                  )}
                </span>
                <span className="text-xs text-white/70 font-normal">
                  {claim.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
