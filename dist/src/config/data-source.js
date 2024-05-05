"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const subscribers_1 = require("../subscribers");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envs_1.config.dbHost,
    port: Number(envs_1.config.dbPort),
    username: envs_1.config.dbUsername,
    password: envs_1.config.dbPassword,
    database: envs_1.config.dbDatabase,
    ssl: true,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    subscribers: [subscribers_1.UserSubscriber, subscribers_1.ForgotPassSubscriber, subscribers_1.ContactSubscriber],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map