"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./../middlewares/auth");
const validatorHandler_1 = __importDefault(require("../middlewares/validatorHandler"));
const contactSchema_1 = require("../schemas/contactSchema");
const newContact_1 = require("../controllers/contacts/newContact");
const getAllContacts_1 = require("../controllers/contacts/getAllContacts");
const contactsRouter = (0, express_1.Router)();
contactsRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), auth_1.isAdmin, getAllContacts_1.getAllContacts);
contactsRouter.post('/', (0, validatorHandler_1.default)(contactSchema_1.createContactSchema, 'body'), newContact_1.newContact);
exports.default = contactsRouter;
//# sourceMappingURL=contactsRouter.js.map