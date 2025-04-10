
import { useState } from 'react';
import ToneSlider, { ToneMode } from "@/components/ToneSlider";
import CharacterSelector from "@/components/CharacterSelector";
import DualChatInterface from "@/components/DualChatInterface";

const DualChat = () => {
  const [toneMode, setToneMode] = useState<ToneMode>("friend");
  const [activeCharacters, setActiveCharacters] = useState<("hitesh" | "piyush")[]>(["hitesh"]);

  return (
    <div className='max-h-screen h-screen w-full flex flex-col divide-y overflow-hidden'>
      <header className='w-full p-3'>
        <h1 className='text-xl font-bold'>Chai With Hitesh & Piyush Sir</h1>
      </header>
      <main className='grid divide-x grid-cols-[300px_1fr] overflow-hidden flex-grow'>
        <div className='grid grid-rows-[auto_1fr_1fr]'>
        <ToneSlider onChange={setToneMode} />
        <CharacterSelector onSelectionChange={setActiveCharacters} />

        </div>
        <DualChatInterface 
                activeCharacters={activeCharacters} 
                toneMode={toneMode} 
              />
      </main>
      {/* <footer className='w-full p-3'></footer> */}
    </div>
  );
};

export default DualChat;
