"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesPipeline = void 0;
const mongoose_1 = require("mongoose");
const salesPipelineSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    contactName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0,
    },
    stage: {
        type: String,
        enum: ['lead', 'proposal', 'negotiation', 'closed-won', 'closed-lost'],
        default: 'lead',
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: true,
    },
    probability: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    expectedCloseDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
        trim: true,
    },
    notes: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt automatically
});
exports.SalesPipeline = (0, mongoose_1.model)('SalesPipeline', salesPipelineSchema);
