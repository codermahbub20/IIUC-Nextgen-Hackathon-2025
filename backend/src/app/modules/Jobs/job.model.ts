import { Schema, model } from "mongoose";
import { TJob } from "./job.interface";

const jobSchema = new Schema<TJob>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required skills are mandatory"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one skill is required",
      },
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      enum: ["Fresher", "Junior", "Mid", "Senior"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Internship", "Part-time", "Full-time", "Freelance"],
    },
    description: {
      type: String,
      trim: true,
    },
    applyLink: {
      type: String,
      trim: true,
    },
    careerTrack: {
      type: String,
      enum: [
        "Web Development",
        "Data",
        "Design",
        "Marketing",
        "Cybersecurity",
        "AI/ML",
        "Mobile App",
        "Other",
      ],
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

export const Job = model<TJob>("Job", jobSchema);
