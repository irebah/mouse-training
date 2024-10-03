import { useEffect, useRef } from "react";
import Clickable from "./Clickable";
import { useGame } from "../context/GameContext";
import { GAME_ACTIONS } from "../types";
import { SQUARE_SIZE } from "../constants";

interface Props {
  className?: string;
}

const ClickableContainer = ({ className = "" }: Props) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (gridRef.current) {
      const width = gridRef.current.clientWidth;
      const height = gridRef.current.clientHeight;

      const cols = Math.floor(width / SQUARE_SIZE);
      const rows = Math.floor(height / SQUARE_SIZE);

      dispatch({
        type: GAME_ACTIONS.SET_GRID_SIZE,
        payload: {
          rows,
          cols,
        },
      });
    }
  }, [gridRef, dispatch]);

  return (
    <section
      className={`${!state.activeGame ? "opacity-10" : ""} w-full h-full`}
    >
      <div
        ref={gridRef}
        className={`${className} grid gap-0`}
        style={{
          gridTemplateColumns: `repeat(${state.cols}, ${SQUARE_SIZE}px)`,
        }}
      >
        {[...Array(state.rows * state.cols).keys()].map((index) => (
          <Clickable
            key={index}
            active={index === state.activeSquare}
            size={SQUARE_SIZE}
          />
        ))}
      </div>
    </section>
  );
};

export default ClickableContainer;
