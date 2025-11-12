"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", 'waiting-for-review', "completed", "stuck"],
        default: "pending",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    subTasks: [
        {
            title: { type: String, required: true },
            isCompleted: { type: Boolean, default: false },
        },
    ],
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Employee",
        required: [true, "Assigned to is required"],
    },
    clientName: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
        required: [true, "Client name is required"],
    },
    comments: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
}, {
    timestamps: true, // optional but useful
});
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
