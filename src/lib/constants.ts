export const PATTERN_CATEGORIES = [
  { id: "all", label: "All Patterns" },
  { id: "gradients", label: "Gradients" },
  { id: "geometric", label: "Geometric" },
  { id: "decorative", label: "Decorative" },
  { id: "effects", label: "Effects" },
  { id: "favourites", label: "Favourites" },
] as const;

export const THEME_CONFIG = {
  light: "light",
  dark: "dark",
} as const;

export const SUPPORT_CONFIG = {
  UPI_ID: "krishmhatre34@oksbi",
  PAYEE_NAME: "Krish Mhatre",
  UPI_MSG: "Keep building cool stuff!",
  BUY_ME_COFFEE_URL: "https://buymeacoffee.com/t2astra",
  QR_CODE_URL: "https://image2url.com/images/1755427645279-884f3c42-e95d-413e-bf82-e8627974b730.jpg",
} as const;

export const APP_CONFIG = {
  GITHUB_URL: "https://github.com/T2-Astra",
  TWITTER_URL: "https://x.com/KrishMhatr14800",
  CONTRIBUTING_URL: "https://github.com/T2-Astra/PatterNix",
} as const;
