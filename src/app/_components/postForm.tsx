"use client";

import { FormEvent, useState } from "react";

import { api } from "~/trpc/react";
import { uploadImage } from "~/supabase/image-service";

export function PostForm() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    let url;
    if (selectedFile) {
      url = await uploadImage(selectedFile);
    }
    createPost.mutate({ name: name, imageUrl: url ?? undefined });
  };

  return (
    <div className="w-full max-w-xs py-2">
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          className={
            "rounded-full bg-white/20 px-10 py-3 font-semibold transition hover:bg-white/30"
          }
          type="file"
          onChange={(event) =>
            setSelectedFile(event.target.files ? event.target.files[0] : null)
          }
        />
        {/*Bruk "environmen for å åpne kamerarull direkte. Kanskje bruke kun den om ein er på mobil?*/}
        {/*<input accept="image/*" id="icon-button-file" type="file" capture="environment"/>*/}
        <button
          type="submit"
          className="rounded-full bg-white/20 px-10 py-3 font-semibold transition hover:bg-white/30"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
