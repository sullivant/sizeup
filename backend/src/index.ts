export interface Env {
  AI: Ai;
}


const allowedOrigins = [
  'http://localhost:5173',
  'https://sizeup.sullivanscientific.com',
];


function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}


export default {
  async fetch(request, env): Promise<Response> {
	let prompt :string = "";


	const origin = request.headers.get('Origin');
	const corsHeaders = getCorsHeaders(origin);

	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers: corsHeaders,
		});
	}



	if (request.method === 'POST') {
		try {
			// Parse the JSON body
			const requestBody :any = await request.json();

			// Access a specific field, e.g., 'name'
			prompt = requestBody.prompt;

		} catch (error) {
			return new Response('Invalid JSON body', { status: 400, headers: corsHeaders });
		}
	} else {
		return new Response('Only POST requests are supported', { status: 405, headers: corsHeaders });
	}

	if (prompt === undefined) {
		return new Response('Invalid Prompt', {status: 400, headers: corsHeaders });
	}

	console.log("Prompt is:"+prompt);

	// This will be a better TTS version of a model once a good one is released.
    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      prompt: JSON.stringify({ prompt }),
    });

    return new Response(JSON.stringify(response), {headers: corsHeaders});
  },
} satisfies ExportedHandler<Env>;
