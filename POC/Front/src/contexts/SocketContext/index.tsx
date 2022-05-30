import { createContext } from "react";
import { RoomInfo, UserSocket } from "../../types";

const SocketContext = createContext<{
  socket: any;
  roomInfo: RoomInfo;
  gamer: UserSocket | null;
}>({
  socket: null,
  roomInfo: {
    id: "",
    title: "",
    themes: [],
    admin: "",
  },
  gamer: null,
});

export default SocketContext;
