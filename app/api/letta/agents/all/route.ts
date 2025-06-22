import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const response = await fetch('https://api.letta.com/v1/agents/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.LETTA_API_KEY!}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    const cleanedData = data.filter((agent: any) => agent.name.startsWith("daniel-")).map((agent: any) => {
        return {
            id: agent.id,
            name: agent.name,
        }
    })
    return NextResponse.json({ data: cleanedData }, { status: response.status });
}