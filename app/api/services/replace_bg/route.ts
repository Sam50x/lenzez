import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { public_id, prompt } = await req.json()

    if (!public_id || !prompt) {
        return NextResponse.json({ success: false, error: 'Missing public_id or prompt' }, { status: 400 })
    }

    try {
        const res = cloudinary.url(public_id, {
        transformation: [
            { effect: "background_removal" },
            { effect: `gen_background_replace:prompt_a ${prompt}` }
        ]
    })

        return NextResponse.json({ success: true, data: { url: res } })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}