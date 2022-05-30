import { useCallback } from "react";
import { Socket } from "socket.io-client";

import { UseSocketProps, Anecdote, RequestType } from "../../types";

const useSocket = (socket: Socket) => {
  const listen = useCallback(
    (events: UseSocketProps) => {
      const {
        onJoinRoomDone,
        onUpdateUsers,
        onAnecdoteValidated,
        onGameStarted,
        onWaitPlayers,
        onSpeach,
        onVote,
        onAllVoted,
        onResumeVotes,
        onEndGame,
        onShowScoring,
      } = events;

      onJoinRoomDone && socket.on("join room done", onJoinRoomDone);
      onUpdateUsers && socket.on("update users", onUpdateUsers);
      onGameStarted && socket.on("game started", onGameStarted);
      onWaitPlayers && socket.on("wait players", onWaitPlayers);
      onAnecdoteValidated &&
        socket.on("anecdote validate", onAnecdoteValidated);
      onSpeach && socket.on("speach", onSpeach);
      onVote && socket.on("vote", onVote);
      onAllVoted && socket.on("all voted", onAllVoted);
      onResumeVotes && socket.on("resume votes", onResumeVotes);
      onEndGame && socket.on("end game", onEndGame);
      onShowScoring && socket.on("show scoring", onShowScoring);
    },
    [socket]
  );
  const emitJoinRoom = useCallback(
    (room: string) => {
      socket.emit("join room", { room });
    },
    [socket]
  );
  const emitAppendAnecdote = useCallback(
    (room: string, anecdote: Anecdote) =>
      socket.emit("append anecdote", { room, anecdote }),
    [socket]
  );

  const emitSpeachDone = useCallback(
    (room: string, request: RequestType) => {
      const { username, ...rest } = request;
      socket.emit("speach done", {
        room,
        username,
        ...rest,
      });
    },
    [socket]
  );

  const emitSendVote = (room: string, gamer: string, vote: boolean) =>
    socket.emit("send vote", {
      room,
      gamer,
      vote,
    });

  const emitVoteEnded = (room: string, username: string, gamer: string) =>
    socket.emit("vote ended", {
      room,
      username,
      gamer,
    });

  const emitEndParty = (room: string) => socket.emit("end party", { room });

  const emitStartGame = (room: string) => socket.emit("start game", { room });

  return {
    listen,
    emitStartGame,
    emitJoinRoom,
    emitAppendAnecdote,
    emitSpeachDone,
    emitSendVote,
    emitVoteEnded,
    emitEndParty,
  };
};

export default useSocket;
