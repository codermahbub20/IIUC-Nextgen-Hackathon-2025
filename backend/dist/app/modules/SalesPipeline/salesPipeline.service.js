"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesPipelineService = void 0;
const salesPipeline_model_1 = require("./salesPipeline.model");
const createSalesPipeline = (salesPipelineData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield salesPipeline_model_1.SalesPipeline.create(salesPipelineData);
    return result;
});
const getAllSalesPipelines = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield salesPipeline_model_1.SalesPipeline.find().exec();
    return result;
});
const updateSalesPipeline = (pipelineId, salesPipelineData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield salesPipeline_model_1.SalesPipeline.findByIdAndUpdate(pipelineId, salesPipelineData, { new: true }).exec();
    return result;
});
const deleteSalesPipeline = (pipelineId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield salesPipeline_model_1.SalesPipeline.findByIdAndDelete(pipelineId).exec();
    return result;
});
exports.SalesPipelineService = {
    createSalesPipeline,
    getAllSalesPipelines,
    updateSalesPipeline,
    deleteSalesPipeline
};
