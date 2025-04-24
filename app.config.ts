export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-full font-semibold justify-center",
      },
      variants: {
        size: {
          sm: {
            base: "px-5.25 py-5.25 max-md:px-3.25 max-md:py-3.25 !text-base-sm gap-1.5",
            leadingIcon: "size-6",
          },
          md: {
            base: "px-6.25 py-6.25 text-base gap-1.5",
            leadingIcon: "size-6",
          },
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class: "text-black bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)",
        },
        {
          color: "neutral",
          variant: "solid",
          class: "text-white",
        },
        {
          size: "md",
          square: true,
          class: "p-4.5",
        },
        {
          size: "sm",
          square: true,
          class: "p-4.5 max-md:p-3.25",
        },
      ],
    },
    input: {
      slots: {
        root: "w-full",
        base: "rounded-2xl font-semibold placeholder:text-(--ui-text)/20",
      },
      variants: {
        size: {
          md: {
            base: "px-5 py-6.25 text-base gap-1.5",
          },
        },
        variant: {
          outline: "bg-(--ui-color-neutral-900) ring-(--ui-color-primary-400)",
        },
      },
    },
    avatar: {
      variants: {
        size: {
          md: {
            root: "size-15 text-base max-md:size-12.5",
          },
        },
      },
    },
    table: {
      slots: {
        thead: "[&>tr]:after:bg-(--ui-color-neutral-800)",
        tbody: "divide-(--ui-color-neutral-800)",
        td: "p-3 !text-base-sm text-white font-medium",
      },
    },
    checkbox: {
      slots: {
        icon: "opacity-0",
      },
      variants: {
        color: {
          primary: "bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)",
        },
      },
    },
  },
});
