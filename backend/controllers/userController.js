import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Log request body

    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      console.warn("Incomplete form data");
      return next(new ErrorHandler("Please fill full form!", 400));
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      console.warn("Email already registered:", email);
      return next(new ErrorHandler("Email already registered!", 400));
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });

    console.log("New user created:", user.email);

    // sendToken handles cookie and response
    sendToken(user, 201, res, "User Registered!");

  } catch (error) {
    console.error("Error in register controller:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});


export const login = catchAsyncErrors(async (req, res, next) => {
  console.log("Login Request:", req.body);
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    console.log("Missing fields");
    return next(new ErrorHandler("Please provide email ,password and role."));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    console.log("User not found");
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("Password mismatch");
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }

  console.log("Login success");
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});