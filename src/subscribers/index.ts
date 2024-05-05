import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entities/User';
import sendRegisterMail from '../templates/sendRegisterMail';
import { Credential } from '../entities/Credential';
import sendForgotPassMail from '../templates/sendForgotPassMail';
import UserRepository from '../repositories/UserRepository';
import { Contact } from '../entities/Contact';
import sendContactMail from '../templates/sendContactMail';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  // beforeInsert(event: InsertEvent<User>) {
  //   console.log(`Before insert: `, event.entity);
  // }

  async afterInsert(event: InsertEvent<User>) {
    await sendRegisterMail(event.entity);
  }
}

@EventSubscriber()
export class ContactSubscriber implements EntitySubscriberInterface<Contact> {
  listenTo() {
    return Contact;
  }

  async afterInsert(event: InsertEvent<Contact>) {
    console.log('event.entity', event.entity);

    await sendContactMail(event.entity);
  }
}

@EventSubscriber()
export class ForgotPassSubscriber
  implements EntitySubscriberInterface<Credential>
{
  listenTo() {
    return Credential;
  }

  // beforeInsert(event: InsertEvent<User>) {
  //   console.log(`Before insert: `, event.entity);
  // }

  async afterUpdate(event: UpdateEvent<Credential>) {
    const index = event.updatedColumns.findIndex(
      (column) => column.propertyName === 'recoveryToken'
    );

    if (index !== -1) {
      const user = await UserRepository.findByCredentialId(
        event.entity?.id as Credential
      );
      if (user && event.entity?.recoveryToken !== '')
        await sendForgotPassMail(user, event.entity?.recoveryToken);
    }
  }
}
