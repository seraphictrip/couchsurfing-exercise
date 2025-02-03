import { Suspense } from "react";
import UserList from "../components/users/user-list";

interface HomeProps {
  searchParams: Promise<{ offset?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { offset: offsetStr = "" } = (await searchParams) || {};

  let offset = 0;
  if (!isNaN(parseInt(offsetStr))) {
    offset = parseInt(offsetStr);
  }
  return (
    <div className="p-4">
      <div className="container justify-center items-center mx-auto max-w-screen-md">
        <h1 className="text-6xl font-bold my-16">Find a Friend</h1>
        <Suspense
          fallback={
            <div className="text-center mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 container max-w-screen-md">
              ...loading
            </div>
          }
        >
          <UserList offset={offset} />
        </Suspense>
      </div>
    </div>
  );
}
