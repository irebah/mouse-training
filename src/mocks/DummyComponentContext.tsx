import { useGameProvider } from "../context/GameContext";
import { Action, START_GAME } from "../context/GameContext/types";

interface Props {
  action?: Action;
}
// A test component to consume the context
const DummyComponentContext = ({ action = { type: START_GAME } }: Props) => {
  const { state, dispatch } = useGameProvider();

  const onClick = () => {
    dispatch(action);
  };

  return (
    <div>
      <span data-testid="state">{JSON.stringify(state)}</span>
      <button onClick={onClick}>Dispatch</button>
    </div>
  );
};

export default DummyComponentContext;
