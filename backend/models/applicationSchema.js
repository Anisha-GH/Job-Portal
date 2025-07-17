import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name!"],
      minLength: [3, "Name must contain at least 3 Characters!"],
      maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please provide a cover letter!"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your Phone Number!"],
      validate: {
        validator: function (value) {
          return /^[0-9]{10,15}$/.test(value); // basic number validation
        },
        message: "Please enter a valid phone number!",
      },
    },
    address: {
      type: String,
      required: [true, "Please enter your Address!"],
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    jobID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicantID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Job Seeker"],
        required: true,
      },
    },
    employerID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Employer"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ email: 1, jobID: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
