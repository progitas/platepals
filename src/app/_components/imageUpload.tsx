"use client"

import { useState } from 'react';
import { uploadImage } from "~/supabase/image-service";
import { api } from "~/trpc/react";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const upload =  api.post.uploadImage.useMutation()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedFile)
    const formData = new FormData();
    formData.append('file', selectedFile);

    const imageUrl = await uploadImage(selectedFile!)

    console.log(imageUrl)
    upload.mutate({ imageUrl:imageUrl!, postId:1 } )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}