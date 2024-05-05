"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryPassSchema = exports.changePassSchema = exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(3).max(150);
const email = joi_1.default.string().email();
const birthdate = joi_1.default.date().less('now').allow(null, '');
const nDni = joi_1.default.number().integer().positive();
const username = joi_1.default.string().min(3).max(30);
const password = joi_1.default.string().min(8).max(150);
const token = joi_1.default.string();
const role = joi_1.default.string().allow(null, '');
const image = joi_1.default.string().uri().allow(null, '');
const phone = joi_1.default.string().min(7).max(15).allow(null, '');
const createUserSchema = joi_1.default.object({
    name: name.required(),
    email: email.required(),
    birthdate,
    nDni: nDni.required(),
    username: username.required(),
    password: password.required(),
    role,
    image,
    phone,
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = joi_1.default.object({
    name,
    email,
    birthdate,
    nDni,
    image,
    phone,
});
exports.updateUserSchema = updateUserSchema;
const recoveryPassSchema = joi_1.default.object({
    password: password.required(),
    token: token.required(),
});
exports.recoveryPassSchema = recoveryPassSchema;
const changePassSchema = joi_1.default.object({
    password: password.required(),
});
exports.changePassSchema = changePassSchema;
const getUserSchema = joi_1.default.object({
    id: id.required(),
});
exports.getUserSchema = getUserSchema;
//# sourceMappingURL=userSchema.js.map