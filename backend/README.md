# Authentication System

An advanced, production-ready authentication system for modern web applications with comprehensive security features and email verification.

## Features

✨ **Core Authentication**
- User signup and login functionality
- Email verification with token-based validation
- Secure password reset flow
- JWT-based session management
- HTTP-only cookie storage for tokens

🔒 **Security**
- Password hashing with bcryptjs
- Verification token generation and expiration
- Secure password reset with time-limited tokens
- Token middleware for protected routes
- Input validation and error handling

📧 **Email Integration**
- Automated email verification during signup
- Welcome emails for new users
- Password reset email notifications
- Successful password reset confirmation emails
- Mailtrap integration for reliable email delivery

🛠️ **Developer Experience**
- Clean and organized project structure
- RESTful API endpoints
- Environment configuration with dotenv
- Hot reload with nodemon during development
- Modern ES6+ module syntax

## Tech Stack

**Backend Framework:** Express.js  
**Database:** MongoDB with Mongoose ODM  
**Authentication:** JWT (JSON Web Tokens)  
**Password Hashing:** bcryptjs  
**Email Service:** Mailtrap  
**Runtime:** Node.js  
**Development:** Nodemon  

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Mailtrap account** (for email functionality)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Authentication System"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auth-system
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   
   # Mailtrap Configuration
   MAILTRAP_TOKEN=your_mailtrap_token_here
   MAILTRAP_FROM_EMAIL=your_email@example.com
   MAILTRAP_FROM_NAME=Your App Name
   
   # Frontend URL (for email links)
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## Project Structure

```
authentication-system/
├── backend/
│   ├── index.js                    # Main server entry point
│   ├── controller/
│   │   └── auth.controller.js      # Authentication logic
│   ├── routes/
│   │   └── auth.route.js           # API route definitions
│   ├── middleware/
│   │   └── verifyToken.middleware.js  # JWT verification middleware
│   ├── database/
│   │   ├── connectDB.js            # MongoDB connection
│   │   └── models/
│   │       └── user.model.js       # User schema
│   ├── mailtrap/
│   │   ├── mailtrap.config.js      # Email service configuration
│   │   ├── emails.js               # Email sending logic
│   │   └── emailTemplates.js       # HTML email templates
│   └── utils/
│       └── generateTokenAndSetCookie.js  # JWT token generation
├── package.json
└── README.md
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Create a new user account | ❌ |
| POST | `/api/auth/verify-email` | Verify email with token | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| POST | `/api/auth/logout` | User logout | ❌ |
| GET | `/api/auth/check-auth` | Verify user session | ✅ |
| POST | `/api/auth/forgot-password` | Initiate password reset | ❌ |
| POST | `/api/auth/reset-password/:token` | Reset password with token | ❌ |

### Request/Response Examples

**Signup**
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "createdAt": "2024-03-08T10:30:00.000Z"
  }
}
```

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "user": { ... }
}
```

## Usage

### 1. User Registration Flow
- User sends signup request with name, email, and password
- Password is hashed with bcryptjs
- Verification token is generated and sent via email
- User receives email with verification link
- User clicks link and verifies email with token

### 2. Login Flow
- User provides email and password
- System validates credentials against hashed password
- JWT token is generated and stored in HTTP-only cookie
- User receives authenticated session

### 3. Password Reset Flow
- User requests password reset with email
- Reset token is generated and sent via email
- User clicks reset link and provides new password
- System validates token and updates password
- Confirmation email is sent

## Security Features

🔐 **Password Security**
- Passwords are hashed using bcryptjs with salt rounds
- Bcrypt prevents rainbow table attacks
- Passwords are never stored in plain text

🔐 **Token Security**
- JWT tokens are signed with a secret key
- Tokens are stored in HTTP-only cookies (not accessible via JavaScript)
- CSRF protection through same-site cookie policy
- Token expiration prevents indefinite access

🔐 **Email Verification**
- Time-limited verification tokens (24-hour expiration)
- Tokens are invalidated after successful verification
- Email verification required for account activation

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `MAILTRAP_TOKEN` | Mailtrap API token | `your_token` |
| `MAILTRAP_FROM_EMAIL` | Sender email address | `noreply@app.com` |
| `CLIENT_URL` | Frontend application URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` / `production` |

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Run in production
npm start
```

### Code Quality

- ESLint integration recommended for code quality
- Consider adding pre-commit hooks with husky
- Implement comprehensive test suite with Jest or Mocha

## License

This project is licensed under the ISC License - see [LICENSE](LICENSE) file for details.

## Author

**bye-shuvo** - Created and maintained by the original author

## Contact & Support

For issues, suggestions, or questions, please:
- Open an issue on the repository
- Contact the development team
- Check the documentation for common problems

## Roadmap

- [ ] Two-factor authentication (2FA)
- [ ] OAuth2 integration (Google, GitHub)
- [ ] Rate limiting and brute-force protection
- [ ] Comprehensive unit and integration tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] User profile management endpoints
- [ ] Session management and device tracking

---

**Last Updated:** March 2024  
**Version:** 1.0.0
