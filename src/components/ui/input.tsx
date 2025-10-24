"use client";

import * as React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
