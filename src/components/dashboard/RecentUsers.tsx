import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatShortDate } from "@/lib/utils";
import type { User } from "@/types/user";

export function RecentUsers({ users }: { users: User[] }) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <p className="eyebrow">New Joiners</p>
        <h2 className="font-display text-2xl font-semibold">Recent Users</h2>
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <div className="flex items-center gap-3 rounded-[18px] bg-[var(--bg-tertiary)]/70 px-4 py-3" key={user.id}>
            <Avatar alt={user.name} src={user.avatar} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{user.name}</p>
              <p className="truncate text-sm text-[var(--text-secondary)]">{user.role}</p>
            </div>
            <div className="text-right">
              <Badge>{user.status}</Badge>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{formatShortDate(user.joinedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
