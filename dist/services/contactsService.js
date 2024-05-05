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
exports.ContactsService = void 0;
const ContactRepository_1 = __importDefault(require("../repositories/ContactRepository"));
class ContactsService {
    constructor() { }
    static getInstance() {
        if (ContactsService.instance === null) {
            ContactsService.instance = new ContactsService();
        }
        return ContactsService.instance;
    }
    create(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = ContactRepository_1.default.create(contactData);
            const newContact = yield ContactRepository_1.default.save(contact);
            return newContact;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield ContactRepository_1.default.find();
            return contacts;
        });
    }
}
exports.ContactsService = ContactsService;
ContactsService.instance = null;
//# sourceMappingURL=contactsService.js.map