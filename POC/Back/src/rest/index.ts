import http from "http";
import { DataRequest, Room } from "../types";
import { findUserByUsername, generateRoomId } from "../utils/roomFunctions";

declare const global: any;

const Rest = () => {
  const request = (data: DataRequest, response: http.ServerResponse) => {
    const { function: functionType, args } = data;
    const { gameName, pseudo, themes, room: roomID } = args;

    switch (functionType) {
      case "createGame":
        const room: Room = {
          id: generateRoomId(),
          users: [
            {
              userID: "",
              username: pseudo,
              score: 0,
              avatar: "administrator",
              connected: false,
            },
          ],
          admin: pseudo,
          title: gameName,
          autoConnect: true,
          themes,
        };
        global.rooms.push(room);
        response.end(room.id);
        break;
      case "autoConnect":
        const findRoomAutoConnect: Room | undefined = global.rooms.find(
          (r: Room) => r.id == roomID
        );
        console.log(findRoomAutoConnect);
        if (!findRoomAutoConnect || !findRoomAutoConnect.autoConnect) {
          throw new Error("room not found");
        }
        response.end(
          JSON.stringify({
            ...findRoomAutoConnect.users[0],
          })
        );
        findRoomAutoConnect.autoConnect = false;
        break;
      case "getPseudo":
        const findRoomGetPseudo: Room | undefined = global.rooms.find(
          (r: Room) => r.id == roomID
        );
        if (!findRoomGetPseudo) {
          throw new Error("room not found");
        }
        const findUser = findUserByUsername(findRoomGetPseudo, pseudo);
        if (findUser) {
          response.end(JSON.stringify({ userFind: "ko" }));
        } else {
          response.end(JSON.stringify({ userFind: "ok" }));
        }
        break;
      case "getRoomInfo":
        const findRoomGetRoomInfo: Room | undefined = global.rooms.find(
          (r: Room) => r.id == roomID
        );
        if (!findRoomGetRoomInfo) {
          throw new Error("room not found");
        }
        const { id, title, themes: roomThemes, admin } = findRoomGetRoomInfo;
        response.end(
          JSON.stringify({
            id,
            title,
            themes: roomThemes,
            admin,
          })
        );

        break;
      default:
        response.end(JSON.stringify({ error: "function not found" }));
    }
  };
  return { request };
};

export default Rest;
