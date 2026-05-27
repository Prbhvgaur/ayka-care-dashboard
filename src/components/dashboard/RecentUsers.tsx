import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatShortDate } from "@/lib/utils";
import type { User } from "@/types/user";

export function RecentUsers({ users }: { users: User[] }) {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Onboarding</p>
        <h2 className="text-xl font-bold tracking-tight">Recent Arrivals</h2>
      </div>
      <div className="divide-y divide-zinc-50 dark:divide-zinc-900">
        {users.map((user) => (
          <div className="flex items-center gap-3 py-3" key={user.id}>
            <Avatar alt={user.name} src={user.avatar} size={32} className="grayscale" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-black dark:text-white">{user.name}</p>
              <p className="truncate text-xs font-medium text-zinc-500">{user.role}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <div className="h-1 w-1 rounded-full bg-zinc-400" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{user.status}</span>
              </div>
              <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 tracking-tighter uppercase">{formatShortDate(user.joinedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
