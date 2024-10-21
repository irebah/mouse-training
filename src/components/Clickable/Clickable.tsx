import { useState } from "react";
import {
  ACTIVE_BACKGROUND_COLOR,
  CLICKABLE_GAP,
  CLICKABLE_SIZE,
  ERROR_BACKGROUND_COLOR,
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
  onError?: () => void;
}

const Clickable = ({
  active = false,
  className = "",
  onError = () => {},
}: Props) => {
  const { state, dispatch } = useGameProvider();
  const [error, setError] = useState<boolean>(false);

  const onClick = () => {
    if (state.activeGame) {
      if (active) {
        dispatch({ type: INCREASE_COUNTER });
        dispatch({ type: SELECT_RANDOM_SQUARE });
      } else {
        setError(true);
        onError();

        setTimeout(() => {
          setError(false);
        }, 300);
      }
    }
  };

  const getColor = (): string => {
    if (active) {
      return ACTIVE_BACKGROUND_COLOR;
    }

    if (error) {
      return ERROR_BACKGROUND_COLOR;
    }

    return INACTIVE_BACKGROUND_COLOR;
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        ${getColor()}
        border-2 border-black rounded-lg
      `}
      style={{
        width: CLICKABLE_SIZE - CLICKABLE_GAP,
        height: CLICKABLE_SIZE - CLICKABLE_GAP,
      }}
    />
  );
};

export default Clickable;
