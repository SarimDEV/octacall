import React, { useEffect, useRef } from "react";

export const useUserMedia = () => {
  const selfMediaStream = useRef<MediaStream | null>(null);
  const selfVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      selfMediaStream.current = stream;
      selfVideo.current!.srcObject = stream;
    };

    getMedia();
  }, []);

  return { selfMediaStream, selfVideo };
};
