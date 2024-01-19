import { Exercises } from "../models/exercises.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { commonMessage } from "../utils/commonMessages.js";
import convertDate from "../utils/convertDate.js";

const logs = asyncHandler(async (req, res) => {
  const userId = req.params._id;
  const { limit = 0, from, to } = req.query;

  const userFound = await User.find({
    _id: { $eq: userId },
  }).catch(() => {
    res.status(400).json(new ApiError(500, commonMessage.userIdIncorrect));
  });

  if (userFound.length === 0) res.status(400).json(new ApiError(500, commonMessage.userIdIncorrect));

  let query = { userId: userId };
  if (from && to) {
    query = {
      ...query,
      date: {
        $gte: convertDate(from),
        $lte: convertDate(to),
      },
    };
  } else if (from) {
    query = {
      ...query,
      date: {
        $gte: convertDate(from),
      },
    };
  } else if (to) {
    query = {
      ...query,
      date: {
        $lte: convertDate(to),
      },
    };
  }

  const exercises = await Exercises.find(query).sort({ date: 1 }).limit(limit);
  const exercisesCount = await Exercises.find(query).count();

  if (exercises.length === 0) {
    res.status(400).json(new ApiError(500, commonMessage.noExercises));
  }

  res.status(201).json(
    new ApiResponse(
      200,
      {
        logs: exercises,
        count: exercisesCount,
      },
      commonMessage.exercisesFetched
    )
  );
});

export { logs };
