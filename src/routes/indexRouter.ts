import { Request, Response, Router } from 'express';
import usersRouter from './usersRouter';
import appointmentsRouter from './appointmentsRouter';
import contactsRouter from './contactsRouter';

const router: Router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);
router.use('/contacts', contactsRouter);

export default router;
