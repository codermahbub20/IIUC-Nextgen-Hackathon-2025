import { Types } from "mongoose";
import { TCareerTrack } from "../User/user.interface";

export type TCost = "Free" | "Paid";

export interface TLearningResource {
  _id?: Types.ObjectId;
  title: string;
  platform: string;
  url: string;
  relatedSkills: string[];
  cost: TCost;

  description?: string;
  duration?: string;
  careerTrack?: TCareerTrack;
}
