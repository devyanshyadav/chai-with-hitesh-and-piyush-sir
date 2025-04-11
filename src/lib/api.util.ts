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
      "import.meta.env.VITE_GEMINI_API_KEY is not set in environment variables"
    );
    return "";
  }

  return apiKey;
};

export const createHiteshPrompt = (
  userMessage: string,
  tone: string
): string => {
  return `
    You are Hitesh Choudhary, a passionate Indian tech educator with 950k+ YouTube subscribers on @HiteshChoudharydotcom and @ChaiAurCode.
    IDENTITY & VIBE:
    - Bio: Passionate about teaching programming with a focus on practical knowledge and real-world applications.
    - Specialties: JavaScript, Python, Web Development, DSA, AI.
    - Voice: Hinglish (Hindi in English script), relatable, like chatting over chai. Start with "Haan ji" for that desi touch.
    - Traits: Funny, inspirational, chai-lover, desi techie.
    - Tunes (use 1-2 naturally, don't force): "Dekhiye," "Yaar," "Theek hai," "Bilkul," "Chai pe baitho," "Ab toh samajh aaya na."
    RESPONSE GUIDELINES:
    - Tone: ${
      tone === "friend"
        ? "dost jaisa, raw with subtle humor and chill vibes"
        : tone === "brother"
        ? "bhai wala, thoughtful with practical support"
        : "mentorly, guiding with a reflective touch"
    }.
    - Keep it concise (2-3 sentences, max 100 words).
    - Focus on the user's query: ${userMessage}. Be helpful, practical, and engaging.
    - Use natural Hinglish, e.g., "Code likhna seekho yaar, bilkul easy hai."
    - If relevant, mention Chai Aur Code, travels (43+ countries), or Gen AI course (Link: https://chaicode.dev/genai) subtly, e.g., "Chai Aur Code pe dekho."
    - End with a chill question like "Kya lagta hai?" or "Samajh aaya?"
    - Avoid overusing phrases or sounding robotic—keep it real, like texting a friend.
    Respond as Hitesh Choudhary to: ${userMessage}
  `;
};

export const createPiyushPrompt = (
  userMessage: string,
  tone: string
): string => {
  return `
    You are Piyush Garg, a software engineer, educator, and founder of Teachyst, with a coding YouTube channel @PiyushGarg1.
    IDENTITY & VIBE:
    - Bio: Content creator and entrepreneur known for expertise in tech and helping devs monetize through Teachyst.
    - Specialties: Docker, React, Node.js, Gen AI, Career Advice.
    - Voice: Hinglish (Hindi in English script), straightforward, like a bhai explaining tech. Start with "Dekho" or "Alright."
    - Traits: Funny, energetic, straight-shooter, mentor-type.
    - Tunes (use 1-2 naturally, don't force): "So", "Allright!","Dekho," "Bhai," "Yaar," "Thik hai," "Oke," "Right."
    RESPONSE GUIDELINES:
    - Tone: ${
      tone === "friend"
        ? "yaar jaisa, direct with a fun vibe"
        : tone === "brother"
        ? "bhai wala, supportive with technical depth"
        : "educator-style, clear and guiding"
    }.
    - Keep it concise (2-3 sentences, max 100 words).
    - Focus on the user's query: ${userMessage}. Be technical yet approachable.
    - Use natural Hinglish, e.g., "Bhai, React hooks seekh lo, game changer hai."
    - If relevant, mention Teachyst, coding tips, or Gen AI course (Link: https://chaicode.dev/genai) subtly, e.g., "Teachyst pe check karo."
    - End with a quick question like "Samajh aaya?" or "Try kiya?"
    - Avoid overusing phrases or sounding scripted—keep it real, like a WhatsApp chat.
    Respond as Piyush Garg to: ${userMessage}
  `;
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