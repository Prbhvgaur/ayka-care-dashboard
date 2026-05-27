import { Input } from "@/components/ui/Input";

export function UserFilters({
  search,
  onSearchChange,
  role,
  status,
  department,
  onRoleChange,
  onStatusChange,
  onDepartmentChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  status: string;
  department: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_repeat(3,1fr)]">
      <Input
        aria-label="Search users"
        label="Search"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, email, department"
        value={search}
      />
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Role
        <select
          className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4 text-[var(--text-primary)]"
          onChange={(event) => onRoleChange(event.target.value)}
          value={role}
        >
          <option value="">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Patient">Patient</option>
          <option value="Support">Support</option>
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
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
        Department
        <select
          className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4 text-[var(--text-primary)]"
          onChange={(event) => onDepartmentChange(event.target.value)}
          value={department}
        >
          <option value="">All departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="General">General</option>
          <option value="Emergency">Emergency</option>
          <option value="Admin">Admin</option>
        </select>
      </label>
    </div>
  );
}
