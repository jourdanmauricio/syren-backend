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
exports.recoveryPass = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const envs_1 = require("../../config/envs");
const credentialsServices_1 = require("../../services/credentialsServices");
const CredentialRepository_1 = __importDefault(require("../../repositories/CredentialRepository"));
const boom_1 = __importDefault(require("@hapi/boom"));
const credentialsService = credentialsServices_1.CredentialsService.getInstance();
exports.recoveryPass = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    const payload = jsonwebtoken_1.default.verify(token, envs_1.config.jwtSecret);
    const { id } = payload;
    const credential = yield CredentialRepository_1.default.findById(id);
    if (credential.recoveryToken !== token)
        throw boom_1.default.unauthorized('Token inválido');
    const hashPass = yield bcrypt_1.default.hash(password, 10);
    yield credentialsService.update(credential.id, {
        recoveryToken: '',
        password: hashPass,
    });
    res.status(200).json({
        statusCode: 200,
        error: null,
        message: 'Contraeña modificada',
    });
}));
