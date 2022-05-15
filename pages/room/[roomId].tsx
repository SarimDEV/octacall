import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import type { NextPage } from "next";
import {
  AppShell,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { UserMediaContextProvider } from "../../context/UserMediaContext";
import { SelfVideo } from "../../components/Video/SelfVideo";
// import SideNav from "../../components/SideNav";
// import styles from "../../styles/Room.module.css";
// import video from 'public/demo.mp4'
import Call from '../../components/Call/Call'

const PreRoomCheck = ({
  changeRoomState,
}: {
  changeRoomState: (roomState: RoomStageTypes) => void;
}) => (
  <Container size={"lg"}>
    <Group noWrap position="apart" align={"center"} style={{ height: "100vh" }}>
      <Box sx={{ minWidth: 300, width: 600 }}>
        <SelfVideo />
      </Box>
      <Stack sx={{ width: 400, alignItems: "center" }}>
        <Title order={3}>Configure before joining</Title>
        <Space h="xs" />
        <Text>There are no other users in the room</Text>
        <Space h="xl" />
        <Button onClick={() => changeRoomState("room")} fullWidth>
          Join Room
        </Button>
      </Stack>
    </Group>
  </Container>
);

type RoomStageTypes = "pre-check" | "room";

const Room: NextPage = () => {
  const [stage, setStage] = useState<RoomStageTypes>("pre-check");
  const router = useRouter();
  const { roomId } = router.query;

  const changeRoomState = (roomStage: RoomStageTypes) => {
    setStage(roomStage);
  };

  return (
    <UserMediaContextProvider>
      {stage === "pre-check" ? (
        <PreRoomCheck changeRoomState={changeRoomState} />
      ) : (
        <Call />
      )}
    </UserMediaContextProvider>
  );
};

export default Room;
