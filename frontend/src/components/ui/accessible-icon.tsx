
import React from "react";
import { cn } from "@/lib/utils";

interface AccessibleIconProps extends React.SVGAttributes<SVGElement> {
  label: string;
  children: React.ReactNode;
}

export function AccessibleIcon({
  label,
  children,
  className,
  ...props
}: AccessibleIconProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {React.cloneElement(children as React.ReactElement, {
        "aria-hidden": true,
        focusable: false,
        ...props,
      })}
      <span className="sr-only">{label}</span>
    </span>
  );
}
