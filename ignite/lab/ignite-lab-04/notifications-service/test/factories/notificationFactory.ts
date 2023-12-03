import { Content } from '@application/entities/content';
import {
  Notification,
  INotificationProps,
} from '@application/entities/notification';

type Override = Partial<INotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-1',
    ...override,
  });
}
