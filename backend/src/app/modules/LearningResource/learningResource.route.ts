import express from "express";
import { LearningResourceController } from "./learningResourece.controller";


const router = express.Router();

router.post("/", LearningResourceController.createLearningResource);
router.get("/", LearningResourceController.getAllLearningResources);
router.get("/:id", LearningResourceController.getSingleLearningResource);
router.patch("/:id", LearningResourceController.updateLearningResource);
router.delete("/:id", LearningResourceController.deleteLearningResource);

export const LearningResourceRoutes = router;