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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleAppointment = void 0;
const appointmentsService_1 = require("../../services/appointmentsService");
const catchAsync_1 = require("../../utils/catchAsync");
const appointmentService = appointmentsService_1.AppointmentService.getInstance();
exports.scheduleAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId, status } = req.body;
    if (!userId)
        res.status(401).json({ message: 'Unathorized' });
    const newAppointment = yield appointmentService.schedule({
        date,
        time,
        userId,
        status,
    });
    res.status(201).json(newAppointment);
}));