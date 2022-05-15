import React, {
  useEffect,
  useRef,
  ReactNode,
  createContext,
  MutableRefObject,
} from "react";

interface Props {
  children: ReactNode;
}

const UserMediaContext = createContext<{
  selfMediaStream: React.MutableRefObject<MediaStream | null> | null;
  selfVideo: React.MutableRefObject<HTMLVideoElement | null> | null;
}>({
  selfMediaStream: null,
  selfVideo: null,
});

const UserMediaContextProvider = ({ children }: Props) => {
  const selfMediaStream: MutableRefObject<MediaStream | null> =
    useRef<MediaStream | null>(null);
  const selfVideo: MutableRefObject<HTMLVideoElement | null> =
    useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        selfMediaStream.current = stream;
        selfVideo.current!.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };

    getMedia();
  }, []);

  return (
    <UserMediaContext.Provider value={{ selfMediaStream, selfVideo }}>
      {selfVideo ? children : null}
    </UserMediaContext.Provider>
  );
};

export { UserMediaContextProvider, UserMediaContext };
