import Prompt from '@models/Prompt';
import { connectToDB } from '@utils/database';

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify({ newPrompt, success: true }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error, success: false }), {
      status: 500,
    });
  }
};
