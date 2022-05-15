import React from "react";

type Props = {};
export type Ref = HTMLVideoElement;

export const Video = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <video
      style={{ borderRadius: 12, width: "100%" }}
      ref={ref}
      muted
      autoPlay
      playsInline
    />
  );
});

Video.displayName = "Video";
