import cloudinary from "@/app/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export const config = {
    runtime: 'nodejs'
}

export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData()
        const image = formData.get('image') as File

        if (!image) {
            return NextResponse.json({ success: false, error: 'No Image provided' }, { status: 400 })
        }

        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const res = await new Promise<{ secure_url: string, public_id: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                use_filename: true,
                resource_type: 'auto',
            },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result as { secure_url: string, public_id: string })
                }
            ).end(buffer)
        })

        return NextResponse.json({ success: true, url: res.secure_url, public_id: res.public_id })

    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}