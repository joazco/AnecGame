import React from "react";
import { LabelInfo } from "aneclibrary";

import useSignIn from "./useSignIn";
import { AvatarComponent, PseudoComponent } from "./components";
import { SignInProps } from "../../types";
import { SignInContainer } from "./styles";

const SignIn = ({ onConnection }: SignInProps) => {
  const { avatar, setAvatar } = useSignIn();

  return (
    <SignInContainer className="container">
      <LabelInfo>Bienvenue dans le jeu Anec</LabelInfo>
      {avatar ? (
        <PseudoComponent
          onConnection={(pseudo) => onConnection(pseudo, avatar)}
        />
      ) : (
        <AvatarComponent onClickAvatar={setAvatar} />
      )}
    </SignInContainer>
  );
};

export default SignIn;
