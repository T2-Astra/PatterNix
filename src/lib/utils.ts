/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pattern } from "@/types/pattern";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends any[]>(
  fn: (...args: T) => any,
  timeout: number
) {
  let handle: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(handle);
    handle = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}

export function searchPatterns(
  gridPatterns: Pattern[],
  category: string,
  searchInput: string
) {
  if (searchInput === "") return gridPatterns;

  const loweredInput = searchInput.toLowerCase();

  const inputWords = loweredInput.split(" ").filter(Boolean);

  const filteredPatterns = gridPatterns.filter((pattern) => {
    if (pattern.category === category || category === "all") {
      const patternWords = pattern.name.toLowerCase().split(" ");

      if (inputWords.length === 1 && inputWords[0].length === 1) {
        return patternWords[0].startsWith(inputWords[0]);
      }

      return inputWords.every((inputWord) =>
        patternWords.some((patternWord) => patternWord.startsWith(inputWord))
      );
    } else {
      return false;
    }
  });

  const sortedPatterns = filteredPatterns.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    const posInA = aName.indexOf(inputWords[0]);
    const posInB = bName.indexOf(inputWords[0]);

    return posInA - posInB;
  });

  return sortedPatterns;
}

export function isPatternDark(pattern: Pattern): boolean {
  const background = pattern.style.background || "";
  const backgroundColor = pattern.style.backgroundColor || "";
  const combinedStyles = `${background} ${backgroundColor}`.toLowerCase();
  
  // Check pattern ID for explicit dark naming
  if (pattern.id.startsWith("dark-") || pattern.id.includes("-dark-")) {
    return true;
  }
  
  // Check for dark hex colors (0-4 range for first digit)
  if (/#[0-4][0-9a-f]{5}/.test(combinedStyles)) {
    return true;
  }
  
  // Check for dark RGB values (0-100 range for first value)
  if (/rgba?\(\s*([0-9]|[1-9][0-9]|100)\s*,/.test(combinedStyles)) {
    return true;
  }
  
  // Check for dark color keywords
  const darkKeywords = [
    "black", "dark", "slate-8", "slate-9", "gray-8", "gray-9", 
    "zinc-8", "zinc-9", "neutral-8", "neutral-9", "stone-8", "stone-9"
  ];
  
  if (darkKeywords.some(keyword => combinedStyles.includes(keyword))) {
    return true;
  }
  
  // Check for dark gradients
  if (combinedStyles.includes("gradient")) {
    const darkGradientKeywords = [
      "slate-800", "slate-900", "gray-800", "gray-900", 
      "zinc-800", "zinc-900", "black", "neutral-800", "neutral-900"
    ];
    if (darkGradientKeywords.some(keyword => combinedStyles.includes(keyword))) {
      return true;
    }
  }
  
  return false;
}
