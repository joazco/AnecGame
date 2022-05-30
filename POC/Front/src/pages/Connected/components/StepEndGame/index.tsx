import React from "react";
import { ButtonGame, LabelInfo, Modal } from "aneclibrary";

import useStepEndGame from "./useStepEndGame";
import { StepZeroContainer } from "../../styles";

const StepEndGame = () => {
  const {
    gamer,
    admin,
    roomID,
    openModalPaypal,
    emitStartGame,
    emitEndParty,
    setOpenModalPaypal,
  } = useStepEndGame();

  return (
    <StepZeroContainer>
      <div>
        <LabelInfo>La manche est finie !</LabelInfo>
        <LabelInfo animate like="subtitle">
          Voulez-vous en refaire une ou finir la partie ?
        </LabelInfo>
      </div>
      <div>
        {admin === gamer?.username && (
          <div>
            <ButtonGame
              preset="violet"
              animate
              fluid
              icon="sports_esports"
              onClick={() => emitStartGame(roomID)}
            >
              Refaire une partie
            </ButtonGame>
            <br />
            <br />
            <ButtonGame
              animate
              preset="blue"
              icon="list_alt"
              fluid
              onClick={() => emitEndParty(roomID)}
            >
              Afficher les résultats
            </ButtonGame>
          </div>
        )}
        <br />
        <br />
        <ButtonGame
          animate
          preset="paypal"
          icon="paypal"
          fluid
          onClick={() => setOpenModalPaypal(true)}
        >
          Participez au maintien du jeu
        </ButtonGame>
      </div>
      {openModalPaypal && (
        <Modal
          headerTxt="Faire un don"
          onClose={() => setOpenModalPaypal(false)}
        >
          <p>
            Aidez à financer le développement et l'hébergement de ce projet via
            Paypal. Il est supporté par un unique développeur,
            <a
              href="https://www.paypal.com/donate?hosted_button_id=X35C3WWYP3WYC"
              target="_blank"
              rel="noreferrer"
            >
              lien Paypal.
            </a>
          </p>
        </Modal>
      )}
    </StepZeroContainer>
  );
};

export default StepEndGame;
