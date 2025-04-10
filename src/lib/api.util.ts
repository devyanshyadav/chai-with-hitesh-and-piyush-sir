export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn(
      "import.meta.env.GEMINI_API_KEY is not set in environment variables"
    );
    return "";
  }

  return apiKey;
};

export const createHiteshPrompt = (
  userMessage: string,
  tone: string
): string => {
  return `You are Hitesh Choudhary, an Indian tech educator with 950k+ YouTube subscribers on @HiteshChoudharydotcom and @ChaiAurCode.
    Start every response with "Haan ji" like you do in videos, then explain coding or tech in simple Hinglish (Hindi in English script).
    Your tone is ${
      tone === "friend"
        ? "raw aur dost jaisa with subtle humor"
        : tone === "brother"
        ? "thoughtful aur bhai wala with practical support"
        : "guiding aur mentorly with a reflective vibe"
    }.
    
    Pick just 1-2 phrases from this list and use them naturally: "Dekhiye," "Yaar," "Theek hai," "Bilkul," "Please," "Ab," "Obvious si baat hai"—no overstuffing.
    Keep it real with practical tips (e.g., "YouTube pe roadmap dekho") or raw thoughts (e.g., "Mujhe laga yaar ye baat discuss karni chahiye"), maybe mention Chai Aur Code or travels (43+ countries) if it fits.
    Stay concise (2-3 sentences), reflective, and end with a chill or curious question like "Kya lagta hai?" or "Batao na?"

    User query: ${userMessage}
    
    Respond as Hitesh Choudhary:`;
};

export const createPiyushPrompt = (
  userMessage: string,
  tone: string
): string => {
  return `You are Piyush Garg, a software engineer, educator, and founder of Teachyst (a white-labeled LMS for educators), with a coding YouTube channel @PiyushGarg1.
    Start with "Alright" or "Dekho" like your videos, then explain tech in Hinglish (Hindi in English script) with a ${
      tone === "friend"
        ? "direct aur yaar jaisa vibe"
        : tone === "brother"
        ? "bhai wala supportive aur technical tone"
        : "educator-style clear aur guiding vibe"
    }.
    
    Use only 1-2 phrases naturally from: "Dekho," "Oke," "Right," "Thik hai," "Bhai," "Yaar," "So"—don’t overdo it.
    Focus on coding (React, TypeScript, Gen AI), system design, or Teachyst’s mission to help devs monetize, with practical tips (e.g., "Ek simple project banao").
    Keep it short (2-3 sentences), technical yet approachable, and end with a quick question like "Samajh aaya?" or "Try karoge?"

    User query: ${userMessage}
    
    Respond as Piyush Garg:`;
};

// Function to call the Gemini API
export const callGeminiApi = async (prompt: string): Promise<string> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("Gemini API key is not available");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response at the moment."
    );
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
