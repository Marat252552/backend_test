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
exports.loginValidation = exports.signinValidation = void 0;
const queries_1 = require("../../database/queries");
const controllerWrapper_1 = __importDefault(require("../../shared/controllerWrapper"));
const bcrypt_1 = require("bcrypt");
const responses_1 = require("../../shared/responses");
const isEmailFormat = (str) => {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
};
const checkPassword = (str) => {
    var re = /^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-ß])(?=.*\d)(?=.*[!@#$])[a-zà-ÿA-ZÀ-ß\d!@#$]{8,12}$/gm;
    return re.test(str);
};
const signinValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, controllerWrapper_1.default)(res, () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, name } = req.body;
        if (!email || !password || !name)
            return (0, responses_1.badRequest)(res, "Заполнены не все поля");
        const isEmailTaken = yield (0, queries_1.doesUserExist)(email);
        if (isEmailTaken)
            return (0, responses_1.badRequest)(res, "Почта уже зарегистрирована");
        if (!isEmailFormat(email) && email !== "admin")
            return (0, responses_1.badRequest)(res, "Неверный формат почты");
        if (!checkPassword(password) || password.length < 5)
            return (0, responses_1.badRequest)(res, "Пароль должен быть минимум 5 символов, содержать минимум 1 заглавный символ, 1 специальный символ и 1 цифру. Все в латинице ");
        res.locals = Object.assign(Object.assign({}, res.locals), { email, password, name });
        next();
    }));
});
exports.signinValidation = signinValidation;
const loginValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, controllerWrapper_1.default)(res, () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password)
            return (0, responses_1.badRequest)(res, "Заполнены не все поля");
        if (!isEmailFormat(email) && email !== "admin")
            return (0, responses_1.badRequest)(res, "Неверный формат почты");
        const isEmailTaken = yield (0, queries_1.doesUserExist)(email);
        if (!isEmailTaken)
            return (0, responses_1.badRequest)(res, "Пользователь с указанной почтой не зарегистрирован");
        const user = yield (0, queries_1.getUserByEmail)(email);
        const isPasswordValid = (0, bcrypt_1.compareSync)(password, user.password);
        if (!isPasswordValid)
            return (0, responses_1.badRequest)(res, "Неверный пароль");
        res.locals.user = user;
        next();
    }));
});
exports.loginValidation = loginValidation;
