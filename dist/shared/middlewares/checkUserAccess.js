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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_1 = require("../../database/queries");
const checkUserAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let AccessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!AccessToken)
            return res.sendStatus(403).end();
        jsonwebtoken_1.default.verify(AccessToken, process.env.JWT_ACCESS_KEY);
        let TokenPayload = jsonwebtoken_1.default.decode(AccessToken);
        const exists = yield (0, queries_1.doesUserExist)(TokenPayload.email);
        if (!exists)
            return res.sendStatus(401).json({ message: "Пользователь не найден" });
        res.locals.TokenPayload = TokenPayload;
        next();
    }
    catch (e) {
        console.log(e);
        res.sendStatus(403).end();
    }
});
exports.default = checkUserAccess;
