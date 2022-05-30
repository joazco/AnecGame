import { useState, useContext, useEffect, useCallback } from "react";
import { Choice } from "aneclibrary";
import toast from "react-hot-toast";

import SocketContext from "../../../../contexts/SocketContext";
import { useSocket, useRoomID } from "../../../../hooks";
import { Anecdote } from "../../../../types";

const useStepGameStarted = () => {
  const { socket } = useContext(SocketContext);
  const roomID = useRoomID();
  const { listen, emitAppendAnecdote } = useSocket(socket);
  const [anecdote, setAnecdote] = useState<Anecdote>({
    value: "",
    truthly: "true",
  });
  const [anecdoteValidated, setAnecdoteValidated] = useState<boolean>(false);
  const [showButtonValidate, setShowButtonValidate] = useState<boolean>(false);

  const onAnecdoteValidated = useCallback(() => {
    setAnecdoteValidated(true);
    toast.success("Votre anecdote a été enregistré");
  }, []);
  const onChangeSwitchButton = useCallback((choice: Choice<boolean>) => {
    const { value } = choice;
    setAnecdote((a) => {
      return { ...a, truthly: value };
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (showButtonValidate) {
      emitAppendAnecdote(roomID, anecdote);
    }
  };

  useEffect(() => {
    listen({
      onAnecdoteValidated,
    });
  }, [listen, onAnecdoteValidated]);

  return {
    anecdote,
    anecdoteValidated,
    showButtonValidate,
    setAnecdote,
    onChangeSwitchButton,
    setShowButtonValidate,
    handleSubmit,
  };
};

export default useStepGameStarted;
