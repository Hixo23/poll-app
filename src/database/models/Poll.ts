import { Schema, Document, models, model } from "mongoose";

interface PollOption {
  id: string; // This should be a string, not a number
}

interface Poll extends Document {
  title: string;
  options: PollOption[];
  userName: string;
  id: string;
}

const pollOptionSchema = new Schema<TOption>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  votes: { type: Number, required: true },
});

const pollSchema = new Schema<Poll>({
  title: { type: String, required: true },
  options: [pollOptionSchema],
  userName: { type: String, required: true },
  id: { type: String, required: true },
});

export const PollModel = models.Polls ?? model("Polls", pollSchema);

export { PollModel as PollSchema };
