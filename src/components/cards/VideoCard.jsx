"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VideoCard({ video, index = 0 }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full flex flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[var(--color-surface-hover)]">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-text-tertiary)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-4">
        <h3 className="text-sm font-semibold leading-snug text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {video.title}
        </h3>
      </div>
    </motion.a>
  );
}
