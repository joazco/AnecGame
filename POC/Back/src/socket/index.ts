import { Server } from "socket.io";
// import { connectDatabase } from "../database";
import {
  ISocket,
  User,
  Response,
  AvatarType,
  Room,
  EventsEmit,
} from "../types";
import {
  createRoom,
  findRoom,
  findUser,
  findUserByUsername,
  removeRoom,
  saveGame,
} from "../utils/roomFunctions";

const SocketModule = () => {
  let _io: Server;

  const ioEmit = (room: Room, event: EventsEmit, data?: any) => {
    saveGame(room, event, data);
    _io.to(room.id).emit(event, data);
  };
  const socketEmit = (
    room: Room,
    socket: ISocket,
    event: EventsEmit,
    data?: any
  ) => {
    saveGame(room, event, data);
    socket.emit(event, data);
  };

  const initUser = (socket: ISocket) => {
    /** init user */
    const [username, roomID, avatar] = socket.username.split("-");
    let roomFind = findRoom(roomID);
    if (!roomFind) {
      roomFind = createRoom(roomID);
    }
    const currUserFind = findUser(roomFind, socket.id);
    if (currUserFind) {
      currUserFind.userID = socket.id;
    }
    const user: User = currUserFind
      ? currUserFind
      : {
          userID: socket.id,
          username,
          score: 0,
          avatar: avatar as AvatarType,
          connected: true,
        };

    return { user, roomID };
  };

  const joinRoom = (socket: ISocket, user: User, room: string) => {
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const { users, save } = roomFind;

    socket.join(room);
    socketEmit(roomFind, socket, "join room done", { user, save });

    const gamer = findUserByUsername(roomFind, user.username);

    if (!gamer) {
      user.connected = true;
      users.push(user);
    } else {
      gamer.connected = true;
      gamer.userID = user.userID;
    }

    console.log(roomFind);

    ioEmit(roomFind, "update users", users);
  };

  const startGame = ({ room }: Response) => {
    const roomFind = findRoom(room);
    if (!roomFind) return;
    if (roomFind.users.length < 2) {
      ioEmit(roomFind, "wait players");
      return;
    }
    roomFind.users.forEach((user) => {
      user.anecdote = undefined;
      user.vote = undefined;
      user.passed = undefined;
    });
    ioEmit(roomFind, "game started");
  };

  const appendAnecdote = (socket: ISocket, user: User, response: Response) => {
    const { room, anecdote } = response;
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const { users } = roomFind;
    const gamer = findUserByUsername(roomFind, user.username);
    if (gamer) {
      gamer.anecdote = anecdote;
      socketEmit(roomFind, socket, "anecdote validate");
      const allAnecdoteValidated = users.filter(
        (u) => typeof u.anecdote === "undefined"
      );
      if (allAnecdoteValidated.length === 0) {
        ioEmit(roomFind, "speach", {
          userID: gamer.userID,
          username: gamer.username,
          anecdote: gamer.anecdote.value,
        });
      }
    }
  };

  const speachDone = (response: Response) => {
    const { room, username } = response;
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const gamer = findUserByUsername(roomFind, username);
    if (gamer) {
      gamer.passed = true;
    }
    ioEmit(roomFind, "vote", response);
  };

  const sendVote = (response: Response) => {
    const { room, vote, gamer: gamerName } = response;
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const { users } = roomFind;
    const gamer = findUserByUsername(roomFind, gamerName);
    if (!gamer) return;
    gamer.vote = vote;
    ioEmit(roomFind, "update users", users);
    if (roomFind.save && roomFind.save.data) {
      roomFind.save.data.vote = vote;
    }
    saveGame(roomFind, "vote", roomFind.save?.data);
    const gamerVoted = users.filter((u) => typeof u.vote === "undefined");
    if (gamerVoted.length === 1) {
      if (roomFind.save && roomFind.save.data) {
        roomFind.save.data.allVoted = true;
      }
      saveGame(roomFind, "vote", roomFind.save?.data);
      ioEmit(roomFind, "all voted");
    }
  };

  const resumeVotes = (response: Response) => {
    const { room, username } = response;
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const { users } = roomFind;
    const user = findUserByUsername(roomFind, username);

    if (!user || !user.anecdote) return;
    const {
      anecdote: { truthly },
    } = user;
    const winners: { username: string; avatar: string }[] = [];
    users.forEach((u) => {
      if (u.username !== username && u.vote === truthly) {
        u.score += 1;
        winners.push({ username: u.username, avatar: u.avatar });
      }
      u.vote = undefined;
    });
    let currentUserHadWinTo = null;
    if (truthly === "true" && winners.length === users.length - 1) {
      user.score += 1;
      currentUserHadWinTo = { username: user.username, avatar: user.avatar };
    } else if (truthly === "false" && winners.length === 0) {
      user.score += 2;
      currentUserHadWinTo = { username: user.username, avatar: user.avatar };
    } else if (
      truthly === "false" &&
      winners.length <= (users.length - 1) / 2
    ) {
      user.score += 1;
      currentUserHadWinTo = { username: user.username, avatar: user.avatar };
    }
    ioEmit(roomFind, "update users", users);
    ioEmit(roomFind, "resume votes", {
      winners,
      truthly,
      currentUserHadWinTo,
    });
    setTimeout(() => {
      const gamerUnPassed = users.filter((u) => !u.passed);

      if (gamerUnPassed.length === 0) {
        ioEmit(roomFind, "end game");
      } else {
        const nextGamer = gamerUnPassed[0];
        ioEmit(roomFind, "speach", {
          userID: nextGamer.userID,
          username: nextGamer.username,
          anecdote: nextGamer.anecdote?.value,
        });
      }
    }, 10000);
  };

  const endParty = (response: Response) => {
    const { room } = response;
    const roomFind = findRoom(room);
    if (!roomFind) return;
    const { users } = roomFind;
    removeRoom(room);
    ioEmit(roomFind, "show scoring", { users });
  };

  const disconnect = (roomID: string, userID: string) => {
    const roomFind = findRoom(roomID);
    if (!roomFind) return;
    const user = findUser(roomFind, userID);
    if (user) {
      user.connected = false;
    }
    ioEmit(roomFind, "update users", roomFind.users);
  };

  const connection = (socket: ISocket) => {
    const { user, roomID } = initUser(socket);
    const roomFind = findRoom(roomID);
    if (!roomFind || !user) return;
    socket.on("join room", ({ room }: Response) =>
      joinRoom(socket, user, room)
    );
    socket.on("start game", startGame);
    socket.on("append anecdote", (response: Response) =>
      appendAnecdote(socket, user, response)
    );
    socket.on("speach done", speachDone);
    socket.on("send vote", sendVote);
    socket.on("vote ended", resumeVotes);
    socket.on("end party", endParty);
    socket.on("disconnect", () => disconnect(roomID, user.userID));
    joinRoom(socket, user, roomID);
  };

  const init = (io: Server) => {
    _io = io;
    io.use((socket: any, next) => {
      const username = socket.handshake.auth.username;
      if (!username) {
        return next(new Error("invalid username"));
      }
      socket.username = username;
      next();
    });
    io.on("connection", (socket: any) => connection(socket));
  };
  return { init };
};

export default SocketModule;
