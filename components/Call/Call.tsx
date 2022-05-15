import { AppShell } from '@mantine/core';
import React, { forwardRef, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from "../../styles/Room.module.css";
import SideNav from '../SideNav';

const Conference = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => (
    <div className={styles.Conference} ref={ref}>
      {children}
    </div>
  )
);

Conference.displayName = "Conference";

const Camera = ({
  width,
  height,
  margin,
}: {
  width: number;
  height: number;
  margin: number;
}) => (
  <div
    className={styles.Camera}
    style={{
      width: width,
      height: height,
      margin: margin,
    }}
  >
    <video
      className={styles.Video}
      src="/demo.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
    />
  </div>
);

const Call = () => {
  const [cameras, setCameras] = useState(4);
  const [_width, setWidth] = useState(0);
  const [_height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const _ratio = 0.5625;
  const _margin = 10;

  function area(
    Increment: number,
    Count: number,
    Width: number,
    Height: number,
    Margin = 10
  ) {
    let i = 0;
    let w = 0;
    let h = Increment * 0.75 + Margin * 2;
    while (i < Count) {
      if (w + Increment > Width) {
        w = 0;
        h = h + Increment * 0.75 + Margin * 2;
      }
      w = w + Increment + Margin * 2;
      i++;
    }
    if (h > Height || Increment > Width) return false;
    else return Increment;
  }

  useLayoutEffect(() => {
    function handleResize() {
      resize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    resize();
  }, []);

  useEffect(() => {
    console.log("width", _width, "height", _height);
  }, [_width, _height]);

  const resize = () => {
    let width = ref.current?.offsetWidth
      ? ref.current.offsetWidth - _margin * 2
      : 0;
    let height = ref.current?.offsetHeight
      ? ref.current.offsetHeight - _margin * 2
      : 0;
    let max = 0;

    let i = 1;
    while (i < 3000) {
      let w = area(i, cameras, width, height, _margin);
      if (w === false) {
        max = i - 1;
        break;
      }
      i++;
    }

    max = max - _margin * 2;
    setWidth(max);
    setHeight(max * _ratio);
  };

  const children = new Array(cameras)
    .fill(null)
    .map((num, index) => (
      <Camera key={index} width={_width} height={_height} margin={_margin} />
    ));

  return (
    <AppShell padding="md" navbar={<SideNav />}>
      <Conference ref={ref}>
        {children}
      </Conference>
    </AppShell>
  );
};

export default Call;
