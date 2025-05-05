export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-full font-semibold justify-center",
      },
      variants: {
        size: {
          xs: {
            base: "px-0.75 py-0.75 text-base gap-1.5",
            leadingIcon: "size-6",
          },
          sm: {
            base: "px-5.25 py-5.25 max-md:px-4 max-md:py-4 !text-base-sm gap-1.5",
            leadingIcon: "size-6",
          },
          md: {
            base: "px-6.25 py-6.25 text-base gap-1.5",
            leadingIcon: "size-6",
          },
          lg: {
            base: "px-6.25 py-6.25 text-base gap-1.5",
            leadingIcon: "size-10",
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
        {
          size: "xs",
          square: true,
          class: "p-0.75",
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
    inputNumber: {
      slots: {
        base: "font-semibold placeholder:text-(--ui-text)/20",
      },
    },
    selectMenu: {
      slots: {
        base: "font-semibold",
        placeholder: "text-(--ui-text)/20",
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
        tbody: "divide-(--ui-color-neutral-800) [&>tr]:data-[selectable=true]:hover:bg-transparent",
        tr: "data-[selected=true]:bg-transparent",
        td: "p-3 relative !text-base-sm text-white font-medium h-10.5",
      },
    },
    checkbox: {
      slots: {
        icon: "opacity-0",
        base: "!ring-0 bg-(--ui-color-neutral-700)",
      },
      variants: {
        color: {
          primary: "aria-checked:bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)",
          error: "aria-checked:bg-linear-to-r from-(--ui-color-error-400) to-(--ui-color-error-500)",
        },
      },
    },
    calendar: {
      slots: {
        header: "justify-stretch",
        heading: "mx-0 text-left grow font-medium",
        headCell: "font-medium",
        cell: "font-semibold",
        body: "pt-5",
        grid: "space-y-0",
        gridWeekDaysRow: "mb-4.25",
        cellTrigger: "m-1 mx-auto",
      },
      variants: {
        color: {
          primary: {
            headCell: "text-white",
            cellTrigger: "data-[selected]:bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)",
          },
        },
        size: {
          md: {
            heading: "text-2xl",
            headCell: "!text-base-sm font-medium",
            cell: "!text-base-sm",
            cellTrigger: "size-8.75",
          },
        },
      },
    },
  },
});
