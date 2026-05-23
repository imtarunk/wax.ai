import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))/80]",
        secondary:
          "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))/80]",
        destructive:
          "border-transparent bg-[hsl(var(--destructive))] text-white hover:bg-[hsl(var(--destructive))/80]",
        outline: "text-[hsl(var(--foreground))]",
        success:
          "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80",
        warning:
          "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-100/80",
        error:
          "border-transparent bg-red-100 text-red-700 hover:bg-red-100/80",
        info:
          "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-100/80",
        purple:
          "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
