import React from "react";
import { LabelInfo, Avatar } from "aneclibrary";
import { AvatarList } from "../../styles";
import { useConfig } from "../../../../hooks";

type PseudoComponentProps = {
  onClickAvatar: (avatar: string) => void;
};

const listAvatar: string[] = [
  "hacker",
  "woman",
  "man",
  "kitty",
  "cat",
  "rainbowFlag",
  "lgbtIcon",
  "dinosaur",
];

const AvatarComponent = ({ onClickAvatar }: PseudoComponentProps) => {
  const { homeUrl } = useConfig();
  return (
    <>
      <LabelInfo animate like="subtitle">
        Veuillez choisir votre avatar
      </LabelInfo>
      <LabelInfo animate like="subtitle">
        <a href={`${homeUrl}#credits`} target="_blank" rel="noreferrer">
          (Les images ont été créé par de fabuleux designers, cliquez ici pour
          aller voir leurs travailles)
        </a>
      </LabelInfo>
      <AvatarList>
        {listAvatar.map((type) => (
          <Avatar
            key={type}
            type={type}
            preset="card"
            onClick={onClickAvatar}
            animate
          />
        ))}
      </AvatarList>
    </>
  );
};

export default AvatarComponent;
