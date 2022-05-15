import React, { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";

const Testing = () => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient({
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connection-success", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    if (socket) return () => socket.disconnect();
  }, [])


  return <div>{JSON.stringify(connected)}</div>

}

export default Testing