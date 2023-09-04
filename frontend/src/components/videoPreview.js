import React, { useEffect, useRef } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import "./videoPreview.css";

const VideoHoverCard = ({ videoId, videoTitle }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (document.open === true && videoRef.current) {
      videoRef.current.currentTime = 5;
      videoRef.current.play().catch(error => console.log("Couldn't autoplay: ", error));
    }
  }, [videoId]);

  return (
    <HoverCard.Root openDelay={500} closeDelay={300}>
      <HoverCard.Trigger asChild>
        <p style={{fontSize: 10, fontFamily: 'cursive', color: 'black'}}>{videoTitle}</p>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <video ref={videoRef} autoPlay={true} muted preload="auto" className="HoverCardVideo"
            onCanPlay={() => {
              videoRef.current.play().catch(error => console.log("Couldn't autoplay: ", error));
            }}
          >
            <source src={`http://localhost:4000/videos/${videoId}`} type="video/mp4" />
          </video>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default VideoHoverCard;