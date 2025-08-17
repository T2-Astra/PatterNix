"use client";

import { useState } from "react";
import { Pattern } from "@/types/pattern";
import { THEME_CONFIG } from "@/lib/constants";
import { isPatternDark } from "@/lib/utils";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const updateThemeFromPattern = (
    activePattern: string | null,
    patterns: Pattern[]
  ) => {
    if (!activePattern) {
      setTheme(THEME_CONFIG.light);
      return;
    }

    const activePatternObj = patterns.find((p) => p.id === activePattern);
    if (!activePatternObj) {
      setTheme(THEME_CONFIG.light);
      return;
    }

    const isDark = isPatternDark(activePatternObj);
    setTheme(isDark ? THEME_CONFIG.dark : THEME_CONFIG.light);
  };

  return {
    theme,
    setTheme,
    updateThemeFromPattern,
  };
}
