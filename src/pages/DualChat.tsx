import { useState } from "react";
import ToneSlider, { ToneMode } from "./../components/ToneSlider";
import CharacterSelector from "./../components/CharacterSelector";
import DualChatInterface from "./../components/DualChatInterface";

const DualChat = () => {
  const [toneMode, setToneMode] = useState<ToneMode>("friend");
  const [activeCharacters, setActiveCharacters] = useState<
    ("hitesh" | "piyush")[]
  >(["hitesh"]);

  return (
    <div className="max-h-screen h-screen w-full flex flex-col divide-y overflow-hidden">
      <header className="w-full p-1 px-2 bg-slate-50 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <img
            src="/favicon.ico"
            alt="Chai"
            className="w-10 h-10 rounded-full"
          />{" "}
          Chai With Hitesh & Piyush Sir
        </h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:shadow-lg">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/3d-fluency/94/github.png"
            alt="github"
          />
        </button>
      </header>
      <main className="grid divide-x md:grid-cols-[300px_1fr] overflow-hidden flex-grow relative">
        <input
          type="checkbox"
          name="side-drawer"
          id="side-drawer"
          className="fixed top-4 hidden right-4 peer"
        />
        <div className="grid md:static fixed peer-checked:-translate-x-full md:!transform-none transition-all inset-y-0 md:w-auto w-[60%] z-50 bg-white shadow-lg md:shadow-none grid-rows-[auto_1fr_1fr]">
          <ToneSlider onChange={setToneMode} />
          <CharacterSelector onSelectionChange={setActiveCharacters} />
        </div>
        <DualChatInterface
          activeCharacters={activeCharacters}
          toneMode={toneMode}
        />
      </main>
      <footer className="w-full p-1.5 *:opacity-80 bg-chai-dark text-white grid place-items-center text-center text-xs">
        <span>
          Made with ❤️ by{" "}
          <a
            href="https://devyanshyadav.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Devyansh Developer
          </a>
        </span>
      </footer>
    </div>
  );
};

export default DualChat;
