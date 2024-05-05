"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ForgotPassSubscriber = exports.ContactSubscriber = exports.UserSubscriber = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const sendRegisterMail_1 = __importDefault(require("../templates/sendRegisterMail"));
const Credential_1 = require("../entities/Credential");
const sendForgotPassMail_1 = __importDefault(require("../templates/sendForgotPassMail"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const Contact_1 = require("../entities/Contact");
const sendContactMail_1 = __importDefault(require("../templates/sendContactMail"));
let UserSubscriber = class UserSubscriber {
    listenTo() {
        return User_1.User;
    }
    afterInsert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, sendRegisterMail_1.default)(event.entity);
        });
    }
};
exports.UserSubscriber = UserSubscriber;
exports.UserSubscriber = UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
let ContactSubscriber = class ContactSubscriber {
    listenTo() {
        return Contact_1.Contact;
    }
    afterInsert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('event.entity', event.entity);
            yield (0, sendContactMail_1.default)(event.entity);
        });
    }
};
exports.ContactSubscriber = ContactSubscriber;
exports.ContactSubscriber = ContactSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ContactSubscriber);
let ForgotPassSubscriber = class ForgotPassSubscriber {
    listenTo() {
        return Credential_1.Credential;
    }
    afterUpdate(event) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const index = event.updatedColumns.findIndex((column) => column.propertyName === 'recoveryToken');
            if (index !== -1) {
                const user = yield UserRepository_1.default.findByCredentialId((_a = event.entity) === null || _a === void 0 ? void 0 : _a.id);
                if (user && ((_b = event.entity) === null || _b === void 0 ? void 0 : _b.recoveryToken) !== '')
                    yield (0, sendForgotPassMail_1.default)(user, (_c = event.entity) === null || _c === void 0 ? void 0 : _c.recoveryToken);
            }
        });
    }
};
exports.ForgotPassSubscriber = ForgotPassSubscriber;
exports.ForgotPassSubscriber = ForgotPassSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ForgotPassSubscriber);
//# sourceMappingURL=index.js.map