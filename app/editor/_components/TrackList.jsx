"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { VideoFrameContext } from "@/app/_context/VideoFrameContext";

const defaultFrame = {
  image: "/footage.png",
  text: "Hello world",
  textColor: "black",
  font: "Arial",
  fontSize: 20,
  duration: 2,
};

function TrackList() {
  const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);
  const [frameList, setFrameList] = useState(videoFrames?.frameList || [defaultFrame]);
  const [selectedFrame, setSelectedFrame] = useState(0);

  const addNewFrame = () => {
    setFrameList((prev) => [...prev, { ...defaultFrame }]);
  };

  const removeFrame = (indexToRemove) => {
    setFrameList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    const totalDuration = frameList.reduce((acc, frame) => acc + frame.duration, 0);

    setVideoFrames((prev) => ({
      ...prev,
      totalDuration,
      frameList,
      selectedFrame,
    }));
  }, [frameList, selectedFrame, setVideoFrames]);

  useEffect(() => {
    if (videoFrames?.frameList && JSON.stringify(videoFrames.frameList) !== JSON.stringify(frameList)) {
      setFrameList(videoFrames.frameList);
    }
  }, [videoFrames]);

  return (
    <div className="p-5 bg-gray-100 rounded-lg">
      <div className="h-[80vh] overflow-scroll scrollbar-hide">
        {frameList.map((frame, index) => (
          <div
            key={index}
            className={`flex flex-col items-center border-b p-2 mt-3 rounded-lg cursor-pointer ${
              selectedFrame === index ? "bg-white" : ""
            }`}
            onClick={() => setSelectedFrame(index)}
          >
            <Image
              src={frame.image}
              alt={`Frame ${index}`}
              width={40}
              height={40}
              className="w-full h-[40px] object-contain rounded-lg"
            />
            <h2 className="text-xs line-clamp-2">{frame.text}</h2>
            {selectedFrame === index && (
              <Trash2
                className="mt-1 h-3 w-3 text-red-500 cursor-pointer"
                onClick={() => removeFrame(index)}
              />
            )}
          </div>
        ))}
        <Button size="sm" className="mt-5 w-full" onClick={addNewFrame}>
          Add New Frame
        </Button>
      </div>
    </div>
  );
}

export default TrackList;
