import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#010102",
        "surface-1": "#0e0f11",
        "surface-2": "#17181c",
        "surface-3": "#1e2025",
        "surface-4": "#272a2f",
        primary: "#5e6ad2",
        "primary-hover": "#828fff",
        "primary-focus": "#5e69d1",
        hairline: "#23252a",
        "hairline-strong": "#2e3035",
        "hairline-tertiary": "#3a3d43",
        ink: "#f7f8f8",
        "ink-muted": "#d0d6e0",
        "ink-subtle": "#8a8f98",
        "ink-tertiary": "#62666d",
        "inverse-canvas": "#ffffff",
        "inverse-ink": "#010102",
        "semantic-success": "#27a644",
        "semantic-error": "#e5484d",
        "semantic-warning": "#f5a623",
        "semantic-overlay": "#000000",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
        pill: "9999px",
      },
      fontSize: {
        button: ["14px", { fontWeight: "500", lineHeight: "1.20" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
