import { useContext, useState, useEffect } from "react";
import { Choice } from "aneclibrary";

import SocketContext from "../../../../contexts/SocketContext";
import { useSocket, useRoomID } from "../../../../hooks";
import { StepVoteProps, UserSocket } from "../../../../types";

const useVote = (data: StepVoteProps["data"]) => {
  const { socket, gamer } = useContext(SocketContext);
  const { listen, emitSendVote, emitVoteEnded } = useSocket(socket);
  const roomID = useRoomID();
  const [vote, setVote] = useState<Choice<boolean> | undefined>(
    data && data.vote
      ? {
          label: data.vote === "true" ? "Oui" : "Non",
          value: data.vote,
        }
      : undefined
  );
  const [canEndVote, setCanEndVote] = useState<boolean>(data && data.allVoted);

  useEffect(() => {
    if (gamer && vote && data.username !== gamer.username) {
      emitSendVote(roomID, gamer.username, vote.value);
    }
  }, [vote, roomID, gamer, data.username, emitSendVote]);

  useEffect(() => {
    listen({
      onAllVoted: () => setCanEndVote(true),
    });
  }, [listen]);

  return {
    gamer: gamer as UserSocket,
    vote,
    canEndVote,
    roomID,
    setVote,
    emitVoteEnded,
  };
};

export default useVote;
