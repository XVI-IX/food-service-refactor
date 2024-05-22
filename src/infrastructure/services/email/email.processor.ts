import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmail } from 'src/domain/adapters';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('emails')
export class EmailProcessor {
  constructor(
    private mailerService: MailerService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Process('admin.register')
  async sendWelcomeEmailAdmin(job: Job<IEmail>) {
    const { data } = job;

    const { userName, token } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Admin account created',
      template: './welcome',
      context: {
        userName,
        url: `${token}`,
      },
    });
  }

  @Process('admin.verify')
  async sendVerifyEmailAdmin(job: Job<IEmail>) {
    const { data } = job;
    const { userName } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Admin account verified',
      template: './verify-admin',
      context: {
        userName,
      },
    });
  }

  @Process('vendor.register')
  async sendWelcomeEmailVendor(job: Job<IEmail>) {
    const { data } = job;
    const { userName, token } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Vendor account created',
      template: './welcome-vendor',
      context: {
        userName,
        token,
      },
    });
  }

  @Process('vendor.verify')
  async sendVerifyEmailVendor(job: Job<IEmail>) {
    const { data } = job;

    const { userName } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Vendor account verified',
      template: './verify-vendor',
      context: {
        userName,
      },
    });
  }

  @Process('vendors.forgot-password')
  async sendVendorForgotPasswordEmail(job: Job<IEmail>) {
    const { data } = job;
    const { userName, token } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Forgot Password',
      template: './vendor-forgot-password',
      context: {
        userName,
        token,
      },
    });
  }

  @Process('order.confirmed')
  async sendOrderConfirmedEmail(job: Job<IEmail>) {
    const { data } = job;
    const { userName } = data.data;

    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Order Confirmed',
      template: './order-confirmed',
      context: {
        userName
      }
    })
  }
}
