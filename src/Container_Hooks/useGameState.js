import { useState, useEffect } from "react";
import utils from "../Component/StarCardUtil";

const useGameState = () => {
  //Set State Logic
  const [stars, setStars] = useState(utils.random(1, 9));
  //UI Logic
  const [availableNum, setAvailableNum] = useState(utils.range(1, 9));
  const [candidateNum, setCandidateNum] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  //SetTimeout
  useEffect(() => {
    if (secondsLeft > 0 && availableNum.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = newCandidateNums => {
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

  return { stars, availableNum, candidateNum, secondsLeft, setGameState };
};

export default useGameState;
