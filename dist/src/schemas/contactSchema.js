"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const name = joi_1.default.string().min(3).max(150);
const email = joi_1.default.string().email();
const message = joi_1.default.string().min(3).max(255);
const createContactSchema = joi_1.default.object({
    name: name.required(),
    email: email.required(),
    message: message.required(),
});
exports.createContactSchema = createContactSchema;
//# sourceMappingURL=contactSchema.js.map