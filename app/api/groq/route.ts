import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // get the agentList and query from the request body
    const { agentList, query } = await req.json();

    const body = {
        messages: [
            {
                role: "user",
                content: `You are an AI assistant that helps determine which agents should be used to accomplish a task, and whether new agents should be created.

                Here is a list of agents currently available:
                ${agentList}    

                For the following task:
                ${query}

                You will respond with a JSON array of agent objects to use or create. Each object must be of the following format:

                {
                    "name": <NAME_OF_THE_AGENT>,
                    "id": <ALPHANUMERICAL_AGENT_ID>,
                    "exists": true | false
                }

                If the task is not well supported by existing agents, propose new agents with \`"exists": false\` and make sure \`"id"\` is a suggested lowercase, alphanumeric, dash-separated string (you can generate it from the name).

                ---

                ### EXAMPLES

                #### Available agents:
                [
                { "name": "SEO Analyzer", "id": "seo-analyzer" },
                { "name": "Email Responder", "id": "email-responder" }
                ]

                #### Task:
                Analyze this website's metadata and suggest SEO improvements.

                #### Response:
                [
                {
                    "name": "SEO Analyzer",
                    "id": "seo-analyzer",
                    "exists": true
                }
                ]

                ---

                #### Task:
                Write personalized birthday emails to our customers based on their purchase history.

                #### Response:
                [
                {
                    "name": "Email Responder",
                    "id": "email-responder",
                    "exists": true
                },
                {
                    "name": "Purchase-Based Personalizer",
                    "id": "purchase-based-personalizer",
                    "exists": false
                }
                ]

                ---

                #### Task:
                Generate short social media video scripts for TikTok targeting Gen Z fashion trends.

                #### Response:
                [
                {
                    "name": "Gen Z TikTok Script Generator",
                    "id": "gen-z-tiktok-script-generator",
                    "exists": false
                }
                ]

                ---

                Now, respond ONLY in the JSON array format for the task above.
                .`
            }
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY!}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    const res = JSON.parse(data.choices[0].message.content);
    return NextResponse.json({ data: res }, { status: response.status });
}