"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true,
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
    },
    clientEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    profilePic: { type: String }
});
exports.Client = (0, mongoose_1.model)('Client', clientSchema);
