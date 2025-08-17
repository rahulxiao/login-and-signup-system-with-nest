# 🚀 User Management System API

A robust and scalable user management system built with **NestJS**, **TypeORM**, and **PostgreSQL**. This system provides comprehensive user authentication, management, and CRUD operations with proper validation and error handling.

## ✨ Features

- 🔐 **User Authentication**: Login and signup with email/username
- 👥 **User Management**: Create, read, update, and delete users
- 🔒 **Data Validation**: Comprehensive input validation using class-validator
- 🗄️ **Database Integration**: PostgreSQL with TypeORM for data persistence
- 📝 **API Documentation**: Complete Postman collection for testing
- 🛡️ **Error Handling**: Robust error handling and response formatting
- 🚀 **RESTful API**: Clean and intuitive REST endpoints

## 🛠️ Tech Stack

- **Backend Framework**: NestJS
- **Database ORM**: TypeORM
- **Database**: PostgreSQL
- **Validation**: class-validator
- **Language**: TypeScript
- **Package Manager**: npm

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** database server
- **pgAdmin** (optional, for database management)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd login-and-signup-syatem
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
Create a PostgreSQL database named `login-signup` and update the database configuration in `src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'login-signup',
  entities: [UserEntity], // Imported from './user/user.entity'
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
})
```

### 4. Environment Variables
Create a `.env` file in the root directory (optional):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=login-signup
PORT=3333
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
npm run start:prod
```

The application will start on `http://localhost:3333`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | User login with username and password |
| `POST` | `/auth/signup` | User registration |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/add/user` | Create a new user with full details |
| `GET` | `/user/:userId` | Get user information by ID |
| `DELETE` | `/user/:userId` | Delete user by ID |

### User Updates
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/update/username` | Update user's username |
| `PUT` | `/update/password` | Update user's password |
| `PUT` | `/update/name` | Update user's full name |
| `PUT` | `/update/mobile` | Update user's mobile number |

## 🔐 JWT Authentication System

### Overview
The system implements a comprehensive JWT (JSON Web Token) authentication system for secure user access and session management.

### JWT Configuration
```typescript
// JWT Module Configuration
JwtModule.register({
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' },
})
```

**Features:**
- **Global JWT Module**: Available throughout the application
- **Token Expiration**: 1-hour validity period
- **Secret Key**: Configurable secret for token signing
- **Stateless Authentication**: No server-side session storage needed

### Authentication Flow

#### 1. **Login Process** (`POST /auth/login`)
```typescript
// Request Body
{
  "username": "admin_user",
  "password": "SecurePass123"
}

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Process:**
1. User submits username/password
2. System validates credentials against database
3. If valid, generates JWT token with user payload
4. Returns access token for subsequent requests

#### 2. **Registration Process** (`POST /auth/signup`)
```typescript
// Request Body
{
  "username": "new_admin",
  "email": "admin@example.com",
  "password": "SecurePass123",
  "name": "Admin User"
}

// Response
{
  "success": true,
  "message": "Admin created successfully",
  "data": { ... }
}
```

**Process:**
1. User submits registration data
2. System validates input using DTOs
3. Creates new admin account in database
4. Returns success confirmation

### JWT Token Structure

#### **Payload Content**
```typescript
{
  "sub": "user_id",        // Subject (user identifier)
  "username": "username",  // Username for identification
  "iat": 1234567890,      // Issued at timestamp
  "exp": 1234571490       // Expiration timestamp
}
```

#### **Token Security Features**
- **Signed Tokens**: Cryptographically signed with secret key
- **Expiration**: Automatic token invalidation after 1 hour
- **Payload Validation**: Ensures token integrity
- **User Identification**: Unique user ID in token payload

### DTOs (Data Transfer Objects)

#### **LoginDto**
```typescript
export class LoginDto {
  username: string;    // Required username
  password: string;    // Required password (min 6 chars)
}
```

#### **SignupDto**
```typescript
export class SignupDto {
  username: string;    // Required username
  email: string;       // Required, email format
  password: string;    // Required, min 6 chars
  name: string;        // Required full name
}
```

### Security Features

#### **Input Validation**
- **Class-validator**: Comprehensive input sanitization
- **Type Safety**: Strong TypeScript typing
- **Field Validation**: Required field enforcement
- **Format Validation**: Email and password format checking

#### **Authentication Security**
- **Password Verification**: Direct comparison (consider hashing for production)
- **User Lookup**: Secure username-based authentication
- **Error Handling**: Generic error messages (security best practice)
- **Token Generation**: Secure JWT signing process

### Implementation Details

#### **Auth Service Methods**
```typescript
export class AuthService {
  // Authenticate user and return JWT token
  async signIn(username: string, password: string): Promise<{ access_token: string }>
  
