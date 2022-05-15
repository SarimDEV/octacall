import { Box, Container, Group } from "@mantine/core";
import React, { useContext, useState } from "react";
import {
  Microphone,
  MicrophoneOff,
  VideoOff,
  VideoPlus,
  Video as VideoIcon,
} from "tabler-icons-react";
import { UserMediaContext } from "../../context/UserMediaContext";
import { IconButton } from "../design-system/IconButton";
import { Video } from "../design-system/Video";

const ControlsContainer = () => {
  const [muted, setMuted] = useState(false);
  const [camOn, setCamOn] = useState(true);

  return (
    <Group
      position={"right"}
      spacing={"lg"}
      sx={{
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 25,
      }}
    >
      <IconButton
        label={muted ? "Unmute" : "Mute"}
        onClick={() => setMuted(!muted)}
        active={muted}
      >
        {muted ? <MicrophoneOff /> : <Microphone />}
      </IconButton>
      <IconButton
        label={camOn ? "Turn Camera Off" : "Turn Camera On"}
        onClick={() => setCamOn(!camOn)}
        active={!camOn}
      >
        {camOn ? <VideoIcon /> : <VideoOff />}
      </IconButton>
    </Group>
  );
};

export const SelfVideo = () => {
  const { selfVideo } = useContext(UserMediaContext);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        // height: "100%",
        backgroundColor: "black",
        borderRadius: 12,
      }}
    >
      <Video ref={selfVideo} />
      <ControlsContainer />
    </Box>
  );
};
