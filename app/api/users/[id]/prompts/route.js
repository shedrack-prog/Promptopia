import Prompt from '@models/Prompt';
import User from '@models/User';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ username: params.id });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found with the username' })
      );
    }
    const prompts = await Prompt.find({ creator: user._id }).populate(
      'creator'
    );

    return new Response(JSON.stringify({ prompts, success: true }));
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500,
      success: false,
    });
  }
};
