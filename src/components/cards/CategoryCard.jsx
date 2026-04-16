"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  MessageCircle,
  Newspaper,
} from "lucide-react";

const iconMap = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  watch: Watch,
  headphones: Headphones,
  "message-circle": MessageCircle,
  newspaper: Newspaper,
};

export default function CategoryCard({ category, index = 0 }) {
  const Icon = iconMap[category.icon] || Smartphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group flex flex-col items-center gap-4 rounded-2xl bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:scale-[1.02]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
          <Icon size={26} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            {category.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            {category.nameHebrew}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
