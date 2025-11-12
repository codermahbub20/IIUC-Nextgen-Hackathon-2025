import { TJob } from "./job.interface";
import { Job } from "./job.model";

const createJobInToDB = async (payload: TJob) => {
  const result = await Job.create(payload);
  return result;
};

const getAllJobsFromDB = async () => {
  return await Job.find().exec();
};

// Get single job
const getSingleJobFromDB = async (id: string) => {
  const result = await Job.findById(id).exec();
  return result;
}
;   
// Update job
const updateJobInDB = async (jobId: string, payload: Partial<TJob>) => {
  const result = await Job.findByIdAndUpdate(jobId, payload, { new: true }).exec();
  return result;
}
;
// Delete job
const deleteJobFromDB = async (id: string) => {
  const result = await Job.findByIdAndDelete(id).exec();
  return result;
};
export const JobServices = {
  createJobInToDB,
  getAllJobsFromDB,
    getSingleJobFromDB,
    updateJobInDB,
    deleteJobFromDB,
};