import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-deepsea text-shell hover:bg-ocean-deep shadow-soft hover:shadow-lift hover:-translate-y-0.5",
        gold: "bg-gold text-deepsea hover:bg-gold-soft shadow-soft hover:-translate-y-0.5",
        outline:
          "border border-deepsea/25 text-deepsea hover:border-deepsea/60 hover:bg-deepsea/[0.03]",
        ghost: "text-deepsea hover:bg-deepsea/[0.05]",
        light:
          "bg-shell/90 text-deepsea backdrop-blur hover:bg-shell shadow-soft hover:-translate-y-0.5",
        onDark:
          "border border-shell/40 text-shell hover:bg-shell hover:text-deepsea",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-wide rounded-full",
        md: "h-11 px-6 text-sm tracking-wide rounded-full",
        lg: "h-13 px-8 py-3.5 text-sm tracking-[0.08em] uppercase rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
