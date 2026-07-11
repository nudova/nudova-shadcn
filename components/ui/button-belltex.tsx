import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * BellTex Button (Components §01). Design variants map 1:1 to props:
 *   Button/Primary   → variant="primary" (accent fill, hover → shade, pressed inset)
 *   Button/Secondary → variant="secondary" (1.5px border, surface, hover neutral)
 *   Button/Ghost     → variant="ghost" (transparent, hover divider)
 * Sizes sm/md/lg = 36/44/52; md is the default so tap targets are ≥44px.
 * `default`, `outline`, `destructive`, `link` + legacy sizes are kept for the
 * (set-aside) boilerplate screens. `loading` shows a spinner and disables.
 */
const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive rounded-md border border-transparent bg-clip-padding font-semibold focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-[18px] inline-flex items-center justify-center whitespace-nowrap transition-colors cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-brand-shade active:bg-brand-shade disabled:bg-border disabled:text-ink-faint",
        secondary:
          "border-[1.5px] border-border bg-surface text-ink hover:bg-canvas hover:border-ink-faint disabled:bg-canvas disabled:text-ink-faint",
        ghost:
          "bg-transparent text-ink hover:bg-divider disabled:text-ink-faint",
        // Boys sub-brand CTA (blue-coded, distinct from the coral accent).
        boys: "bg-boys text-surface transition-[filter] hover:brightness-90 disabled:bg-border disabled:text-ink-faint",
        // --- back-compat (boilerplate) ---
        default: "bg-primary text-primary-foreground hover:bg-brand-shade",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted",
        destructive:
          "bg-danger/10 hover:bg-danger/20 text-danger focus-visible:ring-danger/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 gap-1.5 px-4 text-[13px]",
        md: "h-11 gap-2 px-6 text-sm",
        lg: "h-13 gap-2 px-8 text-[15px]",
        icon: "size-11", // 44px — comfortable tap target
        // --- back-compat ---
        default: "h-9 gap-1.5 px-2.5",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? (
        // Slot requires a single child — don't inject a spinner sibling.
        children
      ) : (
        <>
          {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
