import { z } from 'zod';

// Allowed enums (must match interface)
const experienceLevels = ['Fresher', 'Junior', 'Mid', 'Senior'] as const;
const careerTracks = [
  'Web Development',
  'Data',
  'Design',
  'Marketing',
  'Cybersecurity',
  'AI/ML',
  'Mobile App',
  'Other',
] as const;
const userRoles = ['admin', 'user'] as const;

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string().nonempty({ message: 'Full name is required' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' }),

    educationLevel: z
      .string()
      .nonempty({ message: 'Education level is required' }),
    department: z.string().nonempty({ message: 'Department is required' }),
    experienceLevel: z.enum(experienceLevels, {
      message: 'Invalid experience level',
    }),
    preferredCareerTrack: z.enum(careerTracks, {
      message: 'Invalid career track',
    }),

    profilePic: z.string().url().optional(),
    skills: z.array(z.string()).optional(),
    experienceDescription: z.string().optional(),
    careerInterests: z.string().optional(),
    cvText: z.string().optional(),

    role: z.enum(userRoles).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .optional(),

    educationLevel: z.string().optional(),
    department: z.string().optional(),
    experienceLevel: z.enum(experienceLevels).optional(),
    preferredCareerTrack: z.enum(careerTracks).optional(),

    profilePic: z.string().url().optional(),
    skills: z.array(z.string()).optional(),
    experienceDescription: z.string().optional(),
    careerInterests: z.string().optional(),
    cvText: z.string().optional(),

    role: z.enum(userRoles).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
