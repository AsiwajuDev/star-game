import React, { useState } from "react";

//Components
import utils from "./StarCardUtil";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";

import "./StarCard.css";

const StarCard = () => {
  //Set State Logic
  const [stars, setStars] = useState(utils.random(1, 9));
  //UI Logic
  const [availableNum, setAvailableNum] = useState(utils.range(1, 9));
  const [candidateNum, setCandidateNum] = useState([]);

  //Conditions
  const candidateAreWrong = utils.sum(candidateNum) > stars;
  const gameIsDone = availableNum.length === 0;

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNum(utils.range(1, 9));
    setCandidateNum([]);
  };

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
    if (currentStatus === "used") {
      return;
    }
    //New candidate Num
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNum.concat(number)
        : candidateNum.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNum(newCandidateNums);
    } else {
      const newAvailableNums = availableNum.filter(
        n => !newCandidateNums.includes(n)
      );
      //redraw stars(from available)
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNum(newAvailableNums);
      setCandidateNum([]);
    }
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsDone ? (
            <PlayAgain onClick={resetGame} />
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default StarCard;
