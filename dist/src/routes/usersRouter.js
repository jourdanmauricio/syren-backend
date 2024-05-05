"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const auth_1 = require("./../middlewares/auth");
const validatorHandler_1 = __importDefault(require("../middlewares/validatorHandler"));
const userSchema_1 = require("../schemas/userSchema");
const multer_1 = require("../middlewares/multer");
const Credential_entity_1 = require("../entities/Credential.entity");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), auth_1.isAdmin, controllers_1.getAllUsers);
usersRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.checkRoles)(true, Credential_entity_1.TUserRole.ADMIN, Credential_entity_1.TUserRole.USER), (0, validatorHandler_1.default)(userSchema_1.getUserSchema, 'params'), controllers_1.getUser);
usersRouter.put('/forgot-password', (0, validatorHandler_1.default)(userSchema_1.updateUserSchema, 'body'), controllers_1.forgotPass);
usersRouter.put('/recovery-password', (0, validatorHandler_1.default)(userSchema_1.recoveryPassSchema, 'body'), controllers_1.recoveryPass);
usersRouter.put('/change-pass/:id', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.checkRoles)(true, Credential_entity_1.TUserRole.ADMIN, Credential_entity_1.TUserRole.USER), (0, validatorHandler_1.default)(userSchema_1.getUserSchema, 'params'), (0, validatorHandler_1.default)(userSchema_1.changePassSchema, 'body'), controllers_1.changePass);
usersRouter.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.checkRoles)(true, Credential_entity_1.TUserRole.ADMIN, Credential_entity_1.TUserRole.USER), (0, validatorHandler_1.default)(userSchema_1.getUserSchema, 'params'), (0, validatorHandler_1.default)(userSchema_1.updateUserSchema, 'body'), controllers_1.updateUser);
usersRouter.post('/upload-image', multer_1.upload.single('image'), controllers_1.uploadImage);
usersRouter.post('/register', (0, validatorHandler_1.default)(userSchema_1.createUserSchema, 'body'), controllers_1.registerUser);
usersRouter.post('/login', passport_1.default.authenticate('local', { session: false }), controllers_1.loginUser);
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map