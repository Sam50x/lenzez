import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/lib/supabase";

export async function GET(req: NextRequest) {
    try {

        const userID = req.nextUrl.searchParams.get('user')

        if (!userID) {
            throw new Error('No user is signed in')
        }

        const { data: images, error } = await supabase
            .from('images')
            .select('*')
            .eq('user_id', userID)

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 400 })
        }

        return NextResponse.json({ success: true, images }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const userID = req.nextUrl.searchParams.get('user')

        if (!userID) {
            throw new Error('No user is signed in')
        }

        const { image_path } = await req.json()

        const { data: image, error } = await supabase
            .from('images')
            .insert([{ image_path, user_id: userID }])
            .select()
            .single()

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 400 })
        }

        return NextResponse.json({ success: true, image }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 500 })
    }

}