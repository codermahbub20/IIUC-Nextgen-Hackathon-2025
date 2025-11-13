/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';




export type TExperienceLevel =
  | "Fresher"
  | "Junior (0-2 years)"
  | "Mid-Level (2-5 years)"
  | "Senior (5+ years)";

export type TCareerTrack =
  | "Web Development"
  | "Mobile Development"
  | "Data Science & Analytics"
  | "UI/UX Design"
  | "Graphic Design"
  | "Digital Marketing"
  | "Content Creation"
  | "Business Development"
  | "Project Management"
  | "HR & Recruitment"
  | "Finance & Accounting"
  | "Customer Support"
  | "Sales"
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
export type TUserRole = keyof typeof USER_ROLE;



