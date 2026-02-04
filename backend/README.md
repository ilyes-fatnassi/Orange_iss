# Backend - NestJS API

This is the backend API for the ISS Orange platform built with NestJS.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Configure Environment
```bash
cp ../.env.example .env
# Edit .env with your database credentials
```

### Run Development Server
```bash
npm run start:dev
```

The API will be available at:
- **API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs

## 📝 Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debugging enabled
- `npm run build` - Build for production
- `npm run start:prod` - Run production build
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Generate test coverage

## 🏗 Project Structure

```
backend/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root module
│   ├── app.controller.ts    # Health check controller
│   └── app.service.ts       # Health check service
├── test/                    # E2E tests
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── nest-cli.json           # NestJS CLI configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 📚 Adding New Modules

Use NestJS CLI to generate modules:

```bash
# Generate a complete resource (CRUD)
nest g resource users

# Generate module only
nest g module auth

# Generate controller
nest g controller auth

# Generate service
nest g service auth
```

## 🔌 Database

The API uses PostgreSQL with TypeORM. Migrations will be added as needed.

## 📖 API Documentation

Once running, visit http://localhost:3000/api/docs for interactive API documentation powered by Swagger.
