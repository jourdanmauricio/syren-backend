"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = exports.isAdmin = exports.isLogged = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const envs_1 = require("../config/envs");
const Credential_1 = require("../entities/Credential");
const isLogged = (req, res, next) => {
    const { token } = req.headers;
    if (token === envs_1.config.apiKey) {
        next();
    }
    else {
        next(boom_1.default.unauthorized('User is not logged in'));
    }
};
exports.isLogged = isLogged;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === Credential_1.TUserRole.ADMIN) {
        next();
    }
    else {
        next(boom_1.default.forbidden('No autorizado'));
    }
};
exports.isAdmin = isAdmin;
const checkRoles = (validSign, ...roles) => {
    return (req, res, next) => {
        const user = req.user;
        const paramId = req.params.id;
        if (validSign && paramId && user.role !== Credential_1.TUserRole.ADMIN) {
            if (Number(paramId) !== user.id)
                next(boom_1.default.forbidden('No autorizado'));
        }
        if (roles.includes(user.role)) {
            next();
        }
        else {
            next(boom_1.default.forbidden('No autorizado'));
        }
    };
};
exports.checkRoles = checkRoles;
