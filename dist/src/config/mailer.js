"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("./envs");
exports.transporter = nodemailer_1.default.createTransport({
    host: envs_1.config.emailHost,
    port: Number(envs_1.config.emailPort),
    secure: Boolean(envs_1.config.emailSecure),
    auth: {
        user: envs_1.config.emailSend,
        pass: envs_1.config.emailSendPass,
    },
});
exports.transporter.verify(() => {
    console.log('Ready for send emails');
});
//# sourceMappingURL=mailer.js.map