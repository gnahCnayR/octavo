import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // get the assistantMessages from the request body
    const { assistantMessages } = await req.json();

    const body = {
        messages: [
            {
                role: "user",
                content: `
                You are an AI assistant that summarizes multiple expert responses into a clear and helpful synthesis, framed around real-world experience.

                You will be given a list of assistant messages, all answering the same user question.

                Here is the list of responses:
                ${assistantMessages.map((msg: any) => `- ${msg.content}`).join('\n')}

                Your output must be a **JSON object** with two fields:

                1. **"synthesis"** — a short paragraph (~120–180 words) that combines the core ideas from the responses into a natural, human-centered summary. Start this paragraph with a phrase like:
                - “Based on real experiences from people like you...”
                - “Drawing from what many others have shared...”

                Focus on clarity, practical value, and making the user feel like they're not alone in their concerns.

                2. **"insights"** — a list of exactly 3 bullet points that capture the most important or actionable takeaways from the assistant responses. Use friendly but concise language.

                ---

                ### Example Input:

                json:
                {
                    "responses": [
                        {
                        "content": "Cryptocurrency trading has some strong security features... [etc]"
                        },
                        {
                        "content": "Cryptocurrency trading can be secure, but it really depends... [etc]"
                        },
                        {
                        "content": "Cryptocurrency trading can be secure, but it depends a lot on how you approach it... [etc]"
                        }
                    ]
                }

                ### Example Output Format (strictly JSON format with no extra text):
                {
                    "synthesis": "Based on real experiences from people like you, cryptocurrency trading can be secure if done carefully. While the underlying blockchain technology is built with strong cryptography and is generally secure, the main risks come from human choices — such as using untrustworthy exchanges, falling for scams, or not protecting your wallet. To trade safely, many people recommend enabling two-factor authentication, avoiding unknown platforms, and using hardware wallets to store larger amounts. It’s also important to stay updated on common scams and never share your private keys. Crypto doesn’t come with built-in protections like banks do, so your vigilance matters most.",
                    "insights": [
                        "Use reputable exchanges and always enable two-factor authentication.",
                        "Protect your private keys and use a hardware wallet for large holdings.",
                        "The technology is secure — but human error and scams are the biggest threats."
                    ]
                }


                Your final response must be only the raw JSON object — **no introduction, explanation, or formatting before or after**.

                `
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
    const res = data.choices[0].message.content;
    return NextResponse.json({ data: res }, { status: response.status });
}