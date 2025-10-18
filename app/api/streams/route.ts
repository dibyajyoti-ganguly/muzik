import { prisma } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { GetVideoDetails } from "youtube-search-api";

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

    const video_data = await GetVideoDetails(extractedId);

    await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        title: video_data.title ?? "Can't find video",
        thumbnail: JSON.stringify(video_data.thumbnail.thumbnails[4].url),
        type: "YouTube",
      },
    });

    return NextResponse.json({ message: "Sucessfully added stream" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Error while adding stream",
      error:
        e instanceof Error
          ? { name: e.name, message: e.message, stack: e.stack }
          : e,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("creatorId");

    const streams = await prisma.stream.findMany({
      where: {
        userId: userId ?? "",
      },
    });

    return NextResponse.json(streams);
  } catch (e) {
    return NextResponse.json(
      { message: "Error while fetching streams", error: e },
      { status: 500 }
    );
  }
}
