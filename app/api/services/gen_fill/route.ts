import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { public_id, ratio } = await req.json()

    if (!public_id || !ratio) {
        return NextResponse.json({ success: false, error: 'Missing public_id or ratio' }, { status: 400 })
    }

    try {
        const res = cloudinary.url(public_id, {
            transformation: [
                { aspect_ratio: ratio, background: "gen_fill", crop: "pad" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        })

        return NextResponse.json({ success: true, data: { url: res } })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}