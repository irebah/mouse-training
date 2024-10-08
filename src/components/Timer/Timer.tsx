import { useEffect, useState } from "react";
import { useGameProvider } from "../../context/GameContext";
import { MAX_TIME, REMAINDER_TIME } from "../../constants";
import { getMinutes, getSeconds } from "../../utils/time";
import { STOP_GAME } from "../../context/GameContext/types";
import alertSound from "../../assets/202193__thomas_evdokimoff__10-second-countdown.flac";

interface Props {
  timeLeft?: number;
}

const Timer = ({ timeLeft = MAX_TIME }: Props) => {
  const [time, setTime] = useState<number>(timeLeft);
  const [isPlaying, setIsPlaying] = useState(false);

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
      setIsPlaying(false);
    }

    return () => clearInterval(intervalId);
  }, [state.activeGame, time, dispatch, timeLeft]);

  useEffect(() => {
    if (time === 10 && !isPlaying) {
      const audio = new Audio(alertSound);
      audio.play();
      setIsPlaying(true);
    }
  }, [time, isPlaying]);

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
