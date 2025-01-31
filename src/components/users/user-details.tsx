import { User } from "@/entities/user";
import Image from "next/image";
import Link from "next/link";

interface UserDetailsProps {
  user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <article className="shadow-md bg-white p-4 relative my-32 rounded-lg">
      <div className="flex justify-center">
        <Image
          className="absolute -top-20 w-32 h-32 rounded-full mx-auto shadow-md border-4 borer-white transition duration-200 transform hover:scale-11"
          src={user.avatar}
          alt={user.short}
          width={128}
          height={128}
        ></Image>
      </div>
      <div className="mt-16"></div>
      <h2 className="text-3xl font-bold text-center">
        {user.firstName} {user.lastName}
      </h2>
      <div className="text-center font-bold text-gray-400">{user.short}</div>
      <div className="p-4 text-gray-600 font-medium">{user.bio}</div>
      <div>
        {user.friends && user.friends.length > 0 && (
          <h3 className="font-bold text-lg p-4">You might also like</h3>
        )}
        <ul className="flex flex-wrap gap-2 justify-start items-center">
          {user.friends.map((friend) => {
            return (
              <li
                key={friend.id}
                className="text-white py-1 px-4 bg-blue-500 rounded-full hover:bg-blue-400 bg-gradient-to-r from-blue-600"
              >
                <Link href={`/users/${friend.id}`}>
                  {friend.firstName} {friend.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
