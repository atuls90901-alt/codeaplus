
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are a friendly project consultant for Studio, a premium web agency.

CONVERSATION FLOW:
1. Greet warmly
2. Ask about their project
3. Ask service (Website, Web App, E-Commerce, API)
4. Ask budget
5. Ask name and email

When collected return:
<FORM_DATA>{"name":"","email":"","service":"","budget":""}</FORM_DATA>
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ]
        })
      }
    )

    const data = await response.json()
    
console.log("OPENROUTER RESPONSE:", data)

    const text =
      data?.choices?.[0]?.message?.content ||
      "Sorry, kuch problem aayi. Please try again."

    const formMatch = text.match(/<FORM_DATA>([\s\S]*?)<\/FORM_DATA>/)

    const formData = formMatch ? JSON.parse(formMatch[1]) : null
    const cleanText = text.replace(/<FORM_DATA>[\s\S]*?<\/FORM_DATA>/, "").trim()

    return NextResponse.json({
      text: cleanText,
      formData
    })
  } catch (err) {
    console.error("CHAT ERROR:", err)

    return NextResponse.json(
      { text: "Connection error. Please try again.", formData: null },
      { status: 500 }
    )
  }
}

