import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize: {
        base: ["1rem", 1.2],
        lg: ["1.2rem", 1.2],
        xl: ["1.4rem", 1.2],
        "2xl": ["1.6rem", 1.2],
        "3xl": ["2rem", 1.2],
        "4xl": ["2.4rem", 1],
        "5xl": ["2.5rem", 1],
        "6xl": ["3.5rem", 1.2],
      },
      colors: {
        primary: {
          from: "#19F2C8",
          to: "#6AE15F",
        },
        dark: {
          100: "#000000",
          50: "#0A0A0A",
          0: "#1D1D1D",
        },
      },
    },
  },
};
