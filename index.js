require('dotenv').config();

const openAI = require('openai');
const { Configuration, OpenAIApi } = openAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// open ai api key and organization config
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(config);


app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are developed by tushar. Pretend to be a personal tutor name Deep. give answer as teacher teach her students.
      : ${message}?`,
      max_tokens: 500,
      temperature: 0.5,
    });
    console.log(response.data);
    if(response.data.choices[0].text){
      res.json({message: response.data.choices[0].text});
    }
});


app.listen(PORT, () => {
  console.log(`post is running on port http://localhost:${PORT}`);
});

//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