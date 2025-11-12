/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { HttpStatus } from "http-status-ts";
import cloudinary from "../../lib/cloudinary";
import catchAsync from "../../utils/catchAsync";

// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserInToDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// Get all users
const getAllUsers: RequestHandler = catchAsync(async (req:Request, res:Response) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

// Get single user
const getSingleUser: RequestHandler = catchAsync(async (req:Request, res:Response) => {
  const { userId } = req.params;
  if (!userId) {
    return sendResponse(res, {
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return sendResponse(res, {
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      message: "User ID is required",
      data: null,
    });
  }

  const updateData = req.body ;

  // 🔹 Handle profile picture upload if file exists
  if (req.file) {
    const buffer = req.file.buffer;

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profiles" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.end(buffer);
    });

    updateData.profilePic = result.secure_url; // save cloudinary image URL
  }

  const updatedUser = await UserServices.updateUserInDB(userId, updateData);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Delete user
const deleteUser: RequestHandler = catchAsync(async (req:Request, res:Response) => {
  const { userId } = req.params;
   if (!userId) {
    return sendResponse(res, {
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  await UserServices.deleteUserFromDB(userId);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: {},
  });
});

// Block user
const blockUserByAdmin: RequestHandler = catchAsync(async (req:Request, res:Response) => {
  const { userId } = req.params;
   if (!userId) {
    return sendResponse(res, {
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  const result = await UserServices.blockUserByAdminFromDB(userId);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

// Unblock user
const unblockUserByAdmin: RequestHandler = catchAsync(async (req:Request, res:Response) => {

  const { userId } = req.params;
   if (!userId) {
    return sendResponse(res, {
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  const result = await UserServices.unblockUserByAdminFromDB(userId);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User unblocked successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  blockUserByAdmin,
  unblockUserByAdmin,
};
