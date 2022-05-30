import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";

import { useRoomID, useAutoConnect, useSocket, useRest } from "./hooks";
import { UserSocket, RoomStorage, RoomInfo, RequestType } from "./types";

const useApp = (socket: Socket) => {
  const { listen } = useSocket(socket);
  const { autoConnect: autoConnectUri, urlWithoutAutoConnect } =
    useAutoConnect();
  const roomID = useRoomID();
  const { getRoomInfo, autoConnect } = useRest();

  const [connected, setConnected] = useState(false);
  const [pseudo, setPseudo] = useState<string>("");
  const [currUser, setCurrUser] = useState<UserSocket | null>(null);
  const [loadingConnection, setLoadingConnection] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    id: "",
    title: "",
    themes: [],
    admin: "",
  });
  const [roomSave, setRoomSave] = useState<RequestType["save"] | undefined>();

  const connection = useCallback(
    (username: string, avatar: string) => {
      setLoadingConnection(true);
      socket.auth = { username: `${username}-${roomID}-${avatar}` };
      socket.connect();
      localStorage.setItem(
        `annec`,
        JSON.stringify({ lastRoomID: roomID, username })
      );
    },
    [roomID, socket]
  );

  const onJoinRoomDone = useCallback(({ user, save }: RequestType) => {
    setRoomSave(save);
    setCurrUser(user);
    setConnected(true);
    setLoadingConnection(false);
  }, []);

  useEffect(() => {
    if (autoConnectUri && roomID) {
      setLoadingConnection(true);
      autoConnect()
        .then(({ username, avatar }) => {
          localStorage.setItem(
            `annec`,
            JSON.stringify({ lastRoomID: roomID, username, avatar })
          );
          window.location.href = urlWithoutAutoConnect.href;
        })
        .catch(() => (window.location.href = urlWithoutAutoConnect.href));
    }
  }, [roomID, autoConnectUri, urlWithoutAutoConnect, autoConnect]);

  useEffect(() => {
    const existingRoom = localStorage.getItem("annec");
    if (existingRoom) {
      const existingRoomObject: RoomStorage = JSON.parse(existingRoom);
      setPseudo(existingRoomObject.username);
      if (existingRoomObject.lastRoomID === roomInfo.id) {
        connection(existingRoomObject.username, existingRoomObject.avatar);
      }
    }
  }, [roomInfo, socket, connection]);

  useEffect(
    () =>
      listen({
        onJoinRoomDone,
      }),
    [listen, onJoinRoomDone]
  );

  useEffect(() => {
    getRoomInfo().then((content) => setRoomInfo(content));
  }, [getRoomInfo]);

  return {
    loadingConnection,
    connected,
    currUser,
    pseudo,
    roomInfo,
    roomSave,
    setPseudo,
    connection,
  };
};

export default useApp;
