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

export async function PUT(req) {

  const [videoId, videoData] = await req.json();

  const result = await db.update(VIDEO_TABLE).set({
    videoData: videoData,
  }).where(eq(VIDEO_TABLE.videoId, videoId))
  .returning(VIDEO_TABLE)
  
  return NextResponse.json({ result });
}

export async function GET(req)
{
  const { searchParams} = new URLSearchParams(req.url);
  const videoId = searchParams.get('videoId');

  const result = await db
    .select()
    .from(VIDEO_TABLE)
    .where(eq(VIDEO_TABLE.videoId, videoId))
    
    return NextResponse.json( result[0] );
}