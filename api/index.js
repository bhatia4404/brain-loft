const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function translate(text, language) {
  if (text.length < 1) {
    return {
      error: {
        err_msg: "Select a word with atleast one letter.",
      },
    };
  }
  const prompt = `translate the word "${text}" to ${language} in format "translation"`;
  const res = await model.generateContent(prompt);
  return res.response.text();
}
async function define(text) {
  if (text.length < 1) {
    return {
      error: {
        err_msg: "Select a word with atleast one letter.",
      },
    };
  }
  const prompt = `define "${text} in 20 words."`;
  const res = await model.generateContent(prompt);
  return res.response.text();
}
async function explain(text) {
  if (text.length < 1) {
    return {
      error: {
        err_msg: "Select a word with atleast one letter.",
      },
    };
  }
  const prompt = `explain "${text}" in detail (40-50 words)(if you don't find any context explain in any context you like)`;
  const res = await model.generateContent(prompt);
  return res.response.text();
}
async function summarise(text) {
  if (text.length < 1) {
    return {
      error: {
        err_msg: "Select a word with atleast one letter.",
      },
    };
  }
  if (text.split(" ").length < 80) {
    return explain(text);
  }
  const prompt = `summarise "${text} in 50 words."`;
  const res = await model.generateContent(prompt);
  return res.response.text();
}
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post("/translate", async function (req, res) {
  try {
    const { text, language } = req.body;
    console.log(text, language);
    const translation = await translate(text, language);
    if (translation.error) {
      return res.json(translation);
    }
    return res.json({
      text,
      translation,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      error: {
        err_msg: "Something went wrong!",
      },
    });
  }
});
app.post("/define", async function (req, res) {
  try {
    const { text } = req.body;
    const definition = await define(text);
    if (definition.error) {
      return res.json(definition);
    }
    return res.json({
      text,
      definition,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      error: {
        err_msg: "Something went wrong!",
      },
    });
  }
});
app.post("/explain", async function (req, res) {
  try {
    const { text } = req.body;
    const explanation = await explain(text);
    if (explanation.error) {
      return res.json(explanation);
    }
    return res.json({
      text,
      explanation,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      error: {
        err_msg: "Something went wrong!",
      },
    });
  }
});
app.post("/summarise", async function (req, res) {
  try {
    const { text } = req.body;
    const summary = await summarise(text);
    if (summary.error) {
      return res.json(summary);
    }
    return res.json({
      text,
      summary,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      error: {
        err_msg: "Something went wrong!",
      },
    });
  }
});
app.listen(3000, () => console.log("Listening at 3000"));
