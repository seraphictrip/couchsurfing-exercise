"use client";

import UserDetails, {
  UserDetailsSkeleton,
} from "@/components/users/user-details";
import { notFound, useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("unexpected error");
  });

export default function UserDetailsPage() {
  // Using service directly in server side components is more idomatic next.js
  // but requirements specifically call out using the api
  // see requirement: The profile information should come from API endpoints that are served from the NextJS app.
  // NOTE: this is a dynamic route by default, so no additional steps were needed to invalidate cache
  const { id } = useParams();

  const { data: details, isLoading } = useSWR(`/api/users/${id}`, fetcher);

  if (isLoading) {
    return (
      <div className="bg-slate-100 h-screen">
        <div className="container mx-auto max-w-screen-sm my-32">
          <UserDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (!details) {
    return notFound();
  }
  return (
    <div className="bg-slate-100 h-screen">
      <div className="container mx-auto max-w-screen-sm">
        <UserDetails user={details} />
      </div>
    </div>
  );
}
