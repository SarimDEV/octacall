import React, { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
} from "@mantine/core";
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
  Microphone,
  Camera,
  VideoMinus,
  Video,
  ScreenShare,
  ScreenShareOff,
  PhoneOff,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Microphone, label: "Mute" },
  { icon: Video, label: "Turn Off Video" },
  { icon: ScreenShare, label: "Screen Share" },
  { icon: User, label: "User" },
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={"100vh"} width={{ base: 80 }} p="md">
      {/* <Center>
        <MantineLogoSmall />
      </Center> */}
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={20}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          {/* <NavbarLink icon={SwitchHorizontal} label="Change account" /> */}
          <NavbarLink icon={PhoneOff} label="Leave Call" />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
