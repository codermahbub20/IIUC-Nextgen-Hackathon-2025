
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LearningResourceServices } from "./learningResource.service";

const createLearningResource = catchAsync(async (req:Request, res:Response) => {
    const { ...payload } = req.body;
    const result = await LearningResourceServices.createLearningResource(payload);  
    sendResponse(res, {
        statusCode: 201,
        success: true,  
        message: "Learning resource created successfully",
        data: result,
    });
});

const getAllLearningResources = catchAsync(async (req:Request, res:Response) => {
    const result = await LearningResourceServices.getAllLearningResources();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Learning resources retrieved successfully",
        data: result,
    });
});
const getSingleLearningResource = catchAsync(async (req:Request, res:Response) => {
    const { id } = req.params;
    const result = await LearningResourceServices.getSingleLearningResource(id);        
    sendResponse(res, { 
        statusCode: 200,    
        success: true,
        message: "Learning resource retrieved successfully",
        data: result,
    });
});
const updateLearningResource = catchAsync(async (req:Request, res:Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    const result = await LearningResourceServices.updateLearningResource(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Learning resource updated successfully",
        data: result,
    });
});
const deleteLearningResource = catchAsync(async (req:Request, res:Response) => {
    const { id } = req.params;
    const result = await LearningResourceServices.deleteLearningResource(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Learning resource deleted successfully",
        data: result,
    });
}); 

export const LearningResourceController = {
    createLearningResource,
    getAllLearningResources,        
    getSingleLearningResource,
    updateLearningResource,
    deleteLearningResource,
};