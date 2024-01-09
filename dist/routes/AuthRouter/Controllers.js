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
const queries_1 = require("../../database/queries");
const bcrypt_1 = require("bcrypt");
const controllerWrapper_1 = __importDefault(require("../../shared/controllerWrapper"));
const helpers_1 = require("./utils/helpers");
const responses_1 = require("../../shared/responses");
class Controllers {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, controllerWrapper_1.default)(res, () => __awaiter(this, void 0, void 0, function* () {
                const { email, password, name } = res.locals;
                const role = email === "admin" ? "ADMIN" : "USER";
                const hashedPassword = (0, bcrypt_1.hashSync)(password, 5);
                const user = yield (0, queries_1.addUser)({
                    email,
                    password: hashedPassword,
                    name,
                    role,
                });
                const { AccessToken, RefreshToken } = (0, helpers_1.generateTokens)({
                    email,
                    user_id: user.id.toString(),
                    role,
                });
                const response = {
                    message: "Пользователь успешно зарегистрирован",
                    AccessToken,
                };
                (0, responses_1.successWithCookie)(res, RefreshToken, response);
            }));
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, controllerWrapper_1.default)(res, () => __awaiter(this, void 0, void 0, function* () {
                const { id, email, role } = res.locals.user;
                const { AccessToken, RefreshToken } = (0, helpers_1.generateTokens)({
                    email,
                    user_id: id.toString(),
                    role,
                });
                const response = {
                    message: "Вход выполнен успешно",
                    AccessToken,
                };
                (0, responses_1.successWithCookie)(res, RefreshToken, response);
            }));
        });
    }
}
exports.default = new Controllers();
