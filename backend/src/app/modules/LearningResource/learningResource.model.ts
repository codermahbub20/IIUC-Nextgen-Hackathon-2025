import { Schema, model } from "mongoose";
import { TCost, TLearningResource } from "./leraningResource.interface";


const learningResourceSchema = new Schema<TLearningResource>(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    relatedSkills: {
      type: [String],
      required: [true, "Related skills are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one related skill is required",
      },
    },
    cost: {
      type: String,
      required: [true, "Cost is required"],
      enum: ["Free", "Paid"] as TCost[],
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
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
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const LearningResource = model<TLearningResource>(
  "LearningResource",
  learningResourceSchema
);
