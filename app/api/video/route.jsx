import { VIDEO_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db"; // Ensure DB connection is imported
import { eq } from "drizzle-orm"; // Ensure 'eq' function is imported

// ✅ Create a new video record
export async function POST(req) {
  try {
    const { videoId, userEmail } = await req.json();

    if (!videoId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(VIDEO_TABLE)
      .values({ videoId, createBy: userEmail })
      .returning();

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Update video data
export async function PUT(req) {
  try {
    const { videoId, videoData } = await req.json();

    if (!videoId || !videoData) {
      return NextResponse.json(
        { error: "Missing videoId or videoData" },
        { status: 400 }
      );
    }

    const result = await db
      .update(VIDEO_TABLE)
      .set({ videoData })
      .where(eq(VIDEO_TABLE.videoId, videoId))
      .returning();

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Fetch video data
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); // 🔥 Fix incorrect query parsing
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(VIDEO_TABLE)
      .where(eq(VIDEO_TABLE.videoId, videoId));

    if (!result.length) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
