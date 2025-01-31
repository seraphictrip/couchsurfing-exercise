import { fetchUsers } from "@/repository/users";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // extract any query strings
  const offsetStr = request.nextUrl.searchParams.get("offset") || "";
  const limitStr = request.nextUrl.searchParams.get("limit") || "";
  console.log(request.nextUrl.searchParams);
  let offset = parseInt(offsetStr);
  if (!isNaN(offset)) {
    offset = offset;
  } else {
    offset = 0;
  }

  let limit = parseInt(limitStr);
  if (!isNaN(limit)) {
    limit = limit;
  } else {
    limit = 10;
  }

  const users = await fetchUsers(10, offset);

  return Response.json(users);
}
