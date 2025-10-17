import { prisma } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSChema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) return NextResponse.json({ message: "User not found" });

  const data = UpvoteSChema.parse(await req.json());

  try {
    await prisma.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });

    return NextResponse.json({ message: "Successfully downvoted a stream" });
  } catch (e) {
    return NextResponse.json({
      message: "Error while downvoting a stream",
      error: e,
    });
  }
}
