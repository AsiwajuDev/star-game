import React from "react";
import "./StarCard.css";

const PlayAgain = props => (
  <div className="game-done">
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

export default PlayAgain;
