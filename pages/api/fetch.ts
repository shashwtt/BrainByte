import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `1) Explain the given topic for a kid to understand (important: Make use of <h3> and <p> tags, and within 200 words). 
      2) Next step, Generate a json quiz of some questions (important: make sure it has 4 options and one of them is correct answer). Wrap json code (example: {"quiz": [{"ques": "", "ans": "", "options": []}]} ) within three tilde symbols:  ~~~  ~~~
      
      Topic — "${text}"`,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
      max_tokens: 1500,
    });

    const generatedText = completion.data.choices[0].text;
    console.log(generatedText);
    res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
