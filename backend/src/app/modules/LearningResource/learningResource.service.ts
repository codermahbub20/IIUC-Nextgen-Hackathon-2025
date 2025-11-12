import { LearningResource } from "./learningResource.model";
import { TLearningResource } from "./leraningResource.interface";

const createLearningResource = async (payload:TLearningResource) => {
    const result = await LearningResource.create(payload);
    return result;
};

const getAllLearningResources = async () => {
    return await LearningResource.find().exec();
};

// Get single learning resource
const getSingleLearningResource = async (id: string) => {
    const result = await LearningResource.findById(id).exec();
    return result;
};

// Update learning resource
const updateLearningResource = async (resourceId: string, payload: Partial<TLearningResource>) => {
    const result = await LearningResource.findByIdAndUpdate(resourceId, payload, { new: true }).exec();
    return result;
};
// Delete learning resource
const deleteLearningResource = async (id: string) => {
    const result = await LearningResource.findByIdAndDelete(id).exec();
    return result;
};
export const LearningResourceServices = {
    createLearningResource,
    getAllLearningResources,
    getSingleLearningResource,
    updateLearningResource,
    deleteLearningResource,
};