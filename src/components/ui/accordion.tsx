"use client";

import * as React from "react";
import clsx from "clsx";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  isOpen: (value: string) => boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within <Accordion>");
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
}

export function Accordion({ type = "single", className, children, ...props }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        const currentlyOpen = prev.has(value);
        if (type === "single") {
          next.clear();
          if (!currentlyOpen) {
            next.add(value);
          }
        } else {
          if (currentlyOpen) {
            next.delete(value);
          } else {
            next.add(value);
          }
        }
        return next;
      });
    },
    [type]
  );

  const contextValue = React.useMemo<AccordionContextValue>(
    () => ({
      type,
      openItems,
      toggleItem,
      isOpen: (value: string) => openItems.has(value),
    }),
    [type, openItems, toggleItem]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={clsx("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("Accordion components must be used within <AccordionItem>");
  }
  return context;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={clsx("border border-gray-200 rounded-xl", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { toggleItem, isOpen } = useAccordionContext();
    const { value } = useAccordionItemContext();
    const open = isOpen(value);

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium",
          className
        )}
        aria-expanded={open}
        onClick={() => toggleItem(value)}
        {...props}
      >
        <span>{children}</span>
        <span aria-hidden>{open ? "−" : "+"}</span>
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useAccordionContext();
    const { value } = useAccordionItemContext();
    const open = isOpen(value);

    return (
      <div
        ref={ref}
        className={clsx("px-4 pb-4 text-sm", !open && "hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
