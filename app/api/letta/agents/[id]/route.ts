import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id:agentId } = await params;
    const { query } = await req.json();

    const response = await fetch(`https://api.letta.com/v1/agents/${agentId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LETTA_API_KEY!}`,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            text: query,
                            type: 'text',
                        },
                    ],
                },
            ],
        }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}