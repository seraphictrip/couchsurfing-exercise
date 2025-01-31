import { Suspense } from "react";
import UserList from "../components/users/user-list";

export default function Home() {
  return (
    <div>
      <div className="container justify-center items-center mx-auto max-w-screen-md">
        <h1 className="text-6xl font-bold my-16">Find a Friend</h1>
        <Suspense
          fallback={
            <div className="text-center mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 container max-w-screen-md">
              ...loading
            </div>
          }
        >
          <UserList />
        </Suspense>
      </div>
    </div>
  );
}
