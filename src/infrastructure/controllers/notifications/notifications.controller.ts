import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetAuthUser, IAuthUser } from 'src/infrastructure/common/decorators';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { NotificationService } from 'src/infrastructure/services/notifications/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllNotifications() {
    const response = await this.notificationService.getAllNotifications();
    return HttpResponse.send('Notifications retrieved', response);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllUserNotifications(@GetAuthUser() user: IAuthUser) {
    const response = await this.notificationService.getAllUserNotificatons(
      user.id,
    );
    return HttpResponse.send('User notifications retrieved', response);
  }

  @Get('/:notificationId')
  @HttpCode(HttpStatus.OK)
  async getNotificationById(@Param('notificationId') notificationId: string) {
    const response =
      await this.notificationService.getNotificationById(notificationId);
    return HttpResponse.send('Notification Retrieved', response);
  }
}
