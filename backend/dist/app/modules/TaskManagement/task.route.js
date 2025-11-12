"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task.controller");
const router = express_1.default.Router();
router.post('/', task_controller_1.taskController.createTask);
router.get('/', task_controller_1.taskController.getAllTasks);
router.patch('/:taskId', task_controller_1.taskController.updateTask);
router.delete('/:taskId', task_controller_1.taskController.deleteTask);
exports.taskRoutes = router;
