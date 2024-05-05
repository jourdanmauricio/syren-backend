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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadAppointments = exports.PreloadUsers = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppoinmentRepository_1 = __importDefault(require("../repositories/AppoinmentRepository"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const usersData = [
    {
        name: 'Mauricio Jourdán',
        email: 'jourdanmauricio@gmail.com',
        birthdate: new Date('1974-10-20'),
        nDni: 99999999,
        username: 'jourdanmau',
        password: '12345678',
        role: Credential_1.TUserRole.ADMIN,
    },
    {
        name: 'Paola Jourdán',
        email: 'pao@mail.com',
        birthdate: new Date('2000-01-16'),
        nDni: 99999998,
        username: 'jourdanpao',
        password: '12345678',
        role: Credential_1.TUserRole.USER,
    },
    {
        name: 'Nancy Jourdán',
        email: 'nan@mail.com',
        birthdate: new Date('2001-05-22'),
        nDni: 99999997,
        username: 'jourdannan',
        password: '12345678',
        role: Credential_1.TUserRole.USER,
    },
];
const appointmentsData = [
    {
        date: new Date('2024-03-28'),
        time: '15',
        userId: 2,
    },
    {
        date: new Date('2024-03-15'),
        time: '10:30',
        userId: 3,
    },
];
const PreloadUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.manager.transaction((transactionalEntityMananager) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const credentials = yield CredentialRepository_1.default.find();
        if (credentials.length > 0)
            return;
        try {
            for (var _d = true, usersData_1 = __asyncValues(usersData), usersData_1_1; usersData_1_1 = yield usersData_1.next(), _a = usersData_1_1.done, !_a; _d = true) {
                _c = usersData_1_1.value;
                _d = false;
                const user = _c;
                const { username, password, role, name, email, birthdate, nDni } = user;
                const hashPass = yield bcrypt_1.default.hash(password, 10);
                const credential = CredentialRepository_1.default.create({
                    username,
                    password: hashPass,
                    role,
                });
                const newCredential = yield transactionalEntityMananager.save(credential);
                const newUser = yield UserRepository_1.default.create({
                    name,
                    email,
                    birthdate,
                    nDni,
                    credential: newCredential,
                });
                yield transactionalEntityMananager.save(newUser);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = usersData_1.return)) yield _b.call(usersData_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log('PreloadData Users -> success');
    }));
});
exports.PreloadUsers = PreloadUsers;
const PreloadAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield AppoinmentRepository_1.default.find();
    if (appointments.length > 0)
        return;
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const promises = appointmentsData.map((appoinment) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = yield AppoinmentRepository_1.default.create(appoinment);
        yield queryRunner.manager.save(newAppointment);
        const user = yield UserRepository_1.default.findOneBy({ id: appoinment.userId });
        if (!user)
            throw Error('User not found');
        newAppointment.user = user;
        yield queryRunner.manager.save(newAppointment);
    }));
    yield queryRunner.startTransaction();
    try {
        yield Promise.all(promises);
        yield queryRunner.commitTransaction();
        console.log('PreloadAppointments -> success');
    }
    catch (error) {
        console.log('PreloadAppointments -> error');
        yield queryRunner.rollbackTransaction();
    }
    finally {
        yield queryRunner.release();
    }
});
exports.PreloadAppointments = PreloadAppointments;
//# sourceMappingURL=preloadData.js.map