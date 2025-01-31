import { fetchUserById } from "@/repository/users";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return Response.json({ message: "bad request" }, { status: 400 });
  }

  const user = await fetchUserById(numId);

  return Response.json(user);
}
