import React, { useContext } from "react";
import { LabelInfo, ButtonGame } from "aneclibrary";

import SocketContext from "../../../../contexts/SocketContext";
import { useSocket, useRoomID } from "../../../../hooks";
import { StepSpeachProps } from "../../../../types";
import { StepZeroContainer } from "../../styles";

const StepSpeach = ({ data }: StepSpeachProps) => {
  const { socket, gamer } = useContext(SocketContext);
  const { emitSpeachDone } = useSocket(socket);
  const roomID = useRoomID();
  if (!gamer) {
    return <></>;
  }
  return (
    <StepZeroContainer>
      <div>
        <LabelInfo animate>
          {data.username} raconte nous ton anecdote et essaie de nous convaincre
          de sa véracité !!
        </LabelInfo>
        <br />
        <LabelInfo animate like="subtitle">
          <i className="material-icons">format_quote</i>&nbsp;&nbsp;
          {data.anecdote}&nbsp;&nbsp;
          <i className="material-icons">format_quote</i>
        </LabelInfo>
      </div>
      <div>
        {data.username === gamer.username && (
          <ButtonGame
            onClick={() => emitSpeachDone(roomID, data)}
            animate
            fluid
            icon="how_to_vote"
            preset="orange"
          >
            Passer au vote
          </ButtonGame>
        )}
      </div>
    </StepZeroContainer>
  );
};

export default StepSpeach;
