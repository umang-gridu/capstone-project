import mongoose, { Schema } from "mongoose";

const exercisesSchema = new Schema({
  duration: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Exercises = mongoose.model("Exercises", exercisesSchema);
