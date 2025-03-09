import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";
import { PostForm } from "~/app/_components/postForm";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen bg-gradient-to-b from-[#f6c492] to-[#f6b092] text-white">
        <div className="container flex flex-col items-center justify-between px-4">
          <div className={"flex flex-col items-center"}>
            <Image
              src={"/logo.png"}
              alt={"platepals"}
              width={"150"}
              height={"150"}
            />
            <LatestPost />
          </div>
          <PostForm />
        </div>
      </main>
    </HydrateClient>
  );
}
