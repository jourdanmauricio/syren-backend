import { Router } from 'express';
import passport from 'passport';
import { isAdmin } from './../middlewares/auth';
import validatorHandler from '../middlewares/validatorHandler';
import { createContactSchema } from '../schemas/contactSchema';
import { newContact } from '../controllers/contacts/newContact';
import { getAllContacts } from '../controllers/contacts/getAllContacts';

const contactsRouter: Router = Router();

contactsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getAllContacts
);

contactsRouter.post(
  '/',
  validatorHandler(createContactSchema, 'body'),
  newContact
);

export default contactsRouter;
