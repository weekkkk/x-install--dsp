export default defineAppConfig({
  ui: {
    button: {
      font: "font-semibold",
      rounded: "rounded-full",
      size: {
        sm: "text-base",
        lg: "text-2xl",
      },
      truncate: "text-center",
      inline: "justify-center",
      padding: {
        sm: "py-[2.54rem] max-md:py-[1.9rem]",
        lg: "py-[2.54rem]",
      },
      square: {
        xs: "p-0",
        sm: "p-[1.8rem] max-md:p-[1.3rem]",
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
        sm: "h-24 w-24 text-2xl max-md:h-20 max-md:w-20",
      },
    },
    popover: {
      background: "dark:bg-dark-50",
      ring: "ring-0",
      rounded: "rounded-[3rem]",
    },
    table: {
      divide: "dark:divide-dark-0",
      tbody: "dark:divide-dark-0",
      th: {
        padding: "px-0 pt-0 pb-6 [&:not(:last-child)]:pr-[2.6rem]",
        size: "text-base",
      },
      td: {
        padding: "px-0 py-6 [&:not(:last-child)]:pr-[2.6rem]",
        color: "dark:text-white",
        font: "font-medium",
        size: "text-base",
      },
      checkbox: {
        padding: "ps-0",
      },
      tr: {
        selected: "dark:bg-[transparent]",
      },
    },
    radio: {
      base: "h-[2.4rem] w-[2.4rem] dark:checked:bg-gradient-to-r from-brand-from to-brand-to rounded-2xl",
      background: "dark:bg-dark-25",
      border: "border-none",
    },
    checkbox: {
      base: "h-[1.2rem] w-[1.2rem] dark:checked:bg-gradient-to-r from-brand-from to-brand-to rounded-2xl",
      background: "dark:bg-dark-25",
      border: "border-none",
    },
    input: {
      base: "font-semibold",
      size: {
        sm: "text-base",
        lg: "text-2xl",
      },
      padding: {
        lg: "px-8 py-[2.54rem]",
      },
      rounded: "rounded-[2rem]",
      color: {
        white: {
          outline: "ring-0 dark:bg-dark-50",
        },
        red: {
          outline: "ring-1 dark:bg-dark-50 dark:ring-danger dark:text-danger",
        },
      },
    },
    formGroup: {
      error: "dark:text-danger",
    },
  },
});
