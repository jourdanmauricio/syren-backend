"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Appointment_1 = require("../entities/Appointment");
const envs_1 = require("./envs");
const subscribers_1 = require("../subscribers");
const Contact_1 = require("../entities/Contact");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envs_1.config.dbHost,
    port: Number(envs_1.config.dbPort),
    username: envs_1.config.dbUsername,
    password: envs_1.config.dbPassword,
    database: envs_1.config.dbDatabase,
    synchronize: true,
    logging: ['error'],
    entities: [Credential_1.Credential, User_1.User, Appointment_1.Appointment, Contact_1.Contact],
    subscribers: [subscribers_1.UserSubscriber, subscribers_1.ForgotPassSubscriber, subscribers_1.ContactSubscriber],
    migrations: [],
});
