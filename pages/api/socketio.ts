import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const socketIO = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    io.on("connection", (socket) => {
      console.log(socket.id);

      socket.emit("connection-success", {
        status: "connection-sucess",
        socketId: socket.id,
      });

      socket.on("sdp", (data) => {
        console.log(data);
        socket.broadcast.emit("sdp", data);
      });

      socket.on("candidate", (data) => {
        console.log(data);
        socket.broadcast.emit("candidate", data);
      });

      socket.on("disconnect", () => {
        console.log(`${socket.id} has disconnected`);
      });
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};

export default socketIO;
