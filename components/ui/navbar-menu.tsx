"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-xs sm:text-sm font-semibold text-[#10201B] hover:text-[#137A58] dark:text-[#ECFDF5] dark:hover:text-[#34D399] px-3 py-1.5 rounded-full hover:bg-[#F0F5F2] dark:hover:bg-[#162720] transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white/90 dark:bg-black/85 backdrop-blur-2xl rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative rounded-full border border-[#DDE7E2] dark:border-[#1E382D] bg-white/90 dark:bg-[#0B1310]/90 backdrop-blur-xl shadow-lg flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 transition-colors",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F5F2] dark:hover:bg-[#162720] transition-colors group"
    >
      {icon && (
        <div className="p-2 rounded-lg bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
          {icon}
        </div>
      )}
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-[#10201B] dark:text-[#ECFDF5] group-hover:text-[#137A58] dark:group-hover:text-[#34D399] transition-colors">
          {title}
        </h4>
        <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] max-w-[13rem] leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...rest}
      className={cn(
        "text-xs text-[#62756E] dark:text-[#9BB3A8] hover:text-[#137A58] dark:hover:text-[#34D399] transition-colors block py-1 font-medium",
        className
      )}
    >
      {children}
    </Link>
  );
};
