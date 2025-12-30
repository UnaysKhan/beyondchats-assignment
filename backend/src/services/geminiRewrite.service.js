import axios from "axios";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const rewriteWithGemini = async ({
  title,
  originalContent,
  referenceContents,
}) => {
  try {
    const prompt = `
You are a professional SEO content editor.

TASK:
Rewrite the original article using the reference articles for inspiration.
Improve structure, clarity, SEO, and readability.
Do NOT copy text from references.
Keep content original.
Use proper headings and formatting.
Return clean HTML only (no markdown, no explanations).

ARTICLE TITLE:
${title}

ORIGINAL ARTICLE:
${originalContent}

REFERENCE ARTICLES:
${referenceContents.join("\n\n---\n\n")}
`;

    const response = await axios.post(
      GEMINI_ENDPOINT,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) return "";

    return candidates[0].content.parts[0].text;

  } catch (error) {
    console.error(
      "Gemini REST rewrite error:",
      error.response?.data || error.message
    );
    return "";
  }
};
