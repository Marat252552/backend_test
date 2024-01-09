"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorsHandler = (res, func) => {
    func().catch((e) => {
        console.log(e);
        res.sendStatus(500).end();
    });
};
exports.default = errorsHandler;
