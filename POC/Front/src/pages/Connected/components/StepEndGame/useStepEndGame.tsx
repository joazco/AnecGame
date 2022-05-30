import { useContext, useState } from "react";
import SocketContext from "../../../../contexts/SocketContext";
import { useRoomID, useSocket } from "../../../../hooks";

const useStepEndGame = () => {
  const {
    socket,
    gamer,
    roomInfo: { admin },
  } = useContext(SocketContext);
  const { emitStartGame, emitEndParty } = useSocket(socket);
  const [openModalPaypal, setOpenModalPaypal] = useState<boolean>(false);
  const roomID = useRoomID();

  return {
    gamer,
    admin,
    roomID,
    openModalPaypal,
    emitStartGame,
    emitEndParty,
    setOpenModalPaypal,
  };
};

export default useStepEndGame;
