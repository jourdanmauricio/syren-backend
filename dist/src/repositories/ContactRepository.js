"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Contact_entity_1 = require("../entities/Contact.entity");
const ContactRepository = data_source_1.AppDataSource.getRepository(Contact_entity_1.Contact);
exports.default = ContactRepository;
//# sourceMappingURL=ContactRepository.js.map