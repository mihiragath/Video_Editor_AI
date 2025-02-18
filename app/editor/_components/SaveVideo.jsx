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
    if (videoId) GetVideoData();
  }, [videoId]);

  const saveVideo = async () => {
    try {
      const result = await axios.put("/api/video", {
        videoId: videoId,
        videoData: videoFrames,
      });
      toast.success("Video Saved!");
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Failed to save video!");
    }
  };

  const GetVideoData = async () => {
    try {
      const result = await axios.get(`/api/video?videoId=${videoId}`);
      setVideoFrames(result?.data?.videoData);
    } catch (error) {
      console.error("Error fetching video data:", error);
      toast.error("Failed to load video data!");
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={saveVideo}>
        Save
      </Button>
    </div>
  );
}

export default SaveVideo;
