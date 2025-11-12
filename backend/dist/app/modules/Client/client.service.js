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
exports.ClientService = void 0;
const client_model_1 = require("./client.model");
const createClientInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.create(payload);
    return result;
});
const getAllClientsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.find().exec();
    return result;
});
const updateClientInDb = (clientId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findByIdAndUpdate(clientId, updateData, { new: true }).exec();
    return result;
});
const deleteClientFromDb = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findByIdAndDelete(clientId).exec();
    return result;
});
exports.ClientService = {
    createClientInToDB,
    getAllClientsFromDB,
    updateClientInDb,
    deleteClientFromDb
};
