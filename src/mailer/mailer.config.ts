import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'rahulxiaozion@gmail.com', 
      pass: 'yourpassword', 
    },
  },
  defaults: {
    from: '"NestJS Mailer" <noreply@xiaozion.com>',
  },
  template: {
    dir: join(process.cwd(), 'src', 'mailer', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}; 