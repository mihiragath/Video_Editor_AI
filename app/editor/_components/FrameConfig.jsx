"use client";

import React, { useContext, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Frame, LeafIcon } from "lucide-react";
import TextAreaBox from "./TextAreaBox";
import { VideoFrameContext } from "@/app/_context/VideoFrameContext";

function FrameConfig() {
  const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);

  const [frame, setFrame] = useState([]);

  useEffect(() => {
    if (videoFrames?.frameList) {
      setFrame(videoFrames.frameList[videoFrames?.selectedFrame]);
    }
  }, [videoFrames]);

  const handleInputChange = (field, value) => {
    setFrame((prev) => ({
      [field]: value,
    }));
  };

  useEffect(() => {
    if (videoFrames?.selectedFrame?.length > 0 && frame) {
      const frameList = videoFrames?.frameList;
      frameList[videoFrames?.selectedFrame] = frame;
      frame.text != frameList[videoFrames?.selectedFrame].text &&
        setVideoFrames;
      setVideoFrames((prev) => ({
        ...prev,
        frameList: frameList,
      }));
    }
  }, [frame]);

  return (
    <div className="p-3 bg-gray-100 rounded-lg ">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="flex gap-2 text-lg items-center">
              {" "}
              <LeafIcon /> Text
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <TextAreaBox
              frame={frame}
              handleInputChange={(value) => handleInputChange("test", value)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FrameConfig;
