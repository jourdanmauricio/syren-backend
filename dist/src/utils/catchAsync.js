"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (controller) => {
    return (req, res, next) => {
        controller(req, res, next).catch((err) => {
            next(err);
        });
    };
};
exports.catchAsync = catchAsync;
