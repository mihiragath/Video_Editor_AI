"use client";
import { VideoFrameContext } from "@/app/_context/VideoFrameContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

function SaveVideo() {
  const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);
  const { videoId } = useParams();

  useEffect(() => {
    videoId && GetVideoData();
  }, [videoId]);

  const saveVideo = async () => {
    const result = await axios.put("/api/video", {
      videoId: videoId,
      videoData: videoFrames,
    });
    toast("Video Saved!");
  };

  const GetVideoData = async () => {
    const result = await axios.get('/api/video/videoId='+videoId);
    setVideoFrames(result?.data?.videoData);
  }
  return (
    <div>
      <Button variant="outline" onClick={saveVideo()}>
        Save 
      </Button>
    </div>
  );
}

export default SaveVideo;
