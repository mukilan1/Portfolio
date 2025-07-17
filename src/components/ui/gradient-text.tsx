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
        "relative inline-block bg-transparent",
        className,
      )}
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 6s ease-in-out infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent'
      }}
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.9
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export { GradientText }
