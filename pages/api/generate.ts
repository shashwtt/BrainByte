import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const key = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.body;

  try {
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `1) Explain the given topic in brief for a kid to understand (important: Make use of <h3> and <p> tags, and within 200 words). 
	//   2) Next step, Generate a json quiz of some questions (important: make sure it has 4 options & answer). Wrap json code (example: {"quiz": [{"ques": "", "ans": "", "options": []}]} ) within three tilde symbols:  ~~~  ~~~
	  
	//   Topic — "${text}"`,
    //   temperature: 0.7,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0.5,
    //   max_tokens: 1500,
    // });

    // const generatedText = completion.data.choices[0].text;
    res.status(200).json({ result: key });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
