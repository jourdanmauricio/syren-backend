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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const usersService_1 = require("../../services/usersService");
const usersService = usersService_1.UsersService.getInstance();
const credentialsServices_1 = require("../../services/credentialsServices");
const catchAsync_1 = require("../../utils/catchAsync");
const credentialsService = credentialsServices_1.CredentialsService.getInstance();
exports.registerUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password, role } = req.body;
    const newCredential = yield credentialsService.create({
        username,
        password,
        role,
    });
    const newUser = yield usersService.create({
        name,
        email,
        birthdate,
        nDni,
        credential: newCredential,
    });
    res.status(201).json(newUser);
}));
//# sourceMappingURL=registerUser.js.map