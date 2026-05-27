import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatShortDate } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-center bg-[var(--bg-tertiary)] p-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-[24px] border bg-white/60">
          <Image alt={product.name} fill sizes="96px" src={product.image} />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-semibold">{product.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{product.sku}</p>
          </div>
          <Badge>{product.status}</Badge>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{product.category}</Badge>
          <Badge tone="neutral">Stock {product.stock}</Badge>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Price</p>
            <p className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              Rs. {product.price.toLocaleString("en-IN")}
            </p>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Updated {formatShortDate(product.updatedAt)}
          </p>
        </div>
      </div>
    </Card>
  );
}
