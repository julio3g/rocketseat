import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/useCases/cancelNotificationUseCase';
import { UnreadNotification } from '@application/useCases/unreadNotificationUseCase';
import { CountRecipientNotifications } from '@application/useCases/countRecipientsNotificationsUseCase';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotificationsUseCase';
import { ReadNotification } from '@application/useCases/readNotificationUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
  ],
})
export class HttpModule {}
