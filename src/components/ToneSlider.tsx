
import { useState } from "react";
import { Slider } from ".././components/ui/slider";
import { Label } from ".././components/ui/label";
import { motion } from "framer-motion";

export type ToneMode = "friend" | "brother" | "guru";

interface ToneSliderProps {
  onChange: (mode: ToneMode) => void;
}

const ToneSlider = ({ onChange }: ToneSliderProps) => {
  const [sliderValue, setSliderValue] = useState([1]);
  const tones: ToneMode[] = ["friend", "brother", "guru"];
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onChange(tones[value[0]]);
  };

  return (
    <div className="w-full p-6 bg-white/80 border-b">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tone" className="font-medium text-gray-700">
            Conversation Tone
          </Label>
          <div className="pt-4">
            <Slider
              id="tone"
              defaultValue={sliderValue}
              max={2}
              step={1}
              onValueChange={handleSliderChange}
              className="h-2"
            />
          </div>
        </div>
        
        <div className="flex justify-between text-sm font-medium text-gray-500">
          {tones.map((tone, index) => (
            <div 
              key={tone} 
              className="flex flex-col items-center"
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  sliderValue[0] === index 
                    ? "bg-chai-primary text-white" 
                    : "bg-gray-100 text-gray-500"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: sliderValue[0] === index ? 1.1 : 1,
                  backgroundColor: sliderValue[0] === index ? "#FF5722" : "#f1f5f9" 
                }}
                transition={{ duration: 0.2 }}
              >
                {tone === "friend" && "👋"}
                {tone === "brother" && "🤝"}
                {tone === "guru" && "🧠"}
              </motion.div>
              <span className="mt-2 capitalize">
                {tone}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToneSlider;
