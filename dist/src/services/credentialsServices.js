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
exports.CredentialsService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
class CredentialsService {
    constructor() { }
    static getInstance() {
        if (CredentialsService.instance === null) {
            CredentialsService.instance = new CredentialsService();
        }
        return CredentialsService.instance;
    }
    create(credentialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPass = yield bcrypt_1.default.hash(credentialData.password, 10);
            const newCredential = CredentialRepository_1.default.create(Object.assign(Object.assign({}, credentialData), { password: hashPass }));
            const result = yield CredentialRepository_1.default.save(newCredential);
            return result;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let credential = yield CredentialRepository_1.default.findById(id);
            credential = Object.assign(Object.assign({}, credential), data);
            const newCredential = yield CredentialRepository_1.default.save(credential);
            return newCredential;
        });
    }
}
exports.CredentialsService = CredentialsService;
CredentialsService.instance = null;
//# sourceMappingURL=credentialsServices.js.map