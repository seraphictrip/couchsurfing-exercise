"use client";

import useSWR from "swr";
import UserListItem from "./user-list-item";
import { User } from "@/entities/user";
import { useState } from "react";

const LIMIT = 10;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("unexpected error");
  });

export default function UserList() {
  const [offset, setOffset] = useState<number>(0);
  const { data, isLoading } = useSWR(
    `/api/users?offset=${offset}&limit=${LIMIT}`,
    fetcher
  );

  if (isLoading) {
    // TODO: add a better loading screen
    return (
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 container max-w-screen-md">
        ...loading
      </div>
    );
  }

  const users = data.items;
  const total = data.total;

  if (!users) {
    return null;
  }

  const handleFindMoreClick = () => {
    setOffset(Math.random() * (total - LIMIT));
  };

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 container max-w-screen-md">
      {users.map((user: User) => {
        return <UserListItem user={user} key={user.id} />;
      })}
      <div>
        <button
          type="button"
          className="text-white py-1 px-4 bg-blue-500 hover:bg-blue-400 "
          onClick={handleFindMoreClick}
        >
          Find more
        </button>
      </div>
    </div>
  );
}
