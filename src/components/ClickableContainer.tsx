import { useEffect, useRef } from "react";
import Clickable from "./Clickable/Clickable";
import { useGameProvider } from "../context/GameContext";
import { CLICKABLE_SIZE, OPACITY_INACTIVE_GAME } from "../constants";
import { SET_GRID_SIZE } from "../context/GameContext/types";

interface Props {
  className?: string;
}

const ClickableContainer = ({ className = "" }: Props) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useGameProvider();

  useEffect(() => {
    if (gridRef.current) {
      const width = gridRef.current.clientWidth;
      const height = gridRef.current.clientHeight;

      const cols = Math.floor(width / CLICKABLE_SIZE);
      const rows = Math.floor(height / CLICKABLE_SIZE);

      dispatch({
        type: SET_GRID_SIZE,
        payload: {
          rows,
          cols,
        },
      });
    }
  }, [gridRef, dispatch]);

  return (
    <section
      className={`${
        !state.activeGame ? OPACITY_INACTIVE_GAME : ""
      } w-full h-full`}
    >
      <div
        ref={gridRef}
        className={`${className} grid gap-0`}
        style={{
          gridTemplateColumns: `repeat(${state.cols}, ${CLICKABLE_SIZE}px)`,
        }}
      >
        {[...Array(state.rows * state.cols).keys()].map((index) => (
          <Clickable key={index} active={index === state.activeElement} />
        ))}
      </div>
    </section>
  );
};

export default ClickableContainer;
