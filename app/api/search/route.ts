import { streamText } from 'ai';
import { lettaCloud } from '@letta-ai/vercel-ai-sdk-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        console.log('Search API called with query:', query);

        if (!query) {
            throw new Error('Missing query');
        }

        // Use the specific agent you created - "daniel-default-agent"
        const agentId = "agent-e32c23f9-0123-4efc-b322-1c04970f18a8";
        
        // Use the correct Letta API pattern for streaming
        const result = streamText({
            model: lettaCloud(agentId),
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
        });

        console.log('Stream created successfully');
        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error in search API:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} 