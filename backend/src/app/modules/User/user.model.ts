
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    educationLevel: {
      type: String,
      required: [true, 'Education level is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    experienceLevel: {
      type: String,
      enum: ['Fresher', 'Junior', 'Mid', 'Senior'],
      required: [true, 'Experience level is required'],
    },
    preferredCareerTrack: {
      type: String,
      enum: [
        'Web Development',
        'Data',
        'Design',
        'Marketing',
        'Cybersecurity',
        'AI/ML',
        'Mobile App',
        'Other',
      ],
      required: [true, 'Preferred career track is required'],
    },
    profilePic: {
      type: String,
      default: '/assets/default-avatar.png',
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceDescription: {
      type: String,
      trim: true,
    },
    careerInterests: {
      type: String,
      trim: true,
    },
    cvText: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// 🔐 Remove password after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// ✅ Static methods
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserBlocked = async function (
  userEmail: string,
): Promise<TUser | null> {
  return await this.findOne({ email: userEmail, isBlocked: true });
};

userSchema.statics.isUserExistByEmail = async function (
  email: string,
): Promise<TUser | null> {
  return await this.findOne({ email }).select('+password') as TUser | null;
};

export const User = model<TUser, UserModel>('User', userSchema);
