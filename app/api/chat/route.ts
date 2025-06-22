import { streamText } from 'ai';
import { lettaCloud } from '@letta-ai/vercel-ai-sdk-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, agentId } = await req.json();
        console.log('Chat API called with agentId:', agentId);
        console.log('Messages count:', messages?.length || 0);

        if (!agentId) {
            throw new Error('Missing agentId');
        }

        // Get the last user message
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== 'user') {
            throw new Error('No user message found');
        }

        console.log('Starting stream with Letta agent:', agentId);
        console.log('User message:', lastMessage.content);

        // Use the correct Letta API pattern for streaming
        const result = streamText({
            model: lettaCloud(agentId),
            messages: [
                {
                    role: 'user',
                    content: lastMessage.content
                }
            ],
        });

        console.log('Stream created successfully');
        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error in chat API:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} 