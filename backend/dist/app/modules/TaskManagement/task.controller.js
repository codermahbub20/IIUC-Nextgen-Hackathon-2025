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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const task_service_1 = require("./task.service");
const emplyee_model_1 = require("../Employee/emplyee.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
// 🔹 Reusable function to send email notifications
const sendEmailNotification = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const mailOptions = {
        from: `"Task Management System" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: htmlContent,
    };
    yield transporter.sendMail(mailOptions);
});
// 🔸 Create Task
const createTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_service_1.TaskService.createTaskIntoDB(req.body);
    const assignedEmployee = yield emplyee_model_1.Emplyee.findById(req.body.assignedTo);
    if (assignedEmployee && assignedEmployee.email) {
        try {
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>📋 New Task Assigned</h2>
          <p>Hello <strong>${assignedEmployee.fullName || "Employee"}</strong>,</p>
          <p>You have been assigned a new task in the Task Management System:</p>
          <table style="border-collapse: collapse;">
            <tr><td><b>Title:</b></td><td>${req.body.title}</td></tr>
            <tr><td><b>Description:</b></td><td>${req.body.description || "No description provided"}</td></tr>
            <tr><td><b>Priority:</b></td><td>${req.body.priority}</td></tr>
            <tr><td><b>Due Date:</b></td><td>${req.body.dueDate || "Not specified"}</td></tr>
          </table>
          <br/>
          <p>Please log in to your dashboard for more details.</p>
          <p>Regards,<br/><strong>Task Management System</strong></p>
        </div>
      `;
            yield sendEmailNotification(assignedEmployee.email, `📝 New Task Assigned: ${req.body.title}`, htmlContent);
            console.log(`✅ Email sent to ${assignedEmployee.email}`);
        }
        catch (error) {
            console.error("❌ Failed to send email notification:", error);
        }
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: "Task created successfully",
        data: result,
    });
}));
// 🔸 Get All Tasks
const getAllTasks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_service_1.TaskService.getAllTasksFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: "Tasks fetched successfully",
        data: result,
    });
}));
// 🔸 Update Task (with email notification)
const updateTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const result = yield task_service_1.TaskService.updatedTaskInDb(taskId, req.body);
    // If update returned no result, respond with 404 before accessing fields
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.NOT_FOUND,
            success: false,
            message: "Task not found",
            data: null,
        });
    }
    // Find the employee assigned to this task
    const assignedEmployee = yield emplyee_model_1.Emplyee.findById(result.assignedTo);
    if (assignedEmployee && assignedEmployee.email) {
        try {
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>🔔 Task Updated Notification</h2>
          <p>Hello <strong>${assignedEmployee.fullName || "Employee"}</strong>,</p>
          <p>The following task has been updated:</p>
          <table style="border-collapse: collapse;">
            <tr><td><b>Title:</b></td><td>${result.title}</td></tr>
            <tr><td><b>Description:</b></td><td>${result.description || "No description provided"}</td></tr>
            <tr><td><b>Priority:</b></td><td>${result.priority}</td></tr>
            <tr><td><b>Status:</b></td><td>${result.status}</td></tr>
            <tr><td><b>Due Date:</b></td><td>${result.dueDate || "Not specified"}</td></tr>
          </table>
          <br/>
          <p>Please log in to your dashboard to review the updated task.</p>
          <p>Regards,<br/><strong>Task Management System</strong></p>
        </div>
      `;
            yield sendEmailNotification(assignedEmployee.email, `🔄 Task Updated: ${result.title}`, htmlContent);
            console.log(`✅ Update email sent to ${assignedEmployee.email}`);
        }
        catch (error) {
            console.error("❌ Failed to send update email:", error);
        }
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: "Task updated successfully",
        data: result,
    });
}));
// 🔸 Delete Task
const deleteTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const result = yield task_service_1.TaskService.deleteTaskFromDb(taskId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: "Task deleted successfully",
        data: result,
    });
}));
exports.taskController = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
