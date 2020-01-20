import React from "react";

//Components
import utils from "./StarCardUtil";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";
import useGameState from "../Container_Hooks/useGameState";

import "./StarCard.css";

const StarCard = props => {
  const {
    stars,
    availableNum,
    candidateNum,
    secondsLeft,
    setGameState
  } = useGameState();

  //Conditions
  const candidateAreWrong = utils.sum(candidateNum) > stars;
  const gameStatus =
    availableNum.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = number => {
    if (!availableNum.includes(number)) {
      return "used";
    }
    if (candidateNum.includes(number)) {
      return candidateAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    //New candidate Num
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNum.concat(number)
        : candidateNum.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft} </div>
    </div>
  );
};

export default StarCard;
