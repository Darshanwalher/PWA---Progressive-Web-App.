import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white font-medium",
        destructive:
          "bg-rose-600 text-white shadow-xs hover:bg-rose-700 dark:bg-rose-900/80 dark:text-rose-100 dark:hover:bg-rose-800",
        outline:
          "border border-slate-200 bg-white/80 hover:bg-slate-100/80 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:hover:text-slate-100 text-slate-700 dark:text-slate-300 shadow-2xs",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200/80 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/80 dark:hover:text-slate-100 text-slate-600 dark:text-slate-400",
        link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
        subtle: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/60"
      },
      size: {
        default: "h-9 px-3.5 py-1.5",
        sm: "h-8 rounded-md px-2.5 text-xs",
        lg: "h-10 rounded-lg px-5 text-sm",
        icon: "h-8 w-8 rounded-lg",
        iconSm: "h-7 w-7 rounded-md p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
