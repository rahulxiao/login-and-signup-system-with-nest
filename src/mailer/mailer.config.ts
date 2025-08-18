import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'rahulxiaozion@gmail.com', 
      pass: 'pgtt hhqh gdqw qbzm', 
    },
  },
  defaults: {
    from: '"NestJS Mailer" <noreply@example.com>',
  },
  template: {
    dir: join(process.cwd(), 'src', 'mailer', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}; 