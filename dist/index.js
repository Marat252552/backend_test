"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.app);
let Start = () => {
    let PORT = process.env.PORT || 3000;
    try {
        server.listen(PORT, () => {
            console.log("server is running on port " + PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
};
Start();
