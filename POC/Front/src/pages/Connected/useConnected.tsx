import { useEffect, useContext, useReducer } from "react";
import toast from "react-hot-toast";

import { useRoomID, useSocket } from "../../hooks";
import {
  RequestType,
  StateConnectedReducer,
  ActionConnectedReducer,
  ConnectedProps,
} from "../../types";
import SocketContext from "../../contexts/SocketContext";

const reducerConnected = (
  state: StateConnectedReducer,
  action: ActionConnectedReducer
) => {
  const { type: step, value: data } = action;
  switch (step) {
    case "gameStarted":
    case "showScoring":
    case "endGame":
    case "resumeVotes":
    case "vote":
    case "speach":
      return { step, data };
    default:
      return state;
  }
};

const useConnected = ({ save }: ConnectedProps) => {
  const defaultStep = save?.event || null;
  const [state, dispatch] = useReducer(reducerConnected, {
    step: defaultStep,
    data: save?.data,
  });
  const { socket } = useContext(SocketContext);
  const roomID = useRoomID();
  const { listen, emitStartGame: emitStartGameSocket } = useSocket(socket);

  const { step, data } = state;

  useEffect(() => {
    listen({
      onGameStarted: () => dispatch({ type: "gameStarted" }),
      onWaitPlayers: () =>
        toast.error("Minimum deux joueurs pour lancer la partie"),
      onSpeach: (request: RequestType) => {
        dispatch({
          type: "speach",
          value: request,
        });
      },
      onVote: (request: RequestType) =>
        dispatch({ type: "vote", value: request }),
      onResumeVotes: (request: RequestType) =>
        dispatch({ type: "resumeVotes", value: request }),
      onEndGame: (_: RequestType) => dispatch({ type: "endGame" }),
      onShowScoring: (request: RequestType) =>
        dispatch({ type: "showScoring", value: request }),
    });
  }, [socket, listen]);

  const emitStartGame = () => emitStartGameSocket(roomID);

  return {
    step,
    data,
    roomID,
    emitStartGame,
  };
};

export default useConnected;
