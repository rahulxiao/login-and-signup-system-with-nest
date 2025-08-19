# 🚀 Login & Signup System API (NestJS + TypeORM + Mailer)

A robust user/admin management API built with **NestJS 11**, **TypeORM**, **PostgreSQL**, and **Nest Mailer** (Handlebars templates). Includes JWT-based authentication, admin CRUD utilities, and email workflows.

## ✨ Features

- 🔐 **Auth**: Login and signup with JWT issuance
- 👤 **Admin Management**: Create, read, update, delete, and query admins
- 📨 **Emailing**: Test, welcome, and verification emails via SMTP
- ✅ **Validation**: Strong DTO validation using `class-validator`
- 🗄️ **Database**: PostgreSQL with TypeORM (`autoLoadEntities`, `synchronize` enabled)
- 🛡️ **Global Pipes**: Whitelisting, non-whitelisted protection, and transformation

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **ORM**: TypeORM 0.3
- **DB**: PostgreSQL
- **Auth**: `@nestjs/jwt`
- **Mailer**: `@nestjs-modules/mailer` + Handlebars
- **Validation**: `class-validator`, `class-transformer`
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+
- npm
- PostgreSQL 13+

## 🚀 Getting Started

### 1) Install
```bash
npm install
```

### 2) Configure
This project currently uses inline configuration for DB, JWT, and Mailer. You should change these values locally (or migrate them to environment variables with `@nestjs/config`).

- DB: `src/app.module.ts`
```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '<your-db-password>',
  database: 'login-signup',
  autoLoadEntities: true,
  synchronize: true,
})
```

- JWT Secret: `src/auth/constants.ts`
```ts
export const jwtConstants = {
  secret: '<your-jwt-secret>',
};
```

- Mailer (SMTP): `src/mailer/mailer.config.ts`
```ts
export const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: '<your-smtp-user>',
      pass: '<your-smtp-pass>',
    },
  },
  defaults: { from: '"NestJS Mailer" <noreply@example.com>' },
  template: { /* Handlebars templates under src/mailer/templates */ },
};
```
See `MAILER_SETUP.md` for details.

You can also create a `.env` for the app port (already supported) and future config:
```env
PORT=3333
NODE_ENV=development
# Recommended if you migrate configs:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=login-signup
JWT_SECRET=change_me
MAIL_HOST=smtp.gmail.com
MAIL_USER=you@example.com
MAIL_PASS=app_password
MAIL_FROM="NestJS Mailer" <noreply@example.com>
```

### 3) Run
- Development
```bash
npm run start:dev
```
- Production
```bash
npm run build
npm run start:prod
```
The server listens on `http://localhost:3333` (or `PORT`).

## 📚 API Endpoints

### Auth
- `POST /auth/login`: Login with username/password → returns `{ access_token }`
- `POST /auth/signup`: Register a new admin (minimal fields; service fills defaults)

Example: `POST /auth/login`
```json
{
  "username": "admin_user",
  "password": "SecurePass123"
}
```
Response:
```json
{ "access_token": "<jwt>" }
```

### Admin
Base path: `/admin`

- `POST /admin/create`: Create admin (full profile)
- `PUT /admin/updateCountry/:id`: Update country
- `GET /admin/byJoiningDate?date=YYYY-MM-DD`: Filter by joining date
- `GET /admin/defaultCountry`: Admins with country `Unknown`
- `GET /admin/all`: List all admins
- `GET /admin/getAdminInfo`: Legacy list
- `POST /admin/createAdmin`: Legacy create
- `DELETE /admin/deleteAdminById/:id`: Delete by id
- `GET /admin/getAdminById/:id`: Get by id
- `PUT /admin/updateAdmin/:id`: Update fields
- `POST /admin/addAdminBody`: Demo add with body fields `name`, `id`
- `GET /admin/getAdminInfoByNameAndId?name=...&id=...`: Query by name and id

Example: `POST /admin/create`
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "address": "123 Street, City",
  "username": "jane_smith",
  "password": "pass@abc",
  "country": "USA",
  "dateOfBirth": "1990-01-01",
  "socialMediaLink": "https://github.com/jane"
}
```

### Mailer
Base path: `/mailer`

- `POST /mailer/test`: Send basic test email
- `POST /mailer/welcome`: Send welcome email `{ email, name }`
- `POST /mailer/verification`: Send verification email `{ email, name, code }`
- `POST /mailer/template`: Send email with template `{ email, subject, template, templateData }`
- `GET /mailer/health`: Health check

## 🔐 JWT
Configured globally in `AuthModule` with 1h expiry. Update `jwtConstants.secret` before production.

## 🧩 DTOs

- `LoginDto`
```ts
export class LoginDto {
  username: string;
  password: string; // min 6 chars
}
```

- `SignupDto` (used by `/auth/signup` and auto-augmented in service)
```ts
export class SignupDto {
  username: string;
  email: string; // valid email
  password: string; // min 6 chars
  name: string;
}
```

- `CreateAdminDto` (used by `/admin/create`)
```ts
export class CreateAdminDto {
  name: string;               // letters/spaces only
  email: string;              // unique
  phone: string;
  address: string;
  username: string;           // letters/numbers/underscores
  password: string;           // must include lowercase + one of @#$&
  country?: string;           // defaults to "Unknown"
  dateOfBirth: string;        // ISO date e.g., 1990-01-01
  socialMediaLink: string;    // https://github.com|facebook|linkedin|twitter/... 
}
```

## 🧪 Testing

- Import `postman_collection.json` for Auth/Admin
- Import `mailer-postman-collection.json` for Mailer

## 📁 Project Structure
```
src/
├── admin/
│   ├── admin.controller.ts
│   ├── admin.service.ts
│   ├── admin.entity.ts
│   └── admin.dto.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── login.dto.ts
│   ├── signup.dto.ts
│   └── constants.ts
├── mailer/
│   ├── mailer.module.ts
│   ├── mailer.service.ts
│   ├── mailer.controller.ts
│   └── mailer.config.ts
├── app.module.ts
└── main.ts
```

## 🔍 Troubleshooting
- **DB connection failed**: Verify PostgreSQL is running and credentials/database match `app.module.ts`
- **Port in use**: Change `PORT` or stop the existing process
- **Emails not sending**: Check SMTP credentials and enable app passwords/less secure app options as required by your provider

## 🔒 Security Notes
- Do not commit real passwords or SMTP credentials
- Move inline secrets to environment variables for production
- Hash passwords before saving (consider `bcrypt`); current login compares plaintext

## 📄 License
MIT (see `LICENSE`)

## 🙏 Acknowledgments
- NestJS team
- TypeORM contributors
- PostgreSQL community
- nest-modules/mailer maintainers

---

**Happy Coding! 🚀**