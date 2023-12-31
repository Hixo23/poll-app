"use client";

import { LuSubtitles, LuVote } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { ContextMenu } from "@radix-ui/themes";
import { deletePoll } from "@/utils/deletePoll";
import Link from "next/link";

export const PollSummary = ({
  id,
  options,
  title,
}: {
  id: string;
  title: string;
  options: TOption[];
}) => {
  const router = useRouter();

  const sumOfVotes: number = options.reduce(
    (total, item) => total + item.votes,
    0,
  );

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="bg-neutral-800">
        <div className="mx-auto  flex min-w-full items-center justify-between  rounded-xl bg-neutral-800 p-4 text-text md:min-w-[40rem]">
          <p
            className="flex
      items-center justify-center gap-2 text-center font-bold"
          >
            <LuSubtitles /> <span>{title}</span>
          </p>
          <p
            className="flex
      items-center gap-2 font-bold"
          >
            <LuVote /> <span>{sumOfVotes}</span>
          </p>
          <Link
            href={`/pollresults/${id}`}
            className="rounded-xl bg-primary px-4 py-2 text-center font-semibold shadow-primary drop-shadow-2xl "
          >
            Results
          </Link>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item onSelect={async () => await deletePoll(id)}>
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
