import React, { useContext } from "react";
import { Title } from "aneclibrary";

import SocketContext from "../../../../contexts/SocketContext";
import { TitleContainer } from "../../styles";

const TitleComponent = () => {
  const {
    roomInfo: { title },
  } = useContext(SocketContext);
  return (
    <TitleContainer className="">
      <div className="">
        <Title>Bienvenue dans la partie {title}</Title>
      </div>
    </TitleContainer>
  );
};

export default TitleComponent;
