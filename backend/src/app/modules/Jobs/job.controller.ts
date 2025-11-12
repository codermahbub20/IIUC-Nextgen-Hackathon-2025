import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HttpStatus } from "http-status-ts";
import { JobServices } from "./job.service";

// Create Job's
const createJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobServices.createJobInToDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Job created successfully",
    data: result,
  });
});

// Get all Jobs
const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await JobServices.getAllJobsFromDB();
    sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Jobs fetched successfully",
    data: result,
  });
});

// Get single Job
const getSingleJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const result = await JobServices.getSingleJobFromDB(jobId);
    sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Job fetched successfully",
    data: result,
  });
});
// Update Job
const updateJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const result = await JobServices.updateJobInDB(jobId, req.body);
    sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Job updated successfully",
    data: result,
  });
});
// Delete Job
const deleteJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const result = await JobServices.deleteJobFromDB(jobId);
    sendResponse(res, {
    statusCode: HttpStatus.OK,  
    success: true,
    message: "Job deleted successfully",
    data: result,
  });
});
export const JobController = {  
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
};