"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = __importDefault(require("./Controllers"));
const validators_1 = require("./validators");
const GetAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.post("/signin", validators_1.signinValidation, Controllers_1.default.signin);
    router.post("/login", validators_1.loginValidation, Controllers_1.default.login);
    return router;
};
exports.default = GetAuthRouter;
