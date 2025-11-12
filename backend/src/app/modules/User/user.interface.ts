/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';




export type TExperienceLevel = "Fresher" | "Junior" | "Mid" | "Senior";
export type TCareerTrack =
  | "Web Development"
  | "Data"
  | "Design"
  | "Marketing"
  | "Cybersecurity"
  | "AI/ML"
  | "Mobile App"
  | "Other";

export interface TUser {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  educationLevel: string;
  department: string;
  experienceLevel: TExperienceLevel;
  preferredCareerTrack: TCareerTrack;

  profilePic?: string;
  skills?: string[];
  experienceDescription?: string;
  careerInterests?: string;
  cvText?: string;

  role?: "user" | "admin";
  isBlocked?: boolean;
}


export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isUserBlocked(userEmail: string): Promise<TUser | null>;

  isUserExistByEmail(email: string): Promise<TUser | null>;
}




