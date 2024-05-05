import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../entities/Contact';

const contactService = ContactsService.getInstance();

export const newContact = catchAsync(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const newContact: Contact = await contactService.create({
    name,
    email,
    message,
  });

  res.status(201).json(newContact);
});
