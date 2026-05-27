"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutList, LayoutPanelTop, Plus } from "lucide-react";
import { z } from "zod";

import usersJson from "@/data/users.json";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useSearch } from "@/hooks/useSearch";
import { useTasks } from "@/hooks/useTasks";
import { taskSchema } from "@/lib/validations";
import type { User } from "@/types/user";

const taskFormSchema = taskSchema
  .omit({ tags: true })
  .extend({ tagsInput: z.string().min(2, "Add at least one tag.") });

type TaskFormValues = z.infer<typeof taskFormSchema>;
const assigneeOptions = usersJson as User[];

export default function TasksPage() {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [assignee, setAssignee] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [open, setOpen] = useState(false);
  const { search, setSearch, debouncedSearch } = useSearch();

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      status,
      priority,
      category,
      assignee,
      page,
      limit: 20,
    }),
    [assignee, category, debouncedSearch, page, priority, status],
  );

  const { data, isLoading, createTask } = useTasks(params);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      category: "Patient Care",
      assignee: assigneeOptions[0]?.id ?? "",
      dueDate: "",
      tagsInput: "care, follow-up",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <p className="eyebrow">Task Management</p>
          <h2 className="font-display text-4xl font-semibold">Care Operations Board</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setView("kanban")} variant={view === "kanban" ? "primary" : "secondary"}>
            <LayoutPanelTop className="h-4 w-4" />
            Kanban
          </Button>
          <Button onClick={() => setView("list")} variant={view === "list" ? "primary" : "secondary"}>
            <LayoutList className="h-4 w-4" />
            List
          </Button>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <TaskFilters
          assignee={assignee}
          assigneeOptions={assigneeOptions.map((user) => ({ id: user.id, name: user.name }))}
          category={category}
          onAssigneeChange={setAssignee}
          onCategoryChange={setCategory}
          onPriorityChange={setPriority}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          priority={priority}
          search={search}
          status={status}
        />
      </Card>

      {isLoading ? (
        <div className="grid gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="surface-card skeleton h-[320px] rounded-[28px]" key={index} />
          ))}
        </div>
      ) : view === "kanban" ? (
        <TaskBoard tasks={data?.data ?? []} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.data.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      )}

      {data ? (
        <div className="flex items-center justify-end gap-2">
          <Button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} variant="secondary">
            Previous
          </Button>
          <span className="rounded-full bg-[var(--bg-secondary)] px-4 py-2 font-semibold">
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
      ) : null}

      <Modal
        description="Create a new task for the healthcare operations team."
        onOpenChange={setOpen}
        open={open}
        title="Add task"
      >
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async (values) => {
            const tags = values.tagsInput
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);
            await createTask.mutateAsync({ ...values, tags });
            reset();
            setOpen(false);
          })}
        >
          <Input error={errors.title?.message} label="Title" {...register("title")} />
          <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            Description
            <textarea
              className="min-h-28 rounded-[18px] border bg-[var(--bg-secondary)] px-4 py-3 outline-none"
              {...register("description")}
            />
            {errors.description?.message ? (
              <span className="text-sm text-[var(--color-danger)]">{errors.description.message}</span>
            ) : null}
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              Priority
              <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" {...register("priority")}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              Status
              <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" {...register("status")}>
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              Category
              <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" {...register("category")}>
                <option value="Patient Care">Patient Care</option>
                <option value="Admin">Admin</option>
                <option value="Technical">Technical</option>
                <option value="Compliance">Compliance</option>
                <option value="Reporting">Reporting</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              Assignee
              <select className="h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4" {...register("assignee")}>
                {assigneeOptions.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input error={errors.dueDate?.message} label="Due Date" type="date" {...register("dueDate")} />
            <Input label="Tags" {...register("tagsInput")} />
          </div>
          <Button className="justify-center" loading={createTask.isPending} type="submit">
            Create task
          </Button>
        </form>
      </Modal>
    </div>
  );
}
