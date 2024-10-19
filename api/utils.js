const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const answer = async function (text) {
  const wordCount = text.split(" ").length;
  if (wordCount < 2) {
    const prompt = `meaning of ${text} in less than 10 words (easy to understand language)`;
    const result = await model.generateContent(prompt);
    return {
      text,
      explanation: {
        meaning: result.response.text(),
      },
    };
  } else if (wordCount < 10) {
    const prompt = `Explain "${text}" in less than 20 words (easy to understand language)`;
    const result = await model.generateContent(prompt);
    return {
      text,
      explanation: {
        meaning: result.response.text(),
      },
    };
  }
};
