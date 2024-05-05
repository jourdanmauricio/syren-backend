"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentSchema = exports.updateAppointmentSchema = exports.createAppointmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const Appointment_1 = require("../entities/Appointment");
const id = joi_1.default.number();
const date = joi_1.default.date().greater('now');
const time = joi_1.default.string();
const status = joi_1.default.string()
    .default(Appointment_1.TAppointmentStatus.ACTIVE)
    .valid(Appointment_1.TAppointmentStatus.ACTIVE, Appointment_1.TAppointmentStatus.CANCELLED);
const userId = joi_1.default.number();
const createAppointmentSchema = joi_1.default.object({
    date: date.required(),
    time: time.required(),
    status,
    userId: userId.required(),
});
exports.createAppointmentSchema = createAppointmentSchema;
const updateAppointmentSchema = joi_1.default.object({
    status,
});
exports.updateAppointmentSchema = updateAppointmentSchema;
const getAppointmentSchema = joi_1.default.object({
    id: id.required(),
});
exports.getAppointmentSchema = getAppointmentSchema;
