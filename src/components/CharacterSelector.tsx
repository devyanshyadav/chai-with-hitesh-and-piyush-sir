
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CharacterSelectorProps {
  onSelectionChange: (characters: ("hitesh" | "piyush")[]) => void;
}

const CharacterSelector = ({ onSelectionChange }: CharacterSelectorProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<("hitesh" | "piyush")[]>(["hitesh"]);

  const toggleCharacter = (character: "hitesh" | "piyush") => {
    let newSelection: ("hitesh" | "piyush")[];
    
    if (selectedCharacters.includes(character)) {
      // Ensure at least one character is selected
      if (selectedCharacters.length > 1) {
        newSelection = selectedCharacters.filter(c => c !== character);
      } else {
        return; // Don't allow deselecting the last character
      }
    } else {
      newSelection = [...selectedCharacters, character];
    }
    
    setSelectedCharacters(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={`
          relative p-4
          ${selectedCharacters.includes("hitesh") 
            ? "bg-gradient-to-br from-chai-primary/10 to-chai-primary/30 " 
            : "bg-white"}
          cursor-pointer
        `}
        onClick={() => toggleCharacter("hitesh")}
      >
        {selectedCharacters.includes("hitesh") && (
          <div className="absolute top-3 right-3 bg-chai-primary text-white rounded-full p-1">
            <Check size={16} />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-20 rounded-full overflow-hidden brightness-110 flex items-center justify-center border-4 border-chai-primary text-white text-2xl font-bold">
            <img src="/hiteshsir.png" alt="Hitesh" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg mt-2">Hitesh Choudhary</h3>
          <p className="text-sm text-center text-gray-600">Tech YouTuber & Educator</p>
        </div>
      </motion.div>
      
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={`
          relative p-4 
          ${selectedCharacters.includes("piyush") 
            ? "bg-gradient-to-br from-blue-100 to-blue-200" 
            : "bg-white"}
          cursor-pointer
        `}
        onClick={() => toggleCharacter("piyush")}
      >
        {selectedCharacters.includes("piyush") && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1">
            <Check size={16} />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-20 rounded-full overflow-hidden brightness-110 flex items-center justify-center border-4 border-blue-500 text-white text-2xl font-bold">
            <img src="/piyushsir.png" alt="Piyush" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg mt-2">Piyush Garg</h3>
          <p className="text-sm text-center text-gray-600">React Expert & YouTuber</p>
        </div>
      </motion.div>
    </>
  );
};

export default CharacterSelector;
