import { useGame } from "../context/GameContext";
import Counter from "./Counter";

interface Props {
  className?: string;
}

const Information = ({ className = "" }: Props) => {
  const { state } = useGame();

  return (
    <section
      className={`${className} ${!state.activeGame ? "opacity-10" : ""}`}
    >
      <Counter />
      <article>
        <p className="text-2xl mt-10">Clicked</p>
        <p className="text-8xl">{state.elementsClicked}</p>
      </article>
    </section>
  );
};

export default Information;
