"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const boom_1 = require("@hapi/boom");
function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}
exports.logErrors = logErrors;
function boomErrorHandler(err, req, res, next) {
    if (err instanceof boom_1.Boom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(err);
    }
}
exports.boomErrorHandler = boomErrorHandler;
function errorHandler(err, req, res, next) {
    if (err.name === 'QueryFailedError') {
        return res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: err.message,
        });
    }
    res.status(500).json({ message: err.message });
}
exports.errorHandler = errorHandler;
