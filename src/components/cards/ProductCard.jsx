import Image from "next/image";
import { ShoppingBag, ChevronLeft } from "lucide-react";

export default function ProductCard({ product, preload = false }) {
  const { title, description, image, url, price } = product;

  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[var(--color-surface-hover)]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            preload={preload}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-text-tertiary)]">
            <ShoppingBag size={40} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold leading-snug text-[var(--color-text-primary)] line-clamp-2 transition-colors group-hover:text-[var(--color-accent)]">
          {title}
        </h3>
        {description && (
          <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2">
          {price && (
            <span className="text-sm font-bold text-[var(--color-text-primary)]">{price}</span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0071E3] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-[#0077ED]">
            לאלי אקספרס
            <ChevronLeft size={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
