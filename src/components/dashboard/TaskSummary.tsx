import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getUserById } from "@/lib/mock-db";
import { taskDueLabel } from "@/lib/utils";
import type { Task } from "@/types/task";

export function TaskSummary({ tasks }: { tasks: Task[] }) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <p className="eyebrow">Urgent Queue</p>
        <h2 className="font-display text-2xl font-semibold">High Priority Tasks</h2>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => {
          const assignee = getUserById(task.assignee);
          return (
            <div className="rounded-[18px] bg-[var(--bg-tertiary)]/70 p-4" key={task.id}>
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{task.category}</p>
                </div>
                <Badge kind="priority">{task.priority}</Badge>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-[var(--text-secondary)]">{taskDueLabel(task.dueDate)}</p>
                {assignee ? <Avatar alt={assignee.name} size={32} src={assignee.avatar} /> : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
