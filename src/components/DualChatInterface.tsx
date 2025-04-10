import { useState, useRef, useEffect } from "react";
import { Send, User, Loader2, CornerDownLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ToneMode } from "./ToneSlider";
import { toast } from "sonner";
import {
  createHiteshPrompt,
  createPiyushPrompt,
  callGeminiApi,
} from "../lib/api.util";

interface Message {
  id: string;
  role: "user" | "hitesh" | "piyush";
  content: string;
  timestamp: Date;
}

interface DualChatInterfaceProps {
  activeCharacters: ("hitesh" | "piyush")[];
  toneMode: ToneMode;
}

// Function to get AI response based on persona
const getAIResponse = async (
  userMessage: string,
  persona: "hitesh" | "piyush",
  tone: ToneMode
): Promise<string> => {
  try {
    const prompt =
      persona === "hitesh"
        ? createHiteshPrompt(userMessage, tone)
        : createPiyushPrompt(userMessage, tone);

    return await callGeminiApi(prompt);
  } catch (error) {
    console.error(`Error getting ${persona} response:`, error);

    // Fallback responses in case of API failure
    return persona === "hitesh"
      ? "Arey yaar, lagta hai connection mein kuch problem hai. Thodi der baad try karo, tab tak kuch aur discuss karte hain?"
      : "Bhai, technical issue lag raha hai. Server response nahi aa raha. Thodi der baad try karo.";
  }
};

const DualChatInterface = ({
  activeCharacters,
  toneMode,
}: DualChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "hitesh",
      content:
        "Haan ji, kaise ho aap? Hitesh Choudhary here. Tech sikhna hai, ya koi sawaal hai? Poocho bindaas!",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    // Only add Piyush's intro message if he's active and not already in messages
    if (
      activeCharacters.includes("piyush") &&
      !messages.some((m) => m.role === "piyush")
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: "2",
          role: "piyush",
          content:
            "Hey there! Piyush here. What's on your mind today? Let's talk about web development, React, or anything tech!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [activeCharacters]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Process responses for active characters
      const processCharacterResponse = async (
        persona: "hitesh" | "piyush",
        delay = 0
      ) => {
        if (activeCharacters.includes(persona)) {
          if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }

          const response = await getAIResponse(
            userMessage.content,
            persona,
            toneMode
          );

          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${persona}`,
              role: persona,
              content: response,
              timestamp: new Date(),
            },
          ]);
        }
      };

      // Process Hitesh's response first if active
      await processCharacterResponse("hitesh");

      // Process Piyush's response with delay if both are active
      await processCharacterResponse(
        "piyush",
        activeCharacters.includes("hitesh") ? 800 : 0
      );
    } catch (error) {
      console.error("Error processing responses:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="bg-gradient-to-r from-chai-secondary to-chai-dark px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-chai-primary" />
          <h3 className="font-medium">Tech Conversations</h3>
        </div>
        <div className="text-xs text-gray-300">
          {activeCharacters.includes("hitesh") &&
          activeCharacters.includes("piyush")
            ? "Chatting with Hitesh & Piyush"
            : activeCharacters.includes("hitesh")
            ? "Chatting with Hitesh"
            : "Chatting with Piyush"}
        </div>
      </div>

      <div className="max-w-[80%] flex-grow mx-auto overflow-hidden overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-3 p-4 max-w-[85%]",
                message.role === "user"
                  ? "ml-auto bg-gray-100/80 backdrop-blur-sm shadow-sm"
                  : message.role === "hitesh"
                  ? "bg-gradient-to-r from-chai-primary/5 to-chai-primary/10 border-l-4 border-chai-primary shadow-sm"
                  : "bg-gradient-to-r from-blue-100/80 to-blue-50/80 border-l-4 border-blue-500 shadow-sm"
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md",
                  message.role === "user"
                    ? "bg-gradient-to-br from-chai-secondary to-chai-dark text-white"
                    : message.role === "hitesh"
                    ? "bg-gradient-to-br from-chai-primary to-chai-primary/80 text-white"
                    : "bg-gradient-to-br from-blue-500 to-blue-400 text-white"
                )}
              >
                {message.role === "user" ? (
                  <User size={18} />
                ) : (
                  <div className="text-lg font-bold">
                    {message.role === "hitesh" ? "HC" : "PG"}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    message.role === "user"
                      ? "text-gray-800"
                      : message.role === "hitesh"
                      ? "text-chai-secondary"
                      : "text-blue-700"
                  )}
                >
                  {message.role === "user"
                    ? "You"
                    : message.role === "hitesh"
                    ? "Hitesh Choudhary"
                    : "Piyush Garg"}
                </p>
                <p className="mt-1 text-sm whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-chai-primary/5 to-chai-primary/10 border-l-4 border-chai-primary max-w-[80%] shadow-sm"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-chai-primary to-chai-primary/80 text-white flex items-center justify-center shadow-md">
              <div className="text-lg font-bold">
                {activeCharacters.includes("hitesh") ? "HC" : "PG"}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-chai-secondary">
                {activeCharacters.includes("hitesh")
                  ? "Hitesh Choudhary"
                  : "Piyush Garg"}
              </p>
              <div className="flex items-center mt-2">
                <Loader2 className="animate-spin w-4 h-4 mr-2 text-chai-primary" />
                <p className="text-sm text-gray-600">Typing a response...</p>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 flex-shrink-0 *:max-w-[80%] *:mx-auto border-t border-gray-200 bg-white"
      >
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${activeCharacters.join(
              " & "
            )} about tech, coding, career advice...`}
            className="pr-16 resize-none py-3 min-h-[60px] max-h-[120px] border-gray-300 focus:border-chai-primary focus:ring-chai-primary rounded-xl shadow-inner"
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-2 z-50 flex items-center gap-2">
            <kbd className="hidden md:flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">
                <CornerDownLeft className="h-3 w-3" />
              </span>{" "}
              Enter
            </kbd>
            <Button
              size="sm"
              type="submit"
              className="h-8 w-8 p-0 bg-gradient-to-r from-chai-primary to-chai-secondary hover:opacity-90 rounded-full shadow-md"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4 text-white" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DualChatInterface;
