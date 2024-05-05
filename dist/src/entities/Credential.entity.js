"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = exports.TUserRole = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
var TUserRole;
(function (TUserRole) {
    TUserRole["ADMIN"] = "admin";
    TUserRole["GUEST"] = "guest";
    TUserRole["USER"] = "user";
})(TUserRole || (exports.TUserRole = TUserRole = {}));
let Credential = class Credential {
};
exports.Credential = Credential;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Credential.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        unique: true,
    }),
    __metadata("design:type", String)
], Credential.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 150,
    }),
    __metadata("design:type", String)
], Credential.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Credential.prototype, "recoveryToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TUserRole,
        default: TUserRole.USER,
    }),
    __metadata("design:type", String)
], Credential.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_entity_1.User, (user) => user.id),
    __metadata("design:type", User_entity_1.User)
], Credential.prototype, "user", void 0);
exports.Credential = Credential = __decorate([
    (0, typeorm_1.Entity)({
        name: 'credentials',
    })
], Credential);
