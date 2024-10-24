import { useEffect, useRef } from "react";
import { useGameProvider } from "../../context/GameContext";
import Clickable from "../Clickable/Clickable";
import { CLICKABLE_SIZE, OPACITY_INACTIVE_GAME } from "../../constants";
import { SET_GRID_SIZE } from "../../context/GameContext/types";
import { logEvent } from "../../utils/analytics";
import failSound from "../../assets/419023__jacco18__acess-denied-buzz.mp3";

interface Props {
  className?: string;
  clickableSize?: number;
}

const ClickableContainer = ({
  className = "",
  clickableSize = CLICKABLE_SIZE,
}: Props) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const { state, dispatch } = useGameProvider();

  useEffect(() => {
    if (gridRef.current) {
      const width = gridRef.current.clientWidth;
      const height = gridRef.current.clientHeight;

      const cols = Math.floor(width / clickableSize);
      const rows = Math.floor(height / clickableSize);

      dispatch({
        type: SET_GRID_SIZE,
        payload: {
          rows,
          cols,
        },
      });
      logEvent("set_grid", "setup");

      audio.current = new Audio(failSound);
    }
  }, [dispatch, clickableSize]);

  const playSound = () => {
    audio.current?.play();
  };

  return (
    <section
      data-testid="clickableContainer"
      className={`${
        !state.activeGame ? OPACITY_INACTIVE_GAME : ""
      } w-full h-full`}
    >
      <div
        ref={gridRef}
        className={`${className} grid gap-0`}
        style={{
          gridTemplateColumns: `repeat(${state.cols}, ${clickableSize}px)`,
        }}
      >
        {[...Array(state.rows * state.cols).keys()].map((index) => (
          <Clickable
            key={index}
            active={index === state.activeElement}
            onError={playSound}
          />
        ))}
      </div>
    </section>
  );
};

export default ClickableContainer;
