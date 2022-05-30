import { useMemo } from "react";
import { io } from "socket.io-client";

const ENDPOINT =
  process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:4000";

export const socket = io(ENDPOINT, { autoConnect: false });
export const env = process.env.NODE_ENV;

const useConfig = () => {
  const homeUrl = useMemo(
    () => process.env.REACT_APP_HOME_URL || "http://localhost?env=dev",
    []
  );
  const serverUrl = ENDPOINT;

  return {
    homeUrl,
    serverUrl,
  };
};

export default useConfig;
