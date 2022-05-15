import React from "react";
import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const IconButton = ({ label, active, onClick, children }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="top" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.button, { [classes.active]: active })}
      >
        {children}
      </UnstyledButton>
    </Tooltip>
  );
};

const useStyles = createStyles((theme) => ({
  button: {
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
