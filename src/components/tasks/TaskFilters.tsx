import { Input } from "@/components/ui/Input";

export function TaskFilters({
  search,
  onSearchChange,
  status,
  priority,
  category,
  assignee,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onAssigneeChange,
  assigneeOptions,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  priority: string;
  category: string;
  assignee: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAssigneeChange: (value: string) => void;
  assigneeOptions: Array<{ id: string; name: string }>;
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[2fr_repeat(4,1fr)]">
      <Input
        label="Search"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search title, category, tags..."
        value={search}
      />
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Status
        <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" onChange={(event) => onStatusChange(event.target.value)} value={status}>
          <option value="">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Priority
        <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" onChange={(event) => onPriorityChange(event.target.value)} value={priority}>
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Category
        <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" onChange={(event) => onCategoryChange(event.target.value)} value={category}>
          <option value="">All categories</option>
          <option value="Patient Care">Patient Care</option>
          <option value="Admin">Admin</option>
          <option value="Technical">Technical</option>
          <option value="Compliance">Compliance</option>
          <option value="Reporting">Reporting</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Assignee
        <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" onChange={(event) => onAssigneeChange(event.target.value)} value={assignee}>
          <option value="">All assignees</option>
          {assigneeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
