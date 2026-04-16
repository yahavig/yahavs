"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { formatViewCount, formatRelativeDate } from "@/lib/format";

export default function FeaturedCard({ video, size = "large", index = 0 }) {
  const isLarge = size === "large";

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="relative overflow-hidden bg-[var(--color-surface-hover)] aspect-video"
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        <div className="absolute top-3 end-3">
          <Badge variant="youtube">נבחר</Badge>
        </div>
      </div>

      <div className={`flex flex-col gap-2 ${isLarge ? "p-5" : "p-4"}`}>
        <h3
          className={`font-semibold leading-snug text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors ${
            isLarge ? "text-lg" : "text-sm"
          }`}
        >
          {video.title}
        </h3>
        {video.description && isLarge && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {video.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
          {video.viewCount && (
            <span>{formatViewCount(video.viewCount)} צפיות</span>
          )}
          {video.viewCount && video.publishedAt && <span>·</span>}
          {video.publishedAt && (
            <span>{formatRelativeDate(video.publishedAt)}</span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
