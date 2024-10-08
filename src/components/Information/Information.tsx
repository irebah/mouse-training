import { useEffect, useState } from "react";
import { OPACITY_INACTIVE_GAME } from "../../constants";
import { useGameProvider } from "../../context/GameContext";
import { logEvent } from "../../utils/analytics";
import Timer from "../Timer/Timer";

interface Props {
  className?: string;
}

const Information = ({ className = "" }: Props) => {
  const { state } = useGameProvider();
  const [eventLogged, setEventLogged] = useState<boolean>(false);

  useEffect(() => {
    // only log this once
    if (state.elementsClicked > 0 && !eventLogged) {
      logEvent("game_played", "game_action");
      setEventLogged(true);
    }
  }, [state.elementsClicked, eventLogged]);

  return (
    <section
      data-testid="information"
      className={`
        ${className} 
        ${!state.activeGame ? OPACITY_INACTIVE_GAME : ""}
        justify-between
      `}
    >
      <Timer />
      <article>
        <p className="text-2xl md:text-2xl md:mt-10">Clicked</p>
        <p data-testid="elementsClicked" className="text-6xl md:text-8xl">
          {state.elementsClicked}
        </p>
      </article>
    </section>
  );
};

export default Information;
