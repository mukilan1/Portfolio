"use client";

import React, { useState } from "react";
import LiquidCrystalBackground from "@/components/ui/liquid-crystal-background";

const MobileBlocker: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 text-white p-6 text-center lg:hidden backdrop-blur-sm">
            {/* Background Animation - Confined to this layer */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <LiquidCrystalBackground
                    speed={0.3}
                    className="w-full h-full"
                />
            </div>

            {/* Content Card */}
            <div className="relative z-10 max-w-sm p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                    aria-label="Close alert"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-4 text-white">
                    Desktop Recommended
                </h2>
                <p className="text-base text-gray-300 leading-relaxed mb-6 font-medium">
                    You may experience the worst phase of the site here.
                    <br />
                    <span className="block mt-2 text-white/60 text-xs uppercase tracking-wider">
                        For the best experience, please view on desktop.
                    </span>
                </p>

                <button
                    onClick={() => setIsVisible(false)}
                    className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                    Continue Anyway
                </button>
            </div>
        </div>
    );
};

export default MobileBlocker;
