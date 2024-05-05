import nodemailer from 'nodemailer';
import { config } from './envs';

export const transporter = nodemailer.createTransport({
  host: config.emailHost, // config.host,
  port: Number(config.emailPort), // config.emailPort,
  secure: Boolean(config.emailSecure), // config.emailSecure,
  auth: {
    user: config.emailSend,
    pass: config.emailSendPass,
  },
});

transporter.verify(() => {
  console.log('Ready for send emails');
});
