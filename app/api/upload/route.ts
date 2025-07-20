import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { image } = await req.json()

    try {
        const res = await cloudinary.uploader
            .upload(image, {
                use_filename: true
            })

        return NextResponse.json({ success: true, url: res.secure_url, public_id: res.public_id })

    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}