"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

function NewsCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const date = item.pubDate ? new Date(item.pubDate).toLocaleDateString("he-IL", { day: "numeric", month: "long" }) : null;

  return (
    <div
      className="glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={() => setExpanded(e => !e)}
    >
      {item.image && (
        <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-hover)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.titleHe || item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="p-4">
        {item.categories?.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {item.categories.slice(0, 2).map(c => (
              <span key={c} className="rounded-full bg-white/40 px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-tertiary)]">{c}</span>
            ))}
          </div>
        )}
        <h3 className="font-semibold leading-snug text-[var(--color-text-primary)] line-clamp-2 text-sm">
          {item.titleHe || item.title}
        </h3>
        {item.excerptHe && (
          <p className={`mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)] transition-all duration-300 ${expanded ? "line-clamp-6" : "line-clamp-3"}`}>
            {item.excerptHe}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          {date && <span className="text-[10px] text-[var(--color-text-tertiary)]">{date}</span>}
          {expanded ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-medium text-white hover:opacity-80">
              המשך קריאה ב-9to5Mac <ExternalLink size={10} />
            </a>
          ) : (
            <span className="text-[11px] text-[var(--color-text-tertiary)]">לחץ להרחבה</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExpandableNewsGrid({ articles }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map(item => <NewsCard key={item.link} item={item} />)}
    </div>
  );
}
