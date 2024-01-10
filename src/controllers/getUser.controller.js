import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    res.status(404).json(new ApiError(404, "Users not found!"));
  }

  return res.status(201).json(new ApiResponse(200, users, "Users fetched Successfully!"));
});

export { getUser };
