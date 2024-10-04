import { OPACITY_INACTIVE_GAME } from "../../constants";
import { useGameProvider } from "../../context/GameContext";
import Counter from "../Counter";

interface Props {
  className?: string;
}

const Information = ({ className = "" }: Props) => {
  const { state } = useGameProvider();

  return (
    <section
      data-testid="information"
      className={`${className} ${
        !state.activeGame ? OPACITY_INACTIVE_GAME : ""
      }`}
    >
      <Counter />
      <article>
        <p className="text-2xl mt-10">Clicked</p>
        <p data-testid="elementsClicked" className="text-8xl">
          {state.elementsClicked}
        </p>
      </article>
    </section>
  );
};

export default Information;
