import React from "react";
import { LabelInfo, Avatar } from "aneclibrary";

import { StepSpeachProps } from "../../../../types";
import {
  StepResumeVotesContainer,
  ListWinnersContent,
  AvatarWins,
  CurrentUserHadWinToContainer,
} from "../../styles";

const StepResumeVotes = ({ data }: StepSpeachProps) => {
  const { winners, truthly, currentUserHadWinTo } = data;
  return (
    <StepResumeVotesContainer>
      <LabelInfo animate>
        L'anecdote était <i>{truthly === "true" ? "vraie" : "fausse"}</i> les
        gagnants sont:
      </LabelInfo>
      <ListWinnersContent>
        {winners.length === 0 ? (
          <p>Aucun gagnant</p>
        ) : (
          winners.map((winner) => (
            <AvatarWins className="animate__animated animate__flipInX">
              <div>
                <Avatar type={winner.avatar} preset="default" />
              </div>

              <div>{winner.username}</div>
            </AvatarWins>
          ))
        )}
      </ListWinnersContent>
      {currentUserHadWinTo && (
        <CurrentUserHadWinToContainer>
          <LabelInfo animate>
            Puisque {currentUserHadWinTo.username} a réussi à vous convaincre,
            le joueur gagne des points
          </LabelInfo>
          <ListWinnersContent>
            <div className="animate__animated animate__flipInX">
              <div>
                <Avatar type={currentUserHadWinTo.avatar} preset="default" />
              </div>

              <div>{currentUserHadWinTo.username}</div>
            </div>
          </ListWinnersContent>
        </CurrentUserHadWinToContainer>
      )}
    </StepResumeVotesContainer>
  );
};

export default StepResumeVotes;
