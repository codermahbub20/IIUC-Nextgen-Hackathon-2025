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
exports.clientController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const client_service_1 = require("./client.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_ts_1 = require("http-status-ts");
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const createClient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientData = req.body;
    // ✅ Check and upload profile image if available
    if (req.file) {
        const buffer = req.file.buffer;
        const result = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({ folder: 'clients' }, // 👈 Save in 'clients' folder in Cloudinary
            (error, result) => {
                if (result)
                    resolve(result);
                else
                    reject(error);
            });
            stream.end(buffer);
        });
        // ✅ Save Cloudinary image URL in the client data
        clientData.profilePic = result.secure_url;
    }
    // ✅ Save client data in DB
    const result = yield client_service_1.ClientService.createClientInToDB(clientData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Client created successfully',
        data: result,
    });
}));
const getAllClients = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_service_1.ClientService.getAllClientsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Clients fetched successfully',
        data: result,
    });
}));
const updateClient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.id;
    const updateData = req.body;
    // ✅ If a new profile image is uploaded, upload it to Cloudinary
    if (req.file) {
        const buffer = req.file.buffer;
        const result = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({ folder: 'clients' }, (error, result) => {
                if (result)
                    resolve(result);
                else
                    reject(error);
            });
            stream.end(buffer);
        });
        // ✅ Save the Cloudinary image URL in updateData
        updateData.profilePic = result.secure_url;
    }
    const result = yield client_service_1.ClientService.updateClientInDb(clientId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Client updated successfully',
        data: result,
    });
}));
const deleteClient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.id;
    const result = yield client_service_1.ClientService.deleteClientFromDb(clientId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Client deleted successfully',
        data: result,
    });
}));
exports.clientController = {
    createClient,
    getAllClients,
    updateClient,
    deleteClient
};
