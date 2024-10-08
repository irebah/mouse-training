import { useEffect, useRef } from "react";
import { useGameProvider } from "../../context/GameContext";
import Clickable from "../Clickable/Clickable";
import { CLICKABLE_SIZE, OPACITY_INACTIVE_GAME } from "../../constants";
import { SET_GRID_SIZE } from "../../context/GameContext/types";

interface Props {
  className?: string;
  clickableSize?: number;
}

const ClickableContainer = ({
  className = "",
  clickableSize = CLICKABLE_SIZE,
}: Props) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
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
    }
  }, [dispatch, clickableSize]);

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
          <Clickable key={index} active={index === state.activeElement} />
        ))}
      </div>
    </section>
  );
};

export default ClickableContainer;
