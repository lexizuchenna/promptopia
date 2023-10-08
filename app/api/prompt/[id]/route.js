import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id);

    if (!prompt) return new Response("Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const isPrompt = await Prompt.findById(params.id);

    if (!isPrompt) return new Response("Not Found", { status: 404 });

    isPrompt.prompt = prompt;
    isPrompt.tag = tag;

    await Prompt.findByIdAndUpdate(params.id, { ...isPrompt });

    return new Response(JSON.stringify(isPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const isPrompt = await Prompt.findById(params.id);

    if (!isPrompt) return new Response("Not Found", { status: 404 });

    await Prompt.findByIdAndDelete(params.id)


    return new Response("Prompt Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
