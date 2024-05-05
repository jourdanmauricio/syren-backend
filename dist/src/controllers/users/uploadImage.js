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
exports.uploadImage = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const catchAsync_1 = require("../../utils/catchAsync");
const usersService_1 = require("../../services/usersService");
const usersService = usersService_1.UsersService.getInstance();
exports.uploadImage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file && (file === null || file === void 0 ? void 0 : file.path) !== undefined) {
        const image = yield usersService.uploadImage(file);
        const newImage = {
            public_id: image === null || image === void 0 ? void 0 : image.public_id,
            secure_url: image === null || image === void 0 ? void 0 : image.secure_url,
            original_filename: image === null || image === void 0 ? void 0 : image.original_filename,
            format: image === null || image === void 0 ? void 0 : image.format,
            width: image === null || image === void 0 ? void 0 : image.width,
            height: image === null || image === void 0 ? void 0 : image.height,
        };
        res.status(200).json(newImage);
    }
    else {
        throw boom_1.default.badRequest('No files provided');
    }
}));
