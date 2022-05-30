import { useCallback } from "react";
import { ResponseRest, Gamer } from "../../types";
import useRoomID from "../useRoomID";
import useConfig from "../useConfig";

const useRest = () => {
  const roomID = useRoomID();
  const { serverUrl, homeUrl } = useConfig();

  const getPseudo = useCallback(
    (pseudo: string): Promise<ResponseRest> =>
      new Promise((resolve, reject) => {
        fetch(serverUrl, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            function: "getPseudo",
            args: { room: roomID, pseudo: pseudo.trim() },
          }),
        }).then((data) =>
          data.json().then((content: ResponseRest) => resolve(content))
        );
      }),
    [roomID, serverUrl]
  );

  const autoConnect = useCallback(
    (): Promise<Gamer> =>
      new Promise((resolve, reject) =>
        fetch(serverUrl, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            function: "autoConnect",
            args: { room: roomID },
          }),
        })
          .then((data) =>
            data.json().then((content: Gamer) => resolve(content))
          )
          .catch(reject)
      ),
    [roomID, serverUrl]
  );

  const getRoomInfo = useCallback(
    (): Promise<ResponseRest> =>
      new Promise((resolve, reject) => {
        fetch(serverUrl, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            function: "getRoomInfo",
            args: { room: roomID },
          }),
        })
          .then((data) =>
            data.json().then((content: ResponseRest) => {
              resolve(content);
            })
          )
          .catch(() => {
            window.location.href = homeUrl;
          });
      }),
    [roomID, serverUrl, homeUrl]
  );

  return {
    autoConnect,
    getPseudo,
    getRoomInfo,
  };
};

export default useRest;
