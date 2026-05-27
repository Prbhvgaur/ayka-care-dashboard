import { TaskCard } from "@/components/tasks/TaskCard";
import type { Task } from "@/types/task";

const columns = [
  { key: "todo", label: "To Do", emoji: "📋" },
  { key: "in-progress", label: "In Progress", emoji: "⚡" },
  { key: "review", label: "Review", emoji: "👀" },
  { key: "done", label: "Done", emoji: "✅" },
] as const;

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.key);
        return (
          <div className="glass-panel rounded-[28px] p-4" key={column.key}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {column.emoji} {column.label}
                </p>
                <h3 className="font-display text-2xl font-semibold">{columnTasks.length}</h3>
              </div>
            </div>
            <div className="space-y-4">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
