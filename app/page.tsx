'use client'

import { useState } from "react";

export default function Home() {

  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files?.[0]; // Get the File object, not the value
    if (file) {
      setImage(file);
    }
  }

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(image)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          image: base64
        })
      })

      const data = await res.json()

      if (data.success) {
        console.log('Upload Successful data:', data)
      }
      else {
        console.error('Upload failed:', data.error);
        alert('Upload failed: ' + data.error);
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="flex justify-center items-center flex-col pb-12">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>upload</button>
    </main>
  );
}
