import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getUserById } from "@/lib/mock-db";
import { taskDueLabel } from "@/lib/utils";
import type { Task } from "@/types/task";

export function TaskCard({ task }: { task: Task }) {
  const assignee = getUserById(task.assignee);

  return (
    <Card className="p-4 transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <Badge kind="priority">{task.priority}</Badge>
        <Badge tone="neutral">{task.category}</Badge>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{task.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-secondary)]">{taskDueLabel(task.dueDate)}</p>
        {assignee ? <Avatar alt={assignee.name} size={30} src={assignee.avatar} /> : null}
      </div>
    </Card>
  );
}
