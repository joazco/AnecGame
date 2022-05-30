import { useEffect, useReducer } from "react";

import { useRest } from "../../hooks";
import { StateSignInReducer, ActionSignInReducer } from "../../types";

let timer: NodeJS.Timeout | null = null;

const defaultState: StateSignInReducer = {
  avatar: null,
  pseudo: "",
  loading: false,
  stopKeyUp: false,
  canSendPseudo: false,
  showError: false,
};
const reducerSignIn = (
  state: StateSignInReducer,
  actionSignInReducer: ActionSignInReducer
): StateSignInReducer => {
  const { type, value } = actionSignInReducer;
  switch (type) {
    case "setAvatar":
      return { ...state, avatar: value };
    case "setPseudo":
      const setPseudoState: StateSignInReducer = {
        ...state,
        pseudo: value,
        canSendPseudo: false,
      };
      if (timer) {
        setPseudoState.stopKeyUp = false;
        setPseudoState.loading = false;
        setPseudoState.showError = false;
      }
      return setPseudoState;
    case "setStopKeyUp":
      return { ...state, stopKeyUp: value };
    case "setLoading":
      return { ...state, loading: value };
    case "getPseudoThen":
      const getPseudoThenState: StateSignInReducer = {
        ...state,
        loading: false,
      };
      if (value === "ok") {
        getPseudoThenState.canSendPseudo = true;
      } else {
        getPseudoThenState.canSendPseudo = false;
        getPseudoThenState.showError = true;
      }
      return getPseudoThenState;
    default:
      return state;
  }
};

const useSignIn = () => {
  const { getPseudo } = useRest();
  const [state, dispatch] = useReducer(reducerSignIn, defaultState);
  const { avatar, pseudo, loading, stopKeyUp, canSendPseudo, showError } =
    state;

  const setAvatar = (avatar: string) =>
    dispatch({
      type: "setAvatar",
      value: avatar,
    });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setPseudo",
      value: e.target.value,
    });

    timer = setTimeout(() => {
      dispatch({
        type: "setStopKeyUp",
        value: true,
      });
    }, 1000);
  };

  useEffect(() => {
    if (stopKeyUp && pseudo !== "") {
      dispatch({
        type: "setLoading",
        value: true,
      });
      setTimeout(() => {
        getPseudo(pseudo).then((data) => {
          const { userFind } = data;
          dispatch({
            type: "getPseudoThen",
            value: userFind,
          });
        });
      }, 500);
    }
  }, [stopKeyUp, pseudo, getPseudo]);

  return {
    avatar,
    pseudo,
    loading,
    canSendPseudo,
    showError,
    setAvatar,
    onChange,
  };
};

export default useSignIn;
