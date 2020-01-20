import React from "react";
import utils from "./StarCardUtil";

const starDisplay = props => (
  <>
    {utils.range(1, props.count).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);

export default starDisplay;
