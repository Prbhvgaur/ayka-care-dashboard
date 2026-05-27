import { Input } from "@/components/ui/Input";

export function ProductFilters({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
      <Input
        label="Search"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, SKU, category"
        value={search}
      />
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Category
        <select
          className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4 text-[var(--text-primary)]"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={category}
        >
          <option value="">All categories</option>
          <option value="Medical Devices">Medical Devices</option>
          <option value="Diagnostics">Diagnostics</option>
          <option value="Patient Care">Patient Care</option>
          <option value="Software">Software</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Status
        <select
          className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4 text-[var(--text-primary)]"
          onChange={(event) => onStatusChange(event.target.value)}
          value={status}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="low-stock">Low stock</option>
          <option value="out-of-stock">Out of stock</option>
        </select>
      </label>
    </div>
  );
}
