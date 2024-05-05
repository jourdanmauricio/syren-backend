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
const boom_1 = __importDefault(require("@hapi/boom"));
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const UserRepository = data_source_1.AppDataSource.getRepository(User_1.User).extend({
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: { id },
                relations: { appointments: true },
            });
            if (!user)
                throw boom_1.default.notFound('User not found');
            return user;
        });
    },
    findByCredentialId: function (credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository.findOne({
                where: { credential },
                relations: { credential: true },
            });
            if (!user)
                throw boom_1.default.notFound('User not found');
            return user;
        });
    },
});
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map