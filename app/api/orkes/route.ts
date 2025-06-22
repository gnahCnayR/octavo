import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        // all agents from Letta atm
        const agentsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/letta/agents/all`);
        if (!agentsRes.ok) throw new Error('Failed to fetch agents');
        const agentList = await agentsRes.json();

        // search engine query
        const groqRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/groq`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, agentList }),
        });
        if (!groqRes.ok) throw new Error('Failed to select agent(s)');
        const useAgentList = await groqRes.json();

        // agents set up in Letta
        const newAgents = useAgentList.data.filter((agent: any) => agent.exists === false);
        const selectedAgents = useAgentList.data.filter((agent: any) => agent.exists === true);
        if (newAgents && newAgents.length > 0) {
            for (const agent of newAgents) {
                console.log(`Creating new agent: ${JSON.stringify(agent, null, 2)}`);
                const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/letta/agents/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: agent.name.replace(/ /g, '-').toLowerCase() }),
                });
                if (!createRes.ok) throw new Error('Failed to create new agents');
                const createdAgent = await createRes.json();
                // Ensure createdAgent has the same structure as other agents (especially an 'id' property)
                if (createdAgent && createdAgent.id) {
                    selectedAgents.push(createdAgent);
                } else {
                    throw new Error('Created agent does not have a valid id');
                }
            }
        }
        
        // send the query to all selected agents in parallel
        const agentData = await Promise.all(
            selectedAgents.map(async (agent : any) => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/letta/agents/${agent.id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query }),
                    });
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    return data.messages.filter((msg: any) => msg.message_type === "assistant_message");
                } catch (error) {
                    console.error(`Error fetching from agent ${agent.id}:`, error);
                    return null; // or handle error as needed
                }
            })
        );
        const flattenedAgentData = agentData.flat().filter((msg: any) => msg !== null);

        // synthetic response
        const syntheticResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/groq/synthesize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assistantMessages: flattenedAgentData }),
        });
        const synthesizedResponse = await syntheticResponse.json();
        return NextResponse.json({ responses: synthesizedResponse }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
    }
}