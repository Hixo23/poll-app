import { connectToDataBase } from "@/database/connect";
import { PollSchema } from "@/database/models/Poll";
import { TPoll } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await connectToDataBase();
  const { searchParams } = new URL(request.url);

  const pollId = searchParams.get("pollId");
  const optionId = searchParams.get("optionId");

  console.log(pollId, optionId);

  const poll = await PollSchema.findOne({ id: pollId });

  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }

  const optionIndex = poll.options.findIndex(
    (opt: TPoll) => opt.id.toString() === optionId,
  );

  if (optionIndex === -1) {
    return NextResponse.json({ error: "Option not found" }, { status: 404 });
  }

  poll.options[optionIndex].votes += 1;

  poll.markModified("options");

  await poll.save();

  console.log("Saved changes:", poll);

  return NextResponse.json({ poll, msg: "Success" }, { status: 200 });
};