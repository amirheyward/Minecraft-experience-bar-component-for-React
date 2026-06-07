import "./expbar.css";
import emptyBar from "../assets/xp_bar_empty.png";
import fullBar from "../assets/xp_bar_full.png";
import { useState, useEffect, useRef} from "react";
import gainExp from '../assets/gainxp.opus'
import levelUp from '../assets/level up.opus'

interface EXPProps {
  level?: number;
  percent?: number;
}

function EXPBar(props: EXPProps) {
  const [level, setLevel] = useState(props.level ?? 0);
  const [percent, setPercent] = useState(props.percent ?? 0);
  const prevPercentRef = useRef(percent);

  const gainExpAudio = new Audio(gainExp);
  const levelUpAudio = new Audio(levelUp);

  // sound playing and state updating for levels
  useEffect(() => {
    const prev = prevPercentRef.current;

    if (percent < prev) {
        setLevel(l => l + 1);
        levelUpAudio.play();
    } else if (percent > prev) { // will always run when this effect is called since it relies on percent
        gainExpAudio.play();
    }

    prevPercentRef.current = percent;
  }, [percent])

  // timer for experience gain
  useEffect(() => {
    const id = setInterval(() => {
        addBar();
    }, 60000); // once a minute

    return () => clearInterval(id);
  }, [])

  function addBar() {
    // state updater functions must have no side effects
    setPercent(prev => {
      const next = prev + 0.1;
      if (next >= 1) {
        return next - 1;
      }
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
