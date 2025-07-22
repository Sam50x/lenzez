import { NextRequest, NextResponse } from "next/server"
import supabase from "@/app/lib/supabase"

export async function POST(req: NextRequest) {
    try {
        const userID = req.nextUrl.searchParams.get('user')

        if (!userID) {
            return NextResponse.json({ success: false, error: "No user is signed in" }, { status: 400 })
        }

        const formData = await req.formData()
        const image = formData.get('image') as File

        if (!image) {
            return NextResponse.json({ success: false, error: 'No Image provided' }, { status: 400 })
        }

        const imageName = `${Date.now()}-${image.name}`;

        const { data, error } = await supabase.storage
            .from("imagesbucket")
            .upload(imageName, image, { cacheControl: "3600", upsert: true })

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 400 })
        } 

        const { data: PublicURL } = supabase.storage.from("imagesbucket").getPublicUrl(data.path)

        return NextResponse.json({ success: true, url: PublicURL.publicUrl }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }

}