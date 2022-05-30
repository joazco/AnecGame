import React from "react";

import { ConnectedProps } from "../../types";
import useConnected from "./useConnected";
import {
  StepZero,
  TitleComponent,
  UsersList,
  StepGameStarted,
  StepSpeach,
  StepVote,
  StepResumeVotes,
} from "./components";
import { ConnectedContainer, GameContainer } from "./styles";
import StepEndGame from "./components/StepEndGame";
import StepShowScoring from "./components/StepShowScoring";

const Connected = (props: ConnectedProps) => {
  const { step, data, emitStartGame } = useConnected(props);

  return (
    <ConnectedContainer>
      <TitleComponent />

      {step === "showScoring" && data && <StepShowScoring data={data} />}
      {step !== "showScoring" && (
        <>
          <GameContainer>
            <>
              {!step && <StepZero emitStartGame={emitStartGame} />}
              {step === "gameStarted" && <StepGameStarted />}
              {step === "speach" && data && <StepSpeach data={data} />}
              {step === "vote" && data && <StepVote data={data} />}
              {step === "resumeVotes" && data && (
                <StepResumeVotes data={data} />
              )}
              {step === "endGame" && <StepEndGame />}
            </>
          </GameContainer>
          <UsersList />
        </>
      )}
    </ConnectedContainer>
  );
};

export default Connected;
