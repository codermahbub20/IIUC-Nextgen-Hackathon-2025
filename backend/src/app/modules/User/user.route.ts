import express from 'express';
import { UserController } from './user.controller';
import { upload } from '../../middlewares/upload';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';



const router = express.Router();



// Get all users (admin only)
router.get('/',  UserController.getAllUsers);

// Get single user (admin only)
router.get('/:userId',  UserController.getSingleUser);

// // Update user (admin only)
router.patch('/:userId', validateRequest(UserValidation.updateUserValidationSchema), upload.single("profilePic"), UserController.updateUser);

// // Delete user (admin only)
// router.delete('/:userId', auth('admin'), UserController.deleteUser);


export const userRoutes = router;
