import moment from "moment";

import { Exercises } from "../models/exercises.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const exercises = asyncHandler(async (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params._id;

  if ([userId, description, duration].some((field) => field?.trim() === "")) {
    res.status(400).json(new ApiError(404, "Please add required Fields!"));
  }

  const userFound = await User.findById(userId);

  if (!userFound) {
    res.status(400).json(new ApiError(500, "User Id is incorrect!"));
  }

  const exercisesObj = await Exercises.create({
    userId: userId,
    description: description,
    duration: duration,
    date: date === "" ? moment() : date,
  });

  const createdExercise = await Exercises.findById(exercisesObj._id);

  if (!createdExercise) {
    res.status(400).json(new ApiError(500, "Something went wrong while creating exercise!"));
  }

  return res.status(201).json(new ApiResponse(200, createdExercise, "Exercise created Successfully!"));
});

export { exercises };
