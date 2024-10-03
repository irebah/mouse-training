import { useGame } from "../context/GameContext";
import { GAME_ACTIONS } from "../types";

interface Props {
  active?: boolean;
  size: number;
  className?: string;
}

const Clickable = ({ active = false, size, className = "" }: Props) => {
  const { state, dispatch } = useGame();

  const onClick = () => {
    if (state.activeGame && active) {
      dispatch({ type: GAME_ACTIONS.INCREASE_COUNTER });
      dispatch({ type: GAME_ACTIONS.SELECT_RANDOM_SUARE });
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        ${active ? "bg-black" : "bg-white"}
        border-2 border-black rounded-full
      `}
      style={{ width: size - 4, height: size - 4 }}
    />
  );
};

export default Clickable;
