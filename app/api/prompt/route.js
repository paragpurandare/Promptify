import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
	try {
		await connectToDB();
		const prompts = await Prompt.find({})
			.populate("creator")
			.sort({ createdAt: -1 });

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
export const SEARCH = async (request) => {
	try {
		await connectToDB();
		const prompts = await Prompt.find({})
			.populate("creator")
			.sort({ createdAt: -1 });

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
