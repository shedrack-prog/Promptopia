import Prompt from '@models/Prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    return new Response(JSON.stringify({ prompt, success: true }));
  } catch (error) {
    return new Response('Failed to fetch prompt', {
      status: 500,
      success: false,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    if (!prompt || !tag) {
      return new Response({ message: 'Please provide values', status: 400 });
    }
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response({ message: 'Prompt not found', status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(
      JSON.stringify({ existingPrompt, success: true, status: 200 })
    );
  } catch (error) {
    return new Response({ message: 'Failed to update Prompt', status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findByIdAndRemove(params.id);

    if (!existingPrompt) {
      return new Response({
        message: 'Prompt not found',
        status: 404,
      });
    }
    return new Response({
      message: 'Prompt deleted successfully',
      status: 200,
    });
  } catch (error) {
    return new Response({ message: 'Failed to delete Prompt', status: 500 });
  }
};
