import {
  ACTIVE_BACKGROUND_COLOR,
  CLICKABLE_GAP,
  CLICKABLE_SIZE,
  INACTIVE_BACKGROUND_COLOR,
} from "../../constants";
import { useGameProvider } from "../../context/GameContext";
import {
  INCREASE_COUNTER,
  SELECT_RANDOM_SQUARE,
} from "../../context/GameContext/types";

interface Props {
  active?: boolean;
  className?: string;
}

const Clickable = ({ active = false, className = "" }: Props) => {
  const { state, dispatch } = useGameProvider();

  const onClick = () => {
    if (state.activeGame && active) {
      dispatch({ type: INCREASE_COUNTER });
      dispatch({ type: SELECT_RANDOM_SQUARE });
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        ${active ? ACTIVE_BACKGROUND_COLOR : INACTIVE_BACKGROUND_COLOR}
        border-2 border-black rounded-full
      `}
      style={{
        width: CLICKABLE_SIZE - CLICKABLE_GAP,
        height: CLICKABLE_SIZE - CLICKABLE_GAP,
      }}
    />
  );
};

export default Clickable;
