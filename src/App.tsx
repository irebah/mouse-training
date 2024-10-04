import Information from "./components/Information/Information";
import ClickableContainer from "./components/ClickableContainer";
import StartButton from "./components/StartButton";
import { GameProvider } from "./context/GameContext";

const App = () => {
  return (
    <main className="flex-col gap-4 flex justify-center items-center w-screen h-screen p-10">
      <p className="text-4xl">Mouse training</p>
      <section className="w-screen max-w-7xl h-screen max-h-[60rem] p-5 border-2 border-blue-300/40 bg-blue-300/20 shadow-xl flex-row md:flex gap-3 rounded-xl relative flex justify-center items-center">
        <GameProvider>
          <Information className="md:w-[250px] rounded-xl h-full md:order-last mb-2 md:mb-0" />
          <ClickableContainer className="flex-1 h-full md:h-100" />
          <StartButton />
        </GameProvider>
      </section>
    </main>
  );
};

export default App;
