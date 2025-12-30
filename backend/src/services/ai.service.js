import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const rewriteArticle = async (original, ref1, ref2) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Rewrite the following article using better SEO, formatting,
and tone inspired by the references.

Original:
${original}

Reference 1:
${ref1}

Reference 2:
${ref2}

Return clean HTML content.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
