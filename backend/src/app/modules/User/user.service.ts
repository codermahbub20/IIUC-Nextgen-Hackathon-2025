import { TUser } from "./user.interface";
import { User } from "./user.model";



// Create user
const createUserInToDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  return await User.find().select('-password').exec();
    
};


// Get single user
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).select('-password').exec();
  return result;
};

// Update user
const updateUserInDB = async (userId: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true })
    .select('-password')
    .exec();
  return result;
};

// Delete user
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id).select('-password').exec();
  return result;
};

// Block user by admin
const blockUserByAdminFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  )
    .select('-password')
    .exec();
  return result;
};

// Unblock user by admin
const unblockUserByAdminFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true },
  )
    .select('-password')
    .exec();
  return result;
};

export const UserServices = {
  createUserInToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  blockUserByAdminFromDB,
  unblockUserByAdminFromDB,
};
