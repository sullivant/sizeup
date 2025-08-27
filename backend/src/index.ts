export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {
	let prompt :string = "";

	if (request.method === 'POST') {
		try {
			// Parse the JSON body
			const requestBody :any = await request.json();

			// Access a specific field, e.g., 'name'
			prompt = requestBody.prompt;

		} catch (error) {
			return new Response('Invalid JSON body', { status: 400 });
		}
	} else {
		return new Response('Only POST requests are supported', { status: 405 });
	}

	if (prompt === undefined) {
		return new Response('Invalid Prompt', {status: 400 });
	}

	console.log("Prompt is:"+prompt);

    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      prompt: JSON.stringify({ prompt }),//"What is the origin of the phrase Hello, World",
    });

    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
