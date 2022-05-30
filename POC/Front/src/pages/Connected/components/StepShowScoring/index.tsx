import React, { useMemo, useEffect, useRef } from "react";
import Party from "party-js";
import { ShowScoringComponent, LabelInfo } from "aneclibrary";

import { StepShowScoringProps } from "../../../../types";
import { StepZeroContainer } from "../../styles";

const StepShowScoring = ({ data: { users } }: StepShowScoringProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const usersOrdered = useMemo(() => {
    return users
      .sort((a, b) => b.score - a.score)
      .map((user) => ({
        username: user.username,
        avatar: user.avatar,
        score: user.score,
      }));
  }, [users]);

  useEffect(() => {
    setTimeout(() => {
      console.log(contentRef);
      if (contentRef.current) {
        Party.confetti(contentRef.current, {
          count: 400,
          spread: 55,
          color: [
            Party.Color.fromHex("#8b5642"),
            Party.Color.fromHex("#6a696b"),
          ],
        });
      }
    }, 200);
  }, []);

  return (
    <div ref={contentRef}>
      <StepZeroContainer>
        <LabelInfo animate>Affichage des scores</LabelInfo>
        <ShowScoringComponent users={usersOrdered} />
      </StepZeroContainer>
    </div>
  );
};

export default StepShowScoring;
