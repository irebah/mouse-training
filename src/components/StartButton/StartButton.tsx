import { useGameProvider } from "../../context/GameContext";
import {
  SELECT_RANDOM_SQUARE,
  START_GAME,
} from "../../context/GameContext/types";

const StartButton = () => {
  const { state, dispatch } = useGameProvider();

  const onStartGame = () => {
    dispatch({ type: START_GAME });
    dispatch({ type: SELECT_RANDOM_SQUARE });
  };

  return !state.activeGame ? (
    <button
      className="absolute px-5 py-3 uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold text-4xl border-2 border-blue-700 rounded-xl"
      onClick={onStartGame}
    >
      Start
    </button>
  ) : null;
};

export default StartButton;
