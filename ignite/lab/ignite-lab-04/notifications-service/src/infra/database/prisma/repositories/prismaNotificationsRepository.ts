import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notificationsRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(notification);
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notifications.findMany({
      where: {
        recipientId,
      },
    });
    // return notifications.map((notification) => {
    //   return PrismaNotificationMapper.toDomain(notification);
    // });
    // simplificação, pois o map é uma função
    return notifications.map(PrismaNotificationMapper.toDomain);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notifications.count({
      where: {
        recipientId,
      },
    });
    return count;
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notifications.create({
      data: raw,
    });
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notifications.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
