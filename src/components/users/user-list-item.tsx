import { User } from "@/entities/user";
import Image from "next/image";
import Link from "next/link";

interface UserListItemProps {
  user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
  return (
    <Link href={`/users/${user.id}`} className="flex items-center gap-4">
      <Image
        src={user.avatar}
        alt={user.firstName}
        height={64}
        width={64}
        className="rounded-full"
      ></Image>
      <div className="flex flex-col">
        <h3 className="font-bold text-lg">
          {user.firstName}, {user.lastName}
        </h3>
        <div className="font-bold text-gray-400">{user.short}</div>
      </div>
    </Link>
  );
}
