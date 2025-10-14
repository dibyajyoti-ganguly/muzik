/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from "console";
import { prisma } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const YT_Regex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&].*)?$/;

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

//endpoint to add stream(s)
export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());

    const isYt = YT_Regex.test(data.url);

    if (!isYt) return NextResponse.json({ message: "Wrong URL format" });

    const extractedId = data.url.split("?v=")[1];

    await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        type: "YouTube",
      },
    });

    return NextResponse.json({ message: "Sucessfully added stream" });
  } catch (e) {
    return NextResponse.json({
      message: "Error while adding stream",
      error: e,
    });
  }
}
