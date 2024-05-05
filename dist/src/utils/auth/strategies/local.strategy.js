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
const passport_local_1 = require("passport-local");
const CredentialRepository_1 = __importDefault(require("../../../repositories/CredentialRepository"));
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../../../repositories/UserRepository"));
const LocalStrategy = new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield CredentialRepository_1.default.findOneBy({
            username: username,
        });
        if (credentials) {
            const isMatch = yield bcrypt_1.default.compare(password, credentials.password);
            if (!isMatch)
                done(boom_1.default.unauthorized('Verifica tus credenciales'), false);
            const user = yield UserRepository_1.default.findByCredentialId(credentials);
            credentials.id = user.id;
            done(null, credentials);
        }
        else {
            done(boom_1.default.unauthorized('Verifica tus credenciales'), false);
        }
    }
    catch (error) {
        done(error, false);
    }
}));
exports.default = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map