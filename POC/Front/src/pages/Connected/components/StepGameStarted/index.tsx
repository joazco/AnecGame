import React from "react";
import { LabelInfo, ButtonGame, InputGame, SwitchBtn } from "aneclibrary";

import { StepgameStartedProps } from "../../../../types";
import { ObjectifList, StepZeroContainer } from "../../styles";
import useStepGameStarted from "./useStepGameStarted";

import imgTarget from "./dart.png";

const StepGameStarted = (_: StepgameStartedProps) => {
  const {
    anecdote,
    anecdoteValidated,
    showButtonValidate,
    setAnecdote,
    onChangeSwitchButton,
    setShowButtonValidate,
    handleSubmit,
  } = useStepGameStarted();

  return (
    <StepZeroContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <LabelInfo animate>Donner un titre à votre anecdote</LabelInfo>
          <LabelInfo animate like="subtitle">
            Lors de votre tour, vous devrez la défendre !
          </LabelInfo>
        </div>
        <div>
          <InputGame
            animate
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const {
                target: { value },
              } = e;
              setAnecdote({ ...anecdote, value });
              if (value !== "") {
                setShowButtonValidate(true);
              } else {
                setShowButtonValidate(false);
              }
            }}
          />
          <div className="animate__animated animate__backInUp">
            <p>Cette anecdote est ...</p>
            <SwitchBtn
              onChange={onChangeSwitchButton}
              value={anecdote.truthly}
              button1={{
                label: "Vraie",
                value: "true",
                icon: "emoji_emotions",
              }}
              button2={{ label: "Fausse", value: "false", icon: "mood_bad" }}
              disabled={anecdoteValidated}
            />
          </div>
          <br />
        </div>
      </form>
      <ObjectifList className="animate__animated animate__backInUp">
        <p>
          <img src={imgTarget} alt="dart icon" />
          Objectifs:
        </p>
        {anecdote.truthly === "true" && (
          <ul>
            <li>
              Convaincre l'ensemble des joueurs que votre anecdote est vraie
            </li>
            <li>
              Si l'ensemble des joueurs est convaincu, comme eux vous gagnez
              aussi 1 point
            </li>
          </ul>
        )}
        {anecdote.truthly === "false" && (
          <ul>
            <li>
              Convaincre l'ensemble des joueurs que votre anecdote est vraie
            </li>
            <li>
              Si la moitié des joueurs est convaincue, vous gagnez 1 point
            </li>
            <li>
              Si l'ensemble des joueurs est convaincu, vous gagnez 2 points
            </li>
          </ul>
        )}
      </ObjectifList>
      <div>
        {showButtonValidate && (
          <ButtonGame
            preset="blue"
            icon="done"
            disabled={anecdoteValidated}
            type="button"
            animate
            onClick={handleSubmit}
          >
            Valider
          </ButtonGame>
        )}
      </div>
    </StepZeroContainer>
  );
};

export default StepGameStarted;
