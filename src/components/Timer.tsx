import { useEffect, useState } from "react";
import { useGameProvider } from "../context/GameContext";
import { MAX_TIME, REMAINDER_TIME } from "../constants";
import { getMinutes, getSeconds } from "../utils/time";
import { STOP_GAME } from "../context/GameContext/types";

const Timer = () => {
  const [time, setTime] = useState<number>(MAX_TIME);
  const { state, dispatch } = useGameProvider();

  useEffect(() => {
    let intervalId: number;

    if (state.activeGame) {
      intervalId = setInterval(() => setTime(time - 1), 1000);
      if (time <= 0) {
        dispatch({ type: STOP_GAME });
      }
    } else {
      setTime(MAX_TIME);
    }

    return () => clearInterval(intervalId);
  }, [state.activeGame, time, dispatch]);

  return (
    <div>
      <p className="text-3xl">Time left</p>
      <p className={`${time < REMAINDER_TIME ? "text-red-700" : ""} text-7xl`}>
        {getMinutes(time)}:{getSeconds(time)}
      </p>
    </div>
  );
};

export default Timer;
