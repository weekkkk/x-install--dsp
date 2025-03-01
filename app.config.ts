export default defineAppConfig({
  ui: {
    button: {
      font: "font-semibold",
      rounded: "rounded-full",
      size: {
        sm: "text-base",
      },
      truncate: "text-center",
      inline: "justify-center",
      padding: {
        sm: "py-[2.4rem]",
      },
      square: {
        xs: "p-0",
        sm: "p-[1.8rem]",
      },
      icon: {
        size: {
          xs: "h-16 w-16",
          sm: "h-[2.4rem] w-[2.4rem]",
        },
      },
      color: {
        gray: {
          solid: "shadow-none ring-0 dark:bg-dark-50",
        },
        primary: {
          solid:
            "dark:text-dark-100 dark:bg-gradient-to-r dark:from-brand-from dark:to-brand-to dark:hover:brightness-110 dark:disabled:bg-{color}-400 dark:aria-disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
        },
      },
    },
    avatar: {
      placeholder: "font-semibold dark:text-dark-100",
      background: "dark:bg-gradient-to-r dark:from-brand-from dark:to-brand-to",
      size: {
        sm: "h-24 w-24 text-2xl",
      },
    },
  },
});
