"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (payload) => {
    let AccessKey = process.env.JWT_ACCESS_KEY;
    let RefreshKey = process.env.JWT_REFRESH_KEY;
    let AccessToken = jsonwebtoken_1.default.sign(payload, AccessKey, { expiresIn: "30m" });
    let RefreshToken = jsonwebtoken_1.default.sign(payload, RefreshKey, { expiresIn: "30d" });
    return { AccessToken, RefreshToken };
};
exports.generateTokens = generateTokens;
