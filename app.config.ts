export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-full font-semibold justify-center",
      },
      variants: {
        size: {
          md: {
            base: "px-6.25 py-6.25 text-base gap-1.5",
          },
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class: "text-black bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)",
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
  },
});
