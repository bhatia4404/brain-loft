const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const genAI = new GoogleGenerativeAI("AIzaSyDE9qEqKzQwCMWzsr14_vgMcd5EmJN8RQg");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const answer = async function (text) {
  try {
    let textRecieved = `${text}`;
    // console.log(textRecieved);
    const wordCount = text.split(" ").length;

    if (wordCount < 2) {
      const prompt = `meaning of ${textRecieved} in less than 10 words (easy to understand language)`;
      const result = await model.generateContent(prompt);
      return {
        text,
        explanation: result.response.text(),
      };
    } else if (wordCount < 20) {
      const prompt = `Explain "${text}" in less than 20 words (easy to understand language)`;
      const result = await model.generateContent(prompt);
      return {
        text,
        explanation: result.response.text(),
      };
    } else {
      const prompt = `Summarise this text "${text}" a(approximately 40 words)`;
      const result = await model.generateContent(prompt);
      return {
        text,
        explanation: result.response.text(),
      };
    }
  } catch (e) {
    return {
      error: e,
    };
  }
};

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post("/explain", async function (req, res) {
  const { text } = req.body;
  const ans = await answer(text);
  // console.log(ans);
  return res.json(ans);
});
app.listen(3000, () => console.log("Listening at 3000"));
