'use server';

import {cookies} from "next/headers";
import {
    convertToAiSdkMessage,
    lettaCloud,
    loadDefaultProject,
    loadDefaultTemplate
} from "@letta-ai/vercel-ai-sdk-provider";
import {Chat} from "@/app/Chat";

async function getAgentId() {
    const cookie = await cookies()
    const activeAgentId = cookie.get('active-agent');

    if (activeAgentId) {
        return activeAgentId.value
    }

    // Use the specific agent you created
    const defaultAgentId = "agent-e32c23f9-0123-4efc-b322-1c04970f18a8";
    console.log('Using default agent:', defaultAgentId);
    
    return defaultAgentId;
}

async function getExistingMessages(agentId: string) {
    try {
        console.log('Fetching messages for agent:', agentId);
        const messages = await lettaCloud.client.agents.messages.list(agentId);
        console.log('Found messages:', messages?.length || 0);
        
        // Convert Letta messages to AI SDK format
        const convertedMessages = convertToAiSdkMessage(messages, {
            allowMessageTypes: ['user_message', 'assistant_message']
        });
        
        console.log('Converted messages:', convertedMessages?.length || 0);
        return convertedMessages;
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
}

async function saveAgentIdCookie(agentId: string) {
    'use server'
    const cookie = await cookies();
    await cookie.set('active-agent', agentId, {path: '/'});
}

export default async function ChatPage() {
    const agentId = await getAgentId();
    const existingMessages = await getExistingMessages(agentId);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">AI Agent Chat</h1>
                    <p className="text-muted-foreground">Chat with your persistent Letta AI agent</p>
                    <p className="text-sm text-muted-foreground mt-2">Agent ID: {agentId}</p>
                    <p className="text-sm text-muted-foreground">Project: octavo</p>
                </div>
                <Chat existingMessages={existingMessages} saveAgentIdCookie={saveAgentIdCookie} agentId={agentId}/>
            </div>
        </div>
    );
} 