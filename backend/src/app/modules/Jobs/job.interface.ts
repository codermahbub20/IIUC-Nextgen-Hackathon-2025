import { Types } from "mongoose";
import { TCareerTrack, TExperienceLevel } from "../User/user.interface";

export type TJobType = "Internship" | "Part-time" | "Full-time" | "Freelance";

export interface TJob {
  _id?: Types.ObjectId;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  experienceLevel: TExperienceLevel;
  jobType: TJobType;

  description?: string;
  applyLink?: string;
  careerTrack?: TCareerTrack;
  postedAt?: Date;
}
