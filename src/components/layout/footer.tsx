"use client";

interface FooterProps {
  theme: "light" | "dark";
}

export default function Footer({ theme }: FooterProps) {
  const isPatternDark = theme === "dark";

  return (
    <footer
      className={`w-full py-6 transition-colors duration-300 ${
        isPatternDark ? "text-white" : "text-gray-900 dark:text-neutral-200"
      }`}
    >
      <div className="container mx-auto text-center">
        <div
          className={`mx-auto max-w-6xl border-t transition-colors duration-300 ${
            isPatternDark
              ? "border-white/20"
              : "border-gray-300 dark:border-gray-700"
          } pt-6`}
        >
          <p
            className={`text-sm font-medium transition-colors duration-300 ${
              isPatternDark ? "text-white" : "text-gray-900"
            }`}
          >
            © {new Date().getFullYear()} PatterNix. All rights reserved.
          </p>
          <p
            className={`mt-2 text-sm italic transition-colors duration-300 ${
              isPatternDark ? "text-gray-100" : "text-gray-600"
            }`}
          >
            Crafting beautiful patterns
          </p>
        </div>
      </div>
    </footer>
  );
}
