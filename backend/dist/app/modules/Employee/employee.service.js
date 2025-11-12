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
exports.EmployeeService = void 0;
const emplyee_model_1 = require("./emplyee.model");
const createEmployeeIntoDb = (employeeData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emplyee_model_1.Emplyee.create(employeeData);
    return result;
});
const getAllEmployeesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emplyee_model_1.Emplyee.find().exec();
    return result;
});
const updateEmployeeInDb = (employeeId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emplyee_model_1.Emplyee.findByIdAndUpdate(employeeId, updateData, { new: true }).exec();
    return result;
});
const deleteEmployeeFromDb = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emplyee_model_1.Emplyee.findByIdAndDelete(employeeId).exec();
    return result;
});
exports.EmployeeService = {
    createEmployeeIntoDb,
    getAllEmployeesFromDb,
    updateEmployeeInDb,
    deleteEmployeeFromDb
};
