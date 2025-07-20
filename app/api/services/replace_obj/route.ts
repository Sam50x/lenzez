import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { public_id, prompt_from, prompt_to } = await req.json()

    if (!public_id || !prompt_from) {
        return NextResponse.json({ success: false, error: 'Missing public_id or prompt' }, { status: 400 })
    }

    try {
        const res = cloudinary.url(public_id, { effect: `gen_replace:from_the ${prompt_from};to_a ${prompt_to}` })

        return NextResponse.json({ success: true, data: { url: res } })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}