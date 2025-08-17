"use client";

import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { gridPatterns } from "@/data/patterns";
import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import PatternShowcase from "@/components/patterns/pattern-showcase";
import SupportDropdown from "@/components/home/support-dropdown";
import ReturnToPreview from "@/components/home/return-to-preview";
import { FavoritesProvider } from "@/context/favourites-context";

export default function Home() {
  const [activePattern, setActivePattern] = useState<string | null>("radial-pink-glow");
  const { theme, updateThemeFromPattern } = useTheme();

  // Update theme based on pattern background color
  useEffect(() => {
    updateThemeFromPattern(activePattern, gridPatterns);
  }, [activePattern, updateThemeFromPattern]);

  // Find the active pattern object
  const activePatternObj = activePattern
    ? gridPatterns.find((p) => p.id === activePattern)
    : null;

  // Create safe style object to avoid CSS property conflicts
  const getPatternStyle = (patternStyle: any) => {
    if (!patternStyle) return {};
    
    const safeStyle: any = {};
    
    // Handle background properties carefully
    if (patternStyle.background) {
      safeStyle.background = patternStyle.background;
    }
    
    if (patternStyle.backgroundColor) {
      safeStyle.backgroundColor = patternStyle.backgroundColor;
    }
    
    if (patternStyle.backgroundImage) {
      safeStyle.backgroundImage = patternStyle.backgroundImage;
    }
    
    if (patternStyle.backgroundSize) {
      safeStyle.backgroundSize = patternStyle.backgroundSize;
    }
    
    if (patternStyle.WebkitMaskImage) {
      safeStyle.WebkitMaskImage = patternStyle.WebkitMaskImage;
    }
    
    if (patternStyle.maskImage) {
      safeStyle.maskImage = patternStyle.maskImage;
    }
    
    return safeStyle;
  };

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <FavoritesProvider>
          <div className="min-h-screen relative">
            {/* Apply the active pattern as background */}
            {activePatternObj && (
              <div
                className="fixed inset-0 z-0"
                style={getPatternStyle(activePatternObj.style)}
              />
            )}
            <div className="relative z-10">
              <Navbar theme={theme} />
              <SupportDropdown theme={theme} />
              <Hero
                activePattern={activePattern}
                setActivePattern={setActivePattern}
                theme={theme}
              />
              <PatternShowcase
                activePattern={activePattern}
                setActivePattern={setActivePattern}
                theme={theme}
              />
              <Footer theme={theme} />
            </div>
            <ReturnToPreview theme={theme} />
          </div>
        </FavoritesProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
