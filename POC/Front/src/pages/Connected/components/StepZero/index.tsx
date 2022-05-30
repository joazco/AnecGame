import React from "react";
import { LabelInfo, ThemeList, ButtonGame } from "aneclibrary";

import { StepZeroContainer } from "../../styles";
import useStepZero from "./useStepZero";

const StepZero = ({ emitStartGame }: { emitStartGame: () => void }) => {
  const { showThemeList, themes, showButtonStartGame, shareParty } =
    useStepZero();

  return (
    <StepZeroContainer>
      <div>
        <LabelInfo animate>
          La partie doit être lancée par l'administrateur
        </LabelInfo>
        <LabelInfo animate like="subtitle">
          Liste des sujets à respecter :
        </LabelInfo>
        {showThemeList ? (
          themes.length > 0 ? (
            <ThemeList themes={themes} />
          ) : (
            <ThemeList themes={["Partie libre aucun thème"]} />
          )
        ) : (
          <></>
        )}
      </div>
      <div>
        {showButtonStartGame && (
          <ButtonGame
            preset="success"
            icon="sports_esports"
            animate
            onClick={emitStartGame}
          >
            Démarrer la partie
          </ButtonGame>
        )}
        <ButtonGame preset="blue" icon="share" animate onClick={shareParty}>
          Partager la partie
        </ButtonGame>
      </div>
    </StepZeroContainer>
  );
};

export default StepZero;
