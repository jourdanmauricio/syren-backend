import 'dotenv/config';

export const config = {
  // Server
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  frontDomain: process.env.FRONT_DOMAIN,
  // database
  dbType: process.env.DB_TYPE,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  // Mailer
  emailHost: process.env.EMAIL_HOST,
  emailSend: process.env.EMAIL_SEND,
  emailPort: process.env.EMAIL_PORT,
  emailSendPass: process.env.EMAIL_SEND_PASS,
  emailSecure: process.env.EMAIL_SECURE,
  // Cloudinary
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
};
