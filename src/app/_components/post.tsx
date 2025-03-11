"use client";

import { FormEvent, useState } from "react";

import { api } from "~/trpc/react";
import Image from "next/image";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  return (
    <div className="w-full max-w-xs">
      <p className="truncate">Your most recent post: {latestPost?.name}</p>
      {latestPost && (
        <div
          className={
            "mb-2 flex h-[200px] w-[320px] max-w-xs flex-col gap-4 rounded-xl bg-white/30 p-4 hover:bg-white/40"
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
    </div>
  );
}
