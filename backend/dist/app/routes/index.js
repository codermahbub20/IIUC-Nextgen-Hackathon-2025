"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const client_route_1 = require("../modules/Client/client.route");
const task_route_1 = require("../modules/TaskManagement/task.route");
const emplyee_route_1 = require("../modules/Employee/emplyee.route");
const salesPipeline_route_1 = require("../modules/SalesPipeline/salesPipeline.route");
// import { chatRoutes } from '../modules/Chat/chat.route';
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/clients',
        route: client_route_1.clientRoutes,
    },
    {
        path: '/tasks',
        route: task_route_1.taskRoutes,
    },
    {
        path: '/employees',
        route: emplyee_route_1.employeeRoutes,
    },
    {
        path: '/sales-pipeline',
        route: salesPipeline_route_1.salesPipelineRoutes,
    },
    // {
    //   path: '/',
    //   route: chatRoutes
    // }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
