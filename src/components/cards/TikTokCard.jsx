"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TikTokCard({ video, index = 0 }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg glass transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] max-h-64 overflow-hidden bg-[var(--color-surface-hover)]">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title || "TikTok video"}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" opacity="0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Platform badge hidden in carousel context */}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-text)] transition-colors">
          {video.title || "סרטון TikTok"}
        </h3>
        {video.authorName && (
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {video.authorName}
          </p>
        )}
      </div>
    </motion.a>
  );
}
