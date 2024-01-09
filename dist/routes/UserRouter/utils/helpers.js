"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearEmptyQueries = void 0;
const clearEmptyQueries = (queries) => {
    const result = {};
    Object.keys(queries).forEach((key) => {
        if (queries[key] === null || queries[key] === undefined)
            return;
        result[key] = queries[key];
    });
    return result;
};
exports.clearEmptyQueries = clearEmptyQueries;
exports.default = exports.clearEmptyQueries;
