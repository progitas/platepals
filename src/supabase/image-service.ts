import { supabase } from "~/supabase/supabase";

export async function uploadImage(file: File) {
  const uniqueName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("post-images")
    .upload(`public/${uniqueName}`, file);
  if (error) {
    console.error("Upload failed", error);
    return null;
  }
  return data.path;
}

export async function createSignedUrl(url: string) {
  const { data } = await supabase.storage
    .from("post-images")
    .createSignedUrl(url, 3600);
  return data?.signedUrl;
}
