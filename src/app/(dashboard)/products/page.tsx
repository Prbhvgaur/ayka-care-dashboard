"use client";

import { useMemo, useState } from "react";
import { Package2 } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProducts } from "@/hooks/useProducts";
import { useSearch } from "@/hooks/useSearch";

export default function ProductsPage() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { search, setSearch, debouncedSearch } = useSearch();

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      category,
      status,
      page,
      limit: 9,
    }),
    [category, debouncedSearch, page, status],
  );

  const { data, isLoading } = useProducts(params);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-light)] px-3 py-1 text-sm font-semibold text-[var(--color-brand)]">
            Products
            <span>{data?.total ?? 0}</span>
          </div>
          <h2 className="font-display text-4xl font-semibold">Product Catalog</h2>
          <p className="text-[var(--text-secondary)]">
            Browse healthcare devices, diagnostics, pharmacy inventory, and software products.
          </p>
        </div>
      </div>

      <Card className="p-6">
        <ProductFilters
          category={category}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          search={search}
          status={status}
        />
      </Card>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="surface-card skeleton h-[340px] rounded-[28px]" key={index} />
          ))}
        </div>
      ) : data?.data.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[32px] bg-[var(--color-brand-light)] text-[var(--color-brand)]">
            <Package2 className="h-14 w-14" />
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold">No products found</h3>
          <p className="mt-2 text-[var(--text-secondary)]">
            Try a broader search or clear the current filters.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearch("");
              setCategory("");
              setStatus("");
            }}
          >
            Clear filters
          </Button>
        </Card>
      )}

      {data ? (
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <p>
            Showing {data.data.length} of {data.total} products
          </p>
          <div className="flex items-center gap-2">
            <Button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} variant="secondary">
              Previous
            </Button>
            <span className="rounded-full bg-[var(--bg-secondary)] px-4 py-2 font-semibold text-[var(--text-primary)]">
              Page {data.page} / {data.totalPages}
            </span>
            <Button
              disabled={page >= data.totalPages}
              onClick={() => setPage((value) => value + 1)}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
