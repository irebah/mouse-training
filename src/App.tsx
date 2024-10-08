import ClickableContainer from "./components/ClickableContainer/ClickableContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Information from "./components/Information/Information";
import StartButton from "./components/StartButton/StartButton";
import { GameProvider } from "./context/GameContext";

const App = () => {
  return (
    <main className="flex-col gap-4 center w-screen h-screen p-5 md:p-10">
      <p className="text-4xl">Mouse training</p>
      <section className="gameArea center flex-col md:flex md:flex-row gap-3 relative">
        <ErrorBoundary>
          <GameProvider>
            <Information className="md:w-[250px] md:block w-full flex rounded-xl md:h-full md:order-last mb-2 md:mb-0" />
            <ClickableContainer className="flex-1 h-full md:h-100" />
            <StartButton />
          </GameProvider>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default App;
