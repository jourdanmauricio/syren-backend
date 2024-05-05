import { CreateContactDto } from '../dto/ContactDto';
import { Contact } from '../entities/Contact';
import ContactRepository from '../repositories/ContactRepository';

export class ContactsService {
  static instance: ContactsService | null = null;

  private constructor() {}

  static getInstance() {
    if (ContactsService.instance === null) {
      ContactsService.instance = new ContactsService();
    }
    return ContactsService.instance;
  }

  async create(contactData: CreateContactDto) {
    const contact = ContactRepository.create(contactData);
    const newContact = await ContactRepository.save(contact);
    return newContact;
  }

  async getAll(): Promise<Contact[]> {
    const contacts = await ContactRepository.find();
    return contacts;
  }
}
