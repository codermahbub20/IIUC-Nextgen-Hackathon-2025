"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emplyee = void 0;
const mongoose_1 = require("mongoose");
const emplyeeSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: {
        type: String,
        enum: [
            "HR",
            "Engineering",
            "Sales",
            "Marketing",
            "Finance",
            "Operations",
            "IT",
            "Customer Support"
        ],
        required: true
    },
    profilePic: { type: String }
}, { timestamps: true });
exports.Emplyee = (0, mongoose_1.model)('emplyee', emplyeeSchema);
