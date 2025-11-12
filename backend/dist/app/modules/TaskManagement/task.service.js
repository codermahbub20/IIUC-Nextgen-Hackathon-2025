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
exports.TaskService = void 0;
const task_model_1 = require("./task.model");
const createTaskIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.create(payload);
    return result;
});
const getAllTasksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.find().exec();
    return result;
});
const updatedTaskInDb = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findByIdAndUpdate(taskId, payload, { new: true }).exec();
    return result;
});
const deleteTaskFromDb = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findByIdAndDelete(taskId).exec();
    return result;
});
exports.TaskService = {
    createTaskIntoDB,
    getAllTasksFromDB,
    updatedTaskInDb,
    deleteTaskFromDb
};
