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
exports.AppointmentService = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
const AppoinmentRepository_1 = __importDefault(require("../repositories/AppoinmentRepository"));
const usersService_1 = require("./usersService");
const usersService = usersService_1.UsersService.getInstance();
class AppointmentService {
    constructor() { }
    static getInstance() {
        if (AppointmentService.instance === null) {
            AppointmentService.instance = new AppointmentService();
        }
        return AppointmentService.instance;
    }
    schedule(appointmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            try {
                queryRunner.startTransaction();
                const newAppointment = AppoinmentRepository_1.default.create(appointmentData);
                yield queryRunner.manager.save(newAppointment);
                const user = yield usersService.getUser(appointmentData.userId);
                newAppointment.user = user;
                yield queryRunner.manager.save(newAppointment);
                yield queryRunner.commitTransaction();
                yield queryRunner.release();
                return newAppointment;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                yield queryRunner.release();
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield AppoinmentRepository_1.default.find({
                relations: {
                    user: true,
                },
            });
            return appointments;
        });
    }
    getAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield AppoinmentRepository_1.default.findById(id);
            return appointment;
        });
    }
    cancel(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield AppoinmentRepository_1.default.findById(id);
            if (user.role !== Credential_1.TUserRole.ADMIN) {
                if (appointment.user.id !== user.id)
                    throw boom_1.default.forbidden('No autorizado');
            }
            appointment.status = Appointment_1.TAppointmentStatus.CANCELLED;
            yield AppoinmentRepository_1.default.save(appointment);
            return appointment;
        });
    }
}
exports.AppointmentService = AppointmentService;
AppointmentService.instance = null;
