import Image from "next/image";

import { getInitials } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  size = 40,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-full border border-white/40 bg-[var(--bg-tertiary)]"
      style={{ height: size, width: size }}
    >
      <Image alt={alt} fill sizes={`${size}px`} src={src} />
      <span className="sr-only">{getInitials(alt)}</span>
    </div>
  );
}
