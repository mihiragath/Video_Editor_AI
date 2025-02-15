"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import axios from "axios";

function VideoCreateOption() {
  const createNewScratchVideo = async () => {
    const videoId = uuid4();
    const router = useRouter();
    const result = await axios.post("/api/video", {
      videoId: videoId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result);
    router.push("/editor" + videoId);
  };
  return (
    <div className="p-5 rounded-lg border mt-10">
      <h2 className="font-bold text-2xl">Let's create your first Video</h2>
      <div className="flex gap-5 items-center justify-center mt-5">
        <Link href={"/create-ai-video"}>
          <div className="border rounded-lg p-4 w-full  cursor-pointer hover:bg-gray-100">
            <Image src={"/magic.png"} alt="magic" width={40} height={40} />
            <h2 className="text-lg">Generate With AI</h2>
          </div>
        </Link>
        <div onClick={createNewScratchVideo}>
          <div className="border rounded-lg p-4 w-full  cursor-pointer hover:bg-gray-100">
            <Image
              src={"/video-editing.png"}
              alt="magic"
              width={40}
              height={40}
            />
            <h2 className="text-lg">Create From Scratch</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCreateOption;
