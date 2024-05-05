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
exports.forgotPass = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../../config/envs");
const usersService_1 = require("../../services/usersService");
const credentialsServices_1 = require("../../services/credentialsServices");
const usersService = usersService_1.UsersService.getInstance();
const credentialsService = credentialsServices_1.CredentialsService.getInstance();
exports.forgotPass = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield usersService.getUserByEmail(email);
    const payload = {
        id: user.credential.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, envs_1.config.jwtSecret, {
        expiresIn: '15m',
    });
    yield credentialsService.update(user.credential.id, {
        recoveryToken: token,
    });
    res
        .status(200)
        .json({ statusCode: 200, error: null, message: 'Recovery ready' });
}));
//# sourceMappingURL=forgotPass.js.map