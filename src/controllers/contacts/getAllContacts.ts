import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../entities/Contact.entity';

const contactService = ContactsService.getInstance();

export const getAllContacts = catchAsync(
  async (req: Request, res: Response) => {
    const contacts: Contact[] = await contactService.getAll();
    res.status(200).json(contacts);
  }
);
