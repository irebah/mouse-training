import { useGame } from "../context/GameContext";
import { GAME_ACTIONS } from "../types";

const StartButton = () => {
  const { state, dispatch } = useGame();

  const onStartGame = () => {
    dispatch({ type: GAME_ACTIONS.START_GAME });
    dispatch({ type: GAME_ACTIONS.SELECT_RANDOM_SUARE });
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
