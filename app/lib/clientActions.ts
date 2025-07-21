'use client'

import supabase from "./supabase"

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })

    if (error) {
        console.error(`Login error: ${error}`)
        throw error
    }
}

export const signOutWithGoogle = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error(`Login error: ${error}`)
        throw error
    }
}

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user)
}