'use client'

import supabase from "./supabase"

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin,
        },
    })

    if (error) {
        console.error(`Login error: ${error}`)
        return
    }
}

export const signOutWithGoogle = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error(`Login error: ${error}`)
        return
    }

    window.location.reload()
}

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user)
    return user
}

export const getAllImages = async () => {
    //get User -> get All Images of the user -> return an array of images
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.error('No user is signed in')
            return
        }

        const res = await fetch(`/api/images/table?user=${user.id}`)

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.images
    }
    catch (e) {
        console.error(e)
    }
}

export const addImageToSupabaseBucket = async (image: File) => {
    //add image to bucket -> return image path

    try {

        if (!image) {
            console.error('No image provided')
            return
        }

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.error('No user is signed in')
            return
        }

        const formData = new FormData()
        formData.append('image', image)

        const res = await fetch(`/api/images/bucket?user=${user.id}`, {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const addImageToSupabaseTable = async (image: File) => {
    //add image to bucket -> add image to table -> return image

    try {
        if (!image) {
            console.error('No image provided')
            return
        }

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.error('No user is signed in')
            return
        }

        const PublicURL = await addImageToSupabaseBucket(image)

        if (!PublicURL) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch(`/api/images/table?user=${user.id}`, {
            method: 'POST',
            body: JSON.stringify({ image_path: PublicURL })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data
    }
    catch (e) {
        console.error(e)
    }
}

export const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url)
    const blob = await res.blob()
    const mime = blob.type || 'image/*'
    return new File([blob], filename, { type: mime })
}

export const uploadImageToCloudinary = async (image: File) => {
    //upload image -> return public_id
    console.log('I am here: ', image)

    try {

        if (!image) {
            console.error('No image provided')
            return
        }

        const formData = new FormData()
        formData.append('image', image)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.public_id
    }
    catch (e) {
        console.error(e)
    }
}

export const cropImage = async (image: File, ratio = "0.5") => {
    //uploadImageToCloudinary() -> crop image -> addImageToSupabase()

    try {
        if (!image) {
            console.error('No image provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/crop', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
                ratio
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const genFillImage = async (image: File, ratio = "2.5") => {
    //uploadImageToCloudinary() -> gen fill image -> addImageToSupabase()

    try {
        if (!image) {
            console.error('No image provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/gen_fill', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
                ratio
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const enhanceImage = async (image: File) => {
    //uploadImageToCloudinary() -> enhance image -> addImageToSupabase()

    try {
        if (!image) {
            console.error('No image provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/enhance', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const removeBackgroundImage = async (image: File) => {
    //uploadImageToCloudinary() -> remove bg -> addImageToSupabase()

    try {
        if (!image) {
            console.error('No image provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/remove_bg', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const replaceBackgroundImage = async (image: File, prompt = 'Rainforest') => {
    //uploadImageToCloudinary() -> replace bg -> addImageToSupabase()

    try {
        if (!image || !prompt) {
            console.error('No image or prompt provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/replace_bg', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
                prompt
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const removeObjectImage = async (image: File, prompt = 'Head') => {
    //uploadImageToCloudinary() -> remove obj -> addImageToSupabase()

    try {
        if (!image || !prompt) {
            console.error('No image or prompt provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/remove_obj', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
                prompt
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}

export const replaceObjectImage = async (image: File, prompt_from: string, prompt_to: string) => {
    //uploadImageToCloudinary() -> replace obj -> addImageToSupabase()

    try {
        if (!image || !prompt_from) {
            console.error('No image or prompt provided')
            return
        }

        const PublicID = await uploadImageToCloudinary(image)

        if (!PublicID) {
            console.error('Error Uploading image')
            return
        }

        const res = await fetch('/api/services/replace_obj', {
            method: 'POST',
            body: JSON.stringify({
                public_id: PublicID,
                prompt_from, prompt_to
            })
        })

        const data = await res.json()

        if (!data.success) {
            console.error(data.error)
            return
        }

        console.log(data)
        return data.data.url
    }
    catch (e) {
        console.error(e)
    }
}