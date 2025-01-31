import { User } from "@/entities/user";
import data from "@/seed/people.json" assert { type: "json" };
import { notFound } from "next/navigation";

export async function fetchUsers(
  limit: number = 10,
  offset: number = 0
): Promise<{ items: User[]; limit: number; offset: number; total: number }> {
  return {
    items: data.slice(offset, offset + limit),
    limit: limit,
    offset: offset,
    total: data.length,
  };
}

export async function fetchUserById(id: number): Promise<User> {
  const user = data.find((user) => user.id == id);

  if (!user) {
    return notFound();
  }
  return user;
}
