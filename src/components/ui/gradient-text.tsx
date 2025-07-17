"use client"
import React from "react";
import { motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex overflow-hidden bg-white dark:bg-black",
        className,
      )}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        <span 
          className="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] mix-blend-overlay blur-[1rem]"
          style={{
            background: 'hsl(var(--color-1))',
            animation: 'gradient-border 6s ease-in-out infinite, gradient-1 12s ease-in-out infinite alternate'
          }}
        />
        <span 
          className="pointer-events-none absolute right-0 top-0 h-[30vw] w-[30vw] mix-blend-overlay blur-[1rem]"
          style={{
            background: 'hsl(var(--color-2))',
            animation: 'gradient-border 6s ease-in-out infinite, gradient-2 12s ease-in-out infinite alternate'
          }}
        />
        <span 
          className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] mix-blend-overlay blur-[1rem]"
          style={{
            background: 'hsl(var(--color-3))',
            animation: 'gradient-border 6s ease-in-out infinite, gradient-3 12s ease-in-out infinite alternate'
          }}
        />
        <span 
          className="pointer-events-none absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] mix-blend-overlay blur-[1rem]"
          style={{
            background: 'hsl(var(--color-4))',
            animation: 'gradient-border 6s ease-in-out infinite, gradient-4 12s ease-in-out infinite alternate'
          }}
        />
      </span>
    </MotionComponent>
  );
}

export { GradientText }
