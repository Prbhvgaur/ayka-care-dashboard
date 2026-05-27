import Image from "next/image";

import { cn, getInitials } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  size = 40,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full border border-white/40 bg-[var(--bg-tertiary)]", className)}
      style={{ height: size, width: size }}
    >
      <Image alt={alt} fill sizes={`${size}px`} src={src} />
      <span className="sr-only">{getInitials(alt)}</span>
    </div>
  );
}
