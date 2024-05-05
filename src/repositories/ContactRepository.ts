import { AppDataSource } from '../config/data-source';
import { Contact } from '../entities/Contact';

const ContactRepository = AppDataSource.getRepository(Contact);

export default ContactRepository;
