import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { public_id } = await req.json()

    if (!public_id) {
        return NextResponse.json({ success: false, error: 'Missing public_id' }, { status: 400 })
    }

    try {
        const res = cloudinary.url(public_id, {effect: "gen_restore"})

        return NextResponse.json({ success: true, data: { url: res } })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}