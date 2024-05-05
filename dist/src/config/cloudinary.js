"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const envs_1 = require("./envs");
cloudinary_1.v2.config({
    cloud_name: envs_1.config.cloudinaryCloudName,
    api_key: envs_1.config.cloudinaryApiKey,
    api_secret: envs_1.config.cloudinaryApiSecret,
});
exports.default = cloudinary_1.v2;
