import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `explain the given prompt like i'm a toddler in brief, not more than 200 words, give simple analogy for the same if applicable (important: wrap headings in <h2> tag and text in <p> tag). Next I want you to give me a json code for a 5 question quiz (with 4 options and correct answer) wrapped inside  like this "••• {json code} ••• "

    Topic —> ${req.body.text}
    
    `,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
  });
  res.status(200).json({ result: completion.data });
}