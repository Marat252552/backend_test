"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_1 = require("../../database/queries");
const checkUserAccess = (req, res, next) => {
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
        if (status === "ADMIN" && TokenPayload.role !== "ADMIN")
            return res
                .status(403)
                .json({ message: "У вашей учетной записи нет прав на это действие" })
                .end();
        res.locals.TokenPayload = TokenPayload;
        next();
    }
    catch (e) {
        console.log(e);
        res.sendStatus(403).end();
    }
};
exports.default = checkAccessToken;
