import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { NotificationService } from 'src/infrastructure/services/notifications/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllNotifications() {
    const response = await this.notificationService.getAllNotifications();
    return HttpResponse.send('Notifications retrieved', response);
  }

  @Get('/users/:userId')
  @HttpCode(HttpStatus.OK)
  async getAllUserNotifications(@Param('userId') userId: string) {
    const response =
      await this.notificationService.getAllUserNotificatons(userId);
    return HttpResponse.send('User notifications retrieved', response);
  }

  @Get('/:notificationId')
  @HttpCode(HttpStatus.OK)
  async getNotificationById(@Param('notificationId') notificationId: string) {
    const response =
      await this.notificationService.getNotificationById(notificationId);
    return HttpResponse.send('Notification Retrieved', response);
  }

  @Get('/stores/:storeId')
  @HttpCode(HttpStatus.OK)
  async getAllStoreNotifications(@Param('storeId') storeId: string) {
    const response =
      await this.notificationService.getAllStoreNotifications(storeId);
    return HttpResponse.send('Store notifications retrieved', response);
  }

  @Put('/:notificationId/markAsRead')
  @HttpCode(HttpStatus.OK)
  async markNotificationAsRead(
    @Param('notificationId') notificationId: string,
  ) {
    const response =
      await this.notificationService.markNotificationAsRead(notificationId);
    return HttpResponse.send('Marked as read', response);
  }

  @Post('/users/:userId')
  @HttpCode(HttpStatus.CREATED)
  async createNotificationForUser(
    @Param('userId') userId: string,
    @Body() dto: CreateNotificationDto,
  ) {
    const response = await this.notificationService.createNotificationForUser(
      userId,
      dto,
    );
    return HttpResponse.send('Notification created for user', response);
  }

  @Post('/stores/:storeId')
  @HttpCode(HttpStatus.OK)
  async createNotificationForStore(
    @Param('storeId') storeId: string,
    dto: CreateNotificationDto,
  ) {
    const response = await this.notificationService.createNotificationForStore(
      storeId,
      dto,
    );
    return HttpResponse.send('Store notification created', response);
  }

  @Delete('/users/:userId')
  @HttpCode(HttpStatus.OK)
  async deleteAllNotificationsForUser(@Param('userId') userId: string) {
    const response =
      await this.notificationService.deleteAllNotificationsForUser(userId);
    return HttpResponse.send('Notifications deleted', response);
  }

  @Delete('/:notificationId')
  @HttpCode(HttpStatus.OK)
  async deleteNotificationById(
    @Param('notificationId') notificationId: string,
  ) {
    const response =
      await this.notificationService.deleteNotificationById(notificationId);
    return HttpResponse.send('Notification Deleted', response);
  }
}