  // Register new admin user
  async signUp(signupDto: SignupDto): Promise<any>
}
```

#### **Admin Service Integration**
- **User Lookup**: `findByUsername()` method for authentication
- **User Creation**: `createAdmin()` method for registration
- **Data Conversion**: Automatic DTO conversion for compatibility
- **Error Handling**: Comprehensive error management

### Usage Examples

#### **Protected Route Access**
```typescript
// Include JWT token in Authorization header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Token Validation**
```typescript
// JWT token is automatically validated by NestJS guards
// Invalid/expired tokens return 401 Unauthorized
```

### Future Enhancements

#### **Recommended Improvements**
- **Password Hashing**: Implement bcrypt for password security
- **Refresh Tokens**: Add refresh token mechanism
- **Token Blacklisting**: Implement token revocation
- **Rate Limiting**: Add authentication rate limiting
- **Audit Logging**: Track authentication attempts

#### **Production Considerations**
- **Environment Variables**: Move JWT secret to environment
- **HTTPS Only**: Enforce HTTPS in production
- **Token Storage**: Secure client-side token storage
- **Logging**: Comprehensive authentication logging

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(20),
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  uniqueId VARCHAR(50) UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### TypeORM Configuration
The application uses TypeORM with the following configuration:
- **Database Type**: PostgreSQL
- **Synchronization**: Enabled (auto-creates tables)
- **Logging**: Enabled for debugging
- **Auto-load Entities**: Enabled

### Validation
All endpoints use class-validator decorators for:
- Email format validation
- Password strength requirements
- String length constraints
- Required field validation

## 🧪 Testing

### Postman Collection
Import the `postman_collection.json` file into Postman for comprehensive API testing.

### Test Data Examples

#### Login Request
```json
{
  "username": "admin_user",
  "password": "SecurePass123"
}
```

#### Create User Request
```json
{
  "username": "jane_smith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123",
  "name": "Jane Smith",
  "mobile": "+1234567890",
  "role": "user"
}
```

## 📁 Project Structure

```
src/
├── admin/                   # Admin management module
│   ├── admin.controller.ts  # Admin API endpoints
│   ├── admin.service.ts     # Admin business logic
│   ├── admin.entity.ts      # Admin database entity
│   └── admin.dto.ts         # Admin data transfer objects
├── auth/                    # Authentication module
│   ├── auth.controller.ts   # Auth endpoints (login/signup)
│   ├── auth.service.ts      # Auth business logic
│   ├── auth.module.ts       # Auth module configuration
│   ├── login.dto.ts         # Login validation
│   ├── signup.dto.ts        # Signup validation
│   └── constants.ts         # JWT configuration
├── app.module.ts            # Application module configuration
└── main.ts                  # Application entry point
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill existing Node.js processes
   taskkill /F /IM node.exe
   ```

2. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

3. **Tables Not Created**
   - Check TypeORM configuration
   - Verify `synchronize: true` is set
   - Make sure entities are properly imported

### Database Connection Issues
- Verify PostgreSQL service is running
- Check firewall settings
- Ensure database user has proper permissions

## 📝 Response Format

All API endpoints return consistent response formats:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- TypeORM contributors for the excellent ORM
- PostgreSQL community for the robust database

---

**Happy Coding! 🚀**