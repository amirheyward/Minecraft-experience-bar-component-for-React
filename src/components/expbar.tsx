import "./expbar.css";
import emptyBar from "../assets/xp_bar_empty.png";
import fullBar from "../assets/xp_bar_full.png";
import { useState } from "react";

interface EXPProps {
  level?: number;
  percent?: number;
}

function EXPBar(props: EXPProps) {
  const [level, setLevel] = useState(props.level ?? 0);
  const [percent, setPercent] = useState(props.percent ?? 0);

  function fillBar(percent: number) {
    setPercent(percent);
  }

  return (
    <div>
        <div className="expContainer">
          <div className="level">{level}</div>
          <div className="barContainer">
            <div className="bar" id="emptyBar">
              <img src={emptyBar} />
            </div>
            <div
              className="bar"
              id="fullBar"
              style={{ width: `${364 * percent}px` }}
            >
              <img src={fullBar} />
            </div>
          </div>
        </div>
        <button onClick={() => fillBar(.9)}>Filler</button>
    </div>
  );
}

export default EXPBar;
