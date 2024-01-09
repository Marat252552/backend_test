"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = exports.success = exports.successWithCookie = exports.badRequest = void 0;
const configs_1 = require("./configs");
const badRequest = (res, message) => {
    return res.status(400).json({ message }).end();
};
exports.badRequest = badRequest;
const successWithCookie = (res, RefreshToken, response) => {
    return res
        .status(201)
        .cookie("refresh_token", RefreshToken, configs_1.cookieConfig)
        .json(response);
};
exports.successWithCookie = successWithCookie;
const success = (res, data) => {
    return res.status(200).json({ data });
};
exports.success = success;
const created = (res, message, data) => {
    return res
        .status(201)
        .json({
        message,
        data,
    })
        .end();
};
exports.created = created;
