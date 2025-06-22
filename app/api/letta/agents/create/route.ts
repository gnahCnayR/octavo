import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const response = await fetch('https://api.letta.com/v1/agents/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LETTA_API_KEY}`
        },
        body: JSON.stringify({ name }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}