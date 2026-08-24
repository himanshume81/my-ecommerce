import type { CSSProperties } from "react";

export function ProductArt({ color, art, className = "" }: { color: string; art: string; className?: string }) {
  return <div className={`product-art flex items-center justify-center rounded-[2px] ${className}`} style={{ backgroundColor: color } as CSSProperties}><span className="font-serif text-[112px] leading-none text-white/70 transition-transform duration-500 group-hover:scale-110">{art}</span></div>;
}
