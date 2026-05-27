import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getUserById } from "@/lib/mock-db";
import { taskDueLabel } from "@/lib/utils";
import type { Task } from "@/types/task";

export function TaskSummary({ tasks }: { tasks: Task[] }) {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Attention Required</p>
        <h2 className="text-xl font-bold tracking-tight">Critical Backlog</h2>
      </div>
      <div className="divide-y divide-zinc-50 dark:divide-zinc-900">
        {tasks.map((task) => {
          const assignee = getUserById(task.assignee);
          return (
            <div className="py-4 first:pt-0 last:pb-0" key={task.id}>
              <div className="mb-1 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-bold text-black dark:text-white leading-tight">{task.title}</p>
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight mt-1">{task.category}</p>
                </div>
                <div className="flex items-center gap-1.5 h-fit px-1.5 py-0.5 rounded border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black">
                  <div className="h-1 w-1 rounded-full bg-red-500" />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-600 dark:text-zinc-400">{task.priority}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{taskDueLabel(task.dueDate)}</p>
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-zinc-500">{assignee.name.split(' ')[0]}</span>
                    <Avatar alt={assignee.name} size={20} src={assignee.avatar} className="grayscale" />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
