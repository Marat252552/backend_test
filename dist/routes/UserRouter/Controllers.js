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
const helpers_1 = require("./utils/helpers");
const controllerWrapper_1 = __importDefault(require("../../shared/controllerWrapper"));
const responses_1 = require("../../shared/responses");
class Controllers {
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, controllerWrapper_1.default)(res, () => __awaiter(this, void 0, void 0, function* () {
                const { user_id } = res.locals.TokenPayload;
                const { image_name } = res.locals;
                const { email, fullname, name, sex } = req.body;
                const options = { email, fullname, name, sex };
                const user = yield (0, queries_1.updateUserById)(user_id, (0, helpers_1.clearEmptyQueries)(Object.assign(Object.assign({}, options), { image_name })));
                (0, responses_1.created)(res, "Пользователь успешно обновлен", { user });
            }));
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, controllerWrapper_1.default)(res, () => __awaiter(this, void 0, void 0, function* () {
                const { user_id } = res.locals.TokenPayload;
                const user = yield (0, queries_1.getUserById)(user_id);
                let image_url;
                if (user.image_name) {
                    image_url =
                        req.protocol + "://" + req.get("host") + "/" + user.image_name;
                }
                (0, responses_1.success)(res, {
                    user: Object.assign(Object.assign({}, user), { image_url }),
                });
            }));
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, controllerWrapper_1.default)(res, () => __awaiter(this, void 0, void 0, function* () {
                const { page = 1 } = req.query;
                const users = yield (0, queries_1.getUsers)({ offset: (page - 1) * 10 });
                (0, responses_1.success)(res, { users });
            }));
        });
    }
}
exports.default = new Controllers();
