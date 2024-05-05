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
exports.UsersService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const envs_1 = require("../config/envs");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const boom_1 = __importDefault(require("@hapi/boom"));
class UsersService {
    constructor() { }
    static getInstance() {
        if (UsersService.instance === null) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = UserRepository_1.default.create(userData);
            const result = yield UserRepository_1.default.save(user);
            return result;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserRepository_1.default.find({
                relations: {
                    credential: true,
                },
            });
            return users;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findById(id);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findOne({
                where: { email },
                relations: { credential: true },
            });
            if (!user)
                throw boom_1.default.badRequest('Email no registrado');
            return user;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield UserRepository_1.default.findById(id);
            user = Object.assign(Object.assign({}, user), data);
            const newUser = yield UserRepository_1.default.save(user);
            return newUser;
        });
    }
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const newImage = yield cloudinary_1.default.uploader
                .upload(file.path, { folder: envs_1.config.cloudinaryFolder })
                .then((res) => res)
                .catch((err) => {
                throw new Error(err.message);
            });
            return newImage;
        });
    }
}
exports.UsersService = UsersService;
UsersService.instance = null;
