import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { strict } from 'assert';
import { join } from 'path';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envConfig.getEmailHost(),
        port: envConfig.getEmailPort(),
        secure: false,
        auth: {
          user: envConfig.getEmailUsername(),
          pass: envConfig.getEmailPassword(),
        },
      },
      defaults: {
        from: '"From Food Service <do not reply>"',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
})
export class EmailModule {}
