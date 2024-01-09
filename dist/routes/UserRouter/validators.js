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
exports.updateUserValidation = void 0;
const controllerWrapper_1 = __importDefault(require("../../shared/controllerWrapper"));
const getPathToOperativeFolder_1 = __importDefault(require("./utils/getPathToOperativeFolder"));
const uuid_1 = require("uuid");
const responses_1 = require("../../shared/responses");
const helpers_1 = __importDefault(require("./utils/helpers"));
const TEN_MEGABYTES = 10000000;
const updateUserValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, controllerWrapper_1.default)(res, () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { email, fullname, name, sex } = req.body;
        const options = (0, helpers_1.default)({ email, fullname, name, sex });
        const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
        if (!Object.values(options).length && !image)
            return (0, responses_1.badRequest)(res, "Укажите допустимые поля для изменений");
        if (sex !== "female" && sex !== "male" && sex)
            return (0, responses_1.badRequest)(res, "Неверно указан пол");
        if (image) {
            if (image.size > TEN_MEGABYTES) {
                return (0, responses_1.badRequest)(res, "Размер файла не может быть больше 10 Мбайт");
            }
            if (image.mimetype.split("/")[0] !== "image") {
                return (0, responses_1.badRequest)(res, "Поддерживаются только изображения");
            }
            const image_name = (0, uuid_1.v4)() + "." + image.mimetype.split("/")[1];
            image.mv((0, getPathToOperativeFolder_1.default)() + image_name);
            res.locals.image_name = image_name;
        }
        next();
    }));
});
exports.updateUserValidation = updateUserValidation;
