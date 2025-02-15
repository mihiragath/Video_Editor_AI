import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

function RemotionComposition({ frameList }) {
  let trackFrame = 0;
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      {frameList.map((frame, index) => {
        const fromFrame = index == 0 ? 0 : trackFrame;
        const duration = frame.duration * 30;
        trackFrame = trackFrame + frame.duration * 30;
        return (
          <Sequence key={index} from={fromFrame} durationInFrames={duration}>
            <h2
              style={{
                color: "white",
              }}
            >
              <AbsoluteFill>
                <h2
                  style={{
                    color: "white",
                    transform: `translateX(${width / 2 - 30}px) translateY(${
                      height / 2 - 30
                    }px)`,
                  }}
                >
                  {frame.text}
                </h2>
              </AbsoluteFill>
            </h2>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

export default RemotionComposition;
