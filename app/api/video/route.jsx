import { VIDEO_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { videoId, userEmail } = await req.json();

  const result = await db
    .insert(VIDEO_TABLE)
    .values({
      videoId: videoId,
      createBy: userEmail,
    })
    .returning(VIDEO_TABLE);
  return NextResponse.json({ result });
}
