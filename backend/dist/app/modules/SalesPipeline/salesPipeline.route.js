"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesPipelineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const salesPipeline_controller_1 = require("./salesPipeline.controller");
const router = express_1.default.Router();
router.post('/', salesPipeline_controller_1.SalesPipelineController.createSalesPipeline);
router.get('/', salesPipeline_controller_1.SalesPipelineController.getAllSalesPipelines);
router.patch('/:pipelineId', salesPipeline_controller_1.SalesPipelineController.updateSalesPipeline);
router.delete('/:pipelineId', salesPipeline_controller_1.SalesPipelineController.deleteSalesPipeline);
exports.salesPipelineRoutes = router;
