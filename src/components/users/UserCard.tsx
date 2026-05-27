import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatShortDate, relativeTime } from "@/lib/utils";
import type { User } from "@/types/user";

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <Avatar alt={user.name} size={58} src={user.avatar} />
        <Badge>{user.status}</Badge>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <h3 className="font-display text-2xl font-semibold">{user.name}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{user.role}</Badge>
          <Badge tone="neutral">{user.department}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 text-sm text-[var(--text-secondary)]">
          <div>
            <p>Joined</p>
            <p className="font-semibold text-[var(--text-primary)]">{formatShortDate(user.joinedAt)}</p>
          </div>
          <div>
            <p>Last Active</p>
            <p className="font-semibold text-[var(--text-primary)]">{relativeTime(user.lastActive)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
