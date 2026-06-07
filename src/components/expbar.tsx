import "./expbar.css";
import emptyBar from "../assets/xp_bar_empty.png";
import fullBar from "../assets/xp_bar_full.png";
import { useState } from "react";
import gainExp from '../assets/gainxp.opus'
import levelUp from '../assets/level up.opus'

interface EXPProps {
  level?: number;
  percent?: number;
}

function EXPBar(props: EXPProps) {
  const [level, setLevel] = useState(props.level ?? 0);
  const [percent, setPercent] = useState(props.percent ?? 0);

  const gainExpAudio = new Audio(gainExp);
  const levelUpAudio = new Audio(levelUp);

  function addBar() {
    setPercent(percent + 0.1);

    setPercent(prev => {
      const next = prev + 0.1;
      if (next >= 1) {
        setLevel(level + 1);
        levelUpAudio.play();
        return next - 1;
      }

      gainExpAudio.play();
      return next;
    });
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
      <button onClick={() => addBar()}>Adder</button>
    </div>
  );
}

export default EXPBar;
