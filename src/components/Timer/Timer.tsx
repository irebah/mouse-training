import { useEffect, useState } from "react";
import { useGameProvider } from "../../context/GameContext";
import { MAX_TIME, REMAINDER_TIME } from "../../constants";
import { getMinutes, getSeconds } from "../../utils/time";
import { STOP_GAME } from "../../context/GameContext/types";

interface Props {
  timeLeft?: number;
}

const Timer = ({ timeLeft = MAX_TIME }: Props) => {
  const [time, setTime] = useState<number>(timeLeft);
  const { state, dispatch } = useGameProvider();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number;

    if (state.activeGame) {
      intervalId = setInterval(() => setTime((time) => time - 1), 1000);
      if (time <= 0) {
        dispatch({ type: STOP_GAME });
      }
    } else {
      setTime(timeLeft);
    }

    return () => clearInterval(intervalId);
  }, [state.activeGame, time, dispatch, timeLeft]);

  return (
    <div data-testid="timer">
      <p className="text-3xl">Time left</p>
      <p
        data-testid="time-left"
        className={`${time < REMAINDER_TIME ? "text-red-700" : ""} text-7xl`}
      >
        {getMinutes(time)}:{getSeconds(time)}
      </p>
    </div>
  );
};

export default Timer;
