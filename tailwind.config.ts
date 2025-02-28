import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize: {
        base: ["1rem", 1.2],
        lg: ["1.6rem", 1.2],
        xl: ["2rem", 1.2],
        "2xl": ["2.4rem", 1],
        "3xl": ["3.5rem", 1.2],
      },
    },
  },
};
