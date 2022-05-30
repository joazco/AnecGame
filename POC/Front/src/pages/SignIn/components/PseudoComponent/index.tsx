import React from "react";
import { LabelInfo, InputGame, ButtonGame } from "aneclibrary";

import useSignIn from "../../useSignIn";

type PseudoComponentProps = {
  onConnection: (pseudo: string) => void;
};
const PseudoComponent = ({ onConnection }: PseudoComponentProps) => {
  const { canSendPseudo, loading, pseudo, showError, onChange } = useSignIn();
  return (
    <>
      <LabelInfo animate like="subtitle">
        Veuillez insérer votre pseudo
      </LabelInfo>
      <InputGame
        id="pseudo"
        type="text"
        onChange={onChange}
        value={pseudo}
        animate
        loading={loading}
        autoComplete="off"
        helperText={showError && "Pseudo déjà existant."}
      />
      {canSendPseudo && (
        <ButtonGame
          preset="blue"
          icon="login"
          onClick={() => onConnection(pseudo.trim())}
          animate
          fluid
        >
          Connexion
        </ButtonGame>
      )}
    </>
  );
};

export default PseudoComponent;
