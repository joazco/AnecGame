import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import SocketContext from "../../../../contexts/SocketContext";

const useStepZero = () => {
  const {
    roomInfo: { themes, admin },
    gamer,
  } = useContext(SocketContext);

  const [showThemeList, setShowThemeList] = useState<boolean>(false);
  const [showButtonStartGame, setShowButtonStartGame] =
    useState<boolean>(false);

  const shareParty = () => {
    const curentUrl = window.location.href;
    if (typeof navigator.share !== "undefined") {
      window.navigator.share({
        title: "AnecGame",
        text: "Rejoin ma partie de AnecGame :)",
        url: curentUrl,
      });
    } else {
      navigator.clipboard.writeText(curentUrl).finally(() => {
        toast.success(
          "Le lien de la partie a bien été copié dans votre presse papier"
        );
      });
    }
  };

  useEffect(() => {
    setTimeout(() => setShowThemeList(true), 1000);
    setTimeout(() => {
      if (gamer && gamer.username === admin) {
        setShowButtonStartGame(true);
      }
    }, 2000);
  }, [gamer, admin]);

  return {
    showThemeList,
    themes,
    showButtonStartGame,
    shareParty,
  };
};

export default useStepZero;
