"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const appointmentSchema_1 = require("../schemas/appointmentSchema");
const auth_1 = require("./../middlewares/auth");
const validatorHandler_1 = __importDefault(require("../middlewares/validatorHandler"));
const Credential_1 = require("../entities/Credential");
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), auth_1.isAdmin, controllers_1.getAllAppointments);
appointmentsRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.checkRoles)(false, Credential_1.TUserRole.ADMIN, Credential_1.TUserRole.USER), (0, validatorHandler_1.default)(appointmentSchema_1.getAppointmentSchema, 'params'), controllers_1.getAppointment);
appointmentsRouter.post('/schedule', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.checkRoles)(true, Credential_1.TUserRole.ADMIN, Credential_1.TUserRole.USER), (0, validatorHandler_1.default)(appointmentSchema_1.createAppointmentSchema, 'body'), controllers_1.scheduleAppointment);
appointmentsRouter.put('/cancel/:id', passport_1.default.authenticate('jwt', { session: false }), (0, validatorHandler_1.default)(appointmentSchema_1.getAppointmentSchema, 'params'), (0, validatorHandler_1.default)(appointmentSchema_1.updateAppointmentSchema, 'body'), (0, auth_1.checkRoles)(false, Credential_1.TUserRole.ADMIN, Credential_1.TUserRole.USER), controllers_1.cancelAppointment);
exports.default = appointmentsRouter;
//# sourceMappingURL=appointmentsRouter.js.map