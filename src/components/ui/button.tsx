"use client";

import * as React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-black text-white hover:bg-gray-900 focus-visible:outline-black rounded-lg px-3 py-2",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:outline-gray-300 rounded-lg px-3 py-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
