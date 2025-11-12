"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const emplyee_controller_1 = require("./emplyee.controller");
const upload_1 = require("../../middlewares/upload");
const router = express_1.default.Router();
router.post('/', upload_1.upload.single("profilePic"), emplyee_controller_1.EmployeeController.createEmplyee);
router.get('/', emplyee_controller_1.EmployeeController.getAllEmployees);
router.patch('/:id', upload_1.upload.single("profilePic"), emplyee_controller_1.EmployeeController.updateEmployee);
router.delete('/:id', emplyee_controller_1.EmployeeController.deleteEmployee);
exports.employeeRoutes = router;
