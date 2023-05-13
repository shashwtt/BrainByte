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
  const { text } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `explain the given prompt like i'm very dumb (max: 300 words, min: 100 words), use headings and paragraphs to display info (important: wrap headings in <h3> tag and text in <p> tag). Next I want you to give me a json code for a 5 question quiz (with 4 options and correct answer, do not generate any titles for json) wrapped inside like this "••• {json code} ••• "

      Topic —> ${text}

      `,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1500,
    });

    const generatedText = completion.data.choices[0].text;
    res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
