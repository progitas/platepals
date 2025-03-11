"use client";
import Add from "@mui/icons-material/Add";

import { FormEvent, useState } from "react";

import { api } from "~/trpc/react";
import { uploadImage } from "~/supabase/image-service";
import { Dialog } from "@mui/material";

export function PostForm() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [openModal, setOpenModal] = useState(false);

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      setOpenModal(false);
      setSelectedFile(null);
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
    <div className="flex w-full max-w-xs flex-col items-center py-2">
      <button
        onClick={() => setOpenModal(true)}
        className="opacity my-3 flex items-center rounded-xl bg-white/40 px-4 py-3 transition hover:bg-white/30"
      >
        <Add />
      </button>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="relative z-10"
        >
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div>
              <p className={"px-2 py-2 text-lg font-bold text-[#f08080]"}>
                Lag ny post
              </p>
              <form
                onSubmit={submit}
                className="flex flex-col items-center gap-2 p-4"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 p-2"
                />
                <input
                  className={
                    "w-full rounded-xl border-2 border-gray-200 p-2 px-4 text-black"
                  }
                  type="file"
                  onChange={(event) =>
                    setSelectedFile(
                      event.target.files ? event.target.files[0] : null,
                    )
                  }
                />
                <button
                  type="submit"
                  className="w-20 rounded-xl bg-[#f08080]/50 py-2 font-semibold transition hover:bg-[#f08080]/30"
                  disabled={createPost.isPending}
                >
                  {createPost.isPending ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
