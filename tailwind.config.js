/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: {
          primary: "#2563EB",
          danger: "#DC2626",
          success: "#16A34A",
          warning: "#F59E0B",
          light: {
            background: "#FFFFFF",
            surface: "#F9FAFB",
            card: "#FFFFFF",
            text: "#111827",
            subText: "#6B7280",
            border: "#E5E7EB",
            input: "#FFFFFF",
          },
          dark: {
            background: "#030712",
            surface: "#111827",
            card: "#1F2937",
            text: "#F9FAFB",
            subText: "#D1D5DB",
            border: "#374151",
            input: "#111827",
          },
        },
      },
      borderRadius: {
        appLg: "14px",
        appXl: "18px",
      },
      spacing: {
        appSm: "8px",
        appMd: "12px",
        appLg: "16px",
        appXl: "20px",
      },
      fontSize: {
        appTitle: ["24px", "32px"],
        appSubtitle: ["18px", "26px"],
        appBody: ["15px", "22px"],
        appCaption: ["12px", "18px"],
      },
    },
  },
  plugins: [],
};