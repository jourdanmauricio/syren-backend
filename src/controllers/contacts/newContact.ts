import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../entities/Contact.entity';

const contactService = ContactsService.getInstance();

export const newContact = catchAsync(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  console.log('Prueba!!');

  const newContact: Contact = await contactService.create({
    name,
    email,
    message,
  });

  res.status(201).json(newContact);
});
