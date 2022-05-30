import React from "react";
import { LabelInfo, ButtonGame, SwitchBtn, Choice } from "aneclibrary";

import { StepVoteProps } from "../../../../types";
import { StepZeroContainer } from "../../styles";
import useVote from "./useVote";

const StepVote = ({ data }: StepVoteProps) => {
  const { gamer, vote, canEndVote, roomID, setVote, emitVoteEnded } =
    useVote(data);

  return (
    <StepZeroContainer>
      <div>
        <LabelInfo like="subtitle" animate>
          {data.username} vous vraiiiimeeeent convaincus?
        </LabelInfo>
        {data.username !== gamer.username && (
          <div className="animate__animated animate__backInUp">
            <SwitchBtn
              value={vote?.value}
              onChange={(choice: Choice<boolean>) => setVote(choice)}
              button1={{ label: "Oui", value: "true" }}
              button2={{ label: "Non", value: "false" }}
            />
          </div>
        )}
      </div>
      <div>
        {data.username === gamer.username && canEndVote && (
          <ButtonGame
            preset="pink"
            animate
            fluid
            icon="refresh"
            onClick={() => emitVoteEnded(roomID, data.username, gamer.username)}
          >
            Fin des votes
          </ButtonGame>
        )}
      </div>
    </StepZeroContainer>
  );
};

export default StepVote;
