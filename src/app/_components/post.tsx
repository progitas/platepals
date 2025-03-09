"use client";

import { FormEvent, useState } from "react";

import { api } from "~/trpc/react";
import Image from "next/image";
import { uploadImage } from "~/supabase/image-service";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

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
    <div className="w-full max-w-xs">
      <p className="truncate">Your most recent post: {latestPost?.name}</p>
      {latestPost && (
        <div
          className={
            "flex max-w-xs flex-col gap-4 rounded-xl bg-white/30 p-4 hover:bg-white/40"
          }
        >
          <div>
            <p className={"text-xl font-bold text-[#f08080]"}>
              {latestPost.name}
            </p>
            {latestPost.imageUrl && (
              <Image
                src={latestPost.imageUrl}
                width={"100"}
                height={"100"}
                alt={"image"}
              ></Image>
            )}
          </div>
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="file"
          onChange={(event) =>
            setSelectedFile(event.target.files ? event.target.files[0] : null)
          }
        />
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
