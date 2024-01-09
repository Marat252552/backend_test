"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = __importDefault(require("./Controllers"));
const validators_1 = require("./validators");
const checkUserAccess_1 = __importDefault(require("../../shared/middlewares/checkUserAccess"));
const checkAdminAccess_1 = __importDefault(require("../../shared/middlewares/checkAdminAccess"));
const GetUserRouter = () => {
    const router = (0, express_1.Router)();
    router.put("/profile", checkUserAccess_1.default, validators_1.updateUserValidation, Controllers_1.default.updateUser);
    router.get("/profile", checkUserAccess_1.default, Controllers_1.default.getUser);
    router.get("/profiles", checkAdminAccess_1.default, Controllers_1.default.getUsers);
    return router;
};
exports.default = GetUserRouter;
