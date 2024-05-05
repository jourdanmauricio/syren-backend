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
const data_source_1 = require("../config/data-source");
const Credential_entity_1 = require("../entities/Credential.entity");
const boom_1 = __importDefault(require("@hapi/boom"));
const CredentialRepository = data_source_1.AppDataSource.getRepository(Credential_entity_1.Credential).extend({
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: { id },
            });
            if (!user)
                throw boom_1.default.notFound('User not found');
            return user;
        });
    },
});
exports.default = CredentialRepository;
//# sourceMappingURL=CredentialRepository.js.map