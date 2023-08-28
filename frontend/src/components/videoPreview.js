import React, {Component} from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import "./videoPreview.css";

const VideoHoverCard = ({ videoId, videoTitle }) => {
    return(
    <HoverCard.Root openDelay={200} closeDelay={200}>
        <HoverCard.Trigger asChild>
        <p style={{fontSize: 10, fontFamily: 'cursive', color: 'black'}}>{videoTitle}</p>
        </HoverCard.Trigger>
        <HoverCard.Portal>
            <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                <video controls>
                    <source src={`http://localhost:4000/videos/${videoId}`} type="video/mp4" />
                </video>
                <HoverCard.Arrow className="HoverCardArrow" />
            </HoverCard.Content>
        </HoverCard.Portal>
    </HoverCard.Root>
    );
};

export default VideoHoverCard;