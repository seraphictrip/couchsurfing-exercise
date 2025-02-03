import { fetchUsers } from "@/repository/users";
import UserListItem from "./user-list-item";
import { User } from "@/entities/user";

import FindMoreButton from "./find-more-button";

const LIMIT = 10;

interface UserListProps {
  offset: number;
}

export default async function UserList({ offset }: UserListProps) {
  const data = await fetchUsers(LIMIT, offset);

  const users = data.items;
  const total = data.total;

  if (!users) {
    return null;
  }

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 container max-w-screen-md">
      {users.map((user: User) => {
        return <UserListItem user={user} key={user.id} />;
      })}
      <div>
        <FindMoreButton max={total - LIMIT} />
      </div>
    </div>
  );
}
