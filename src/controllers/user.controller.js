import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const user = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (username.trim() === "") {
    res.status(400).json(new ApiError(400, "Username is required!"));
  }

  const existedUser = await User.findOne({
    $or: [{ username }],
  });

  if (existedUser) {
    res.status(408).json(new ApiError(408, "Username already exists!"));
  }

  const userObj = await User.create({
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(userObj._id);

  if (!createdUser) {
    res.status(500).json(new ApiError(500, "Something went wrong while creating user!"));
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User created Successfully!"));
});

export { user };
