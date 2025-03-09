
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#f6b092] to-[#f6c492] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Image
            src={"/logo.png"}
            alt={"platepals"}
            width={"300"}
            height={"200"}
          />
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
