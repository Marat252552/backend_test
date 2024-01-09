"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const GetAuthRouter_1 = __importDefault(require("./routes/AuthRouter/GetAuthRouter"));
const GetUserRouter_1 = __importDefault(require("./routes/UserRouter/GetUserRouter"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
let jsonBodyMiddleware = express_1.default.json();
exports.app.use((0, cors_1.default)({
    origin: process.env.FRONT_URL,
    credentials: true,
}));
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
exports.app.use(jsonBodyMiddleware);
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, "static")));
exports.app.use((0, express_fileupload_1.default)({}));
const AuthRouter = (0, GetAuthRouter_1.default)();
const UserRouter = (0, GetUserRouter_1.default)();
exports.app.use(AuthRouter);
exports.app.use(UserRouter);
