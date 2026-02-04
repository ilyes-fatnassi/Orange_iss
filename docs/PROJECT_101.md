# ISS Orange - Complete 101 Crash Course 🎓

> **For:** Junior Developers & New Team Members  
> **Goal:** Understand every file, every choice, and how everything works together

---

## 📚 Table of Contents

1. [What Is This Project?](#what-is-this-project)
2. [The Big Picture - Architecture](#the-big-picture)
3. [Technology Stack Explained](#technology-stack-explained)
4. [Project Structure Deep Dive](#project-structure-deep-dive)
5. [Backend (NestJS) - Complete Guide](#backend-nestjs---complete-guide)
6. [Frontend (Angular) - Complete Guide](#frontend-angular---complete-guide)
7. [Database - PostgreSQL Setup](#database---postgresql-setup)
8. [Docker - Containerization](#docker---containerization)
9. [Git Workflow - How We Collaborate](#git-workflow---how-we-collaborate)
10. [Development Workflow - Step by Step](#development-workflow---step-by-step)
11. [Common Tasks & How-Tos](#common-tasks--how-tos)
12. [Glossary - Technical Terms](#glossary---technical-terms)

---

## What Is This Project?

### The Problem We're Solving

**Orange Digital Center** (ODC) receives hundreds of internship and PFE (Projet de Fin d'Études = Final Year Project) applications. Currently:
- ❌ Applications are scattered (emails, forms, etc.)
- ❌ Manual review takes forever
- ❌ Hard to compare candidates fairly
- ❌ Students don't know why they were/weren't selected

### Our Solution

We're building a **centralized web platform** that:
1. **Students** can submit applications and upload CVs
2. **Coordinators** can post offers and manage applications
3. **AI** automatically analyzes CVs and ranks candidates
4. **Everyone** sees transparent explanations of the AI's decisions

### Key Features

```
┌─────────────────────────────────────────────────────┐
│                  ISS Orange Platform                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📝 Offer Management    →  Post internship offers   │
│  📤 Application System  →  Students apply online    │
│  🤖 AI CV Analysis      →  Parse and analyze CVs   │
│  📊 Smart Ranking       →  AI ranks candidates      │
│  💡 Explainable AI      →  Shows WHY ranked         │
│  👥 User Management     →  Different user roles     │
│  ✅ Evaluation System   →  Track and evaluate       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## The Big Picture

### System Architecture

Think of our application like a restaurant:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │ ───> │   Backend    │ ───> │   Database   │
│   (Angular)  │ <─── │   (NestJS)   │ <─── │ (PostgreSQL) │
│              │      │              │      │              │
│  What users  │      │  Business    │      │  Where we    │
│  see & click │      │  logic & API │      │  store data  │
└──────────────┘      └──────────────┘      └──────────────┘
     Browser              Server                 Server
```

**Analogy:**
- **Frontend** = Restaurant menu (what customers see and interact with)
- **Backend** = Kitchen (prepares the food/data)
- **Database** = Pantry (stores all ingredients/data)

### How They Communicate

```
User clicks button → Frontend sends HTTP request → Backend processes
                                                  ↓
User sees result ← Frontend receives response ← Backend queries database
```

**Example Flow: User Login**

1. User enters email/password in Angular form
2. Angular sends POST request to `http://localhost:3000/auth/login`
3. NestJS backend receives request
4. Backend checks database for user
5. Backend creates JWT token (like a passport)
6. Backend sends token back to Angular
7. Angular stores token and shows dashboard

---

## Technology Stack Explained

### Why These Technologies?

#### 1. **Frontend: Angular**

**What is Angular?**
- A framework for building web applications
- Made by Google
- Uses TypeScript (JavaScript with types)

**Why Angular?**
- ✅ **Recommended by Orange** (they use it)
- ✅ **Component-based** (build UI like LEGO blocks)
- ✅ **TypeScript** (catch errors before running code)
- ✅ **Built-in routing** (navigate between pages)
- ✅ **Strong community** (lots of help available)

**Real Example:**
```typescript
// A login component - like a LEGO block
@Component({
  selector: 'app-login',  // HTML tag: <app-login>
  template: `
    <form (submit)="login()">
      <input [(ngModel)]="email" />
      <input [(ngModel)]="password" />
      <button>Login</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  
  login() {
    // Send to backend
  }
}
```

#### 2. **Backend: NestJS**

**What is NestJS?**
- A framework for building server applications
- Built on top of Node.js (JavaScript on the server)
- Uses TypeScript
- Similar structure to Angular

**Why NestJS?**
- ✅ **Recommended by Orange** (pairs well with Angular)
- ✅ **TypeScript** (same language as frontend)
- ✅ **Modular** (organize code into modules)
- ✅ **Built-in validation** (check data automatically)
- ✅ **Swagger** (auto-generate API documentation)

**Real Example:**
```typescript
// A controller - handles HTTP requests
@Controller('offers')
export class OffersController {
  @Get()  // GET /offers
  findAll() {
    return this.offersService.getAllOffers();
  }
  
  @Post()  // POST /offers
  create(@Body() data: CreateOfferDto) {
    return this.offersService.createOffer(data);
  }
}
```

#### 3. **Database: PostgreSQL**

**What is PostgreSQL?**
- A database system (stores data in tables)
- Like Excel, but much more powerful
- Handles millions of rows efficiently

**Why PostgreSQL?**
- ✅ **Recommended by Orange**
- ✅ **Reliable** (used by major companies)
- ✅ **Relational** (data connected with relationships)
- ✅ **Free & open-source**

**Example Table:**
```sql
-- Users table
┌────┬─────────────────────┬──────────────┬──────────────┐
│ id │ email               │ role         │ created_at   │
├────┼─────────────────────┼──────────────┼──────────────┤
│ 1  │ john@email.com      │ student      │ 2026-01-15   │
│ 2  │ admin@orange.com    │ admin        │ 2026-01-10   │
│ 3  │ prof@university.edu │ coordinator  │ 2026-01-12   │
└────┴─────────────────────┴──────────────┴──────────────┘
```

#### 4. **Docker**

**What is Docker?**
- Packages your application with everything it needs
- Like a shipping container for software
- Runs the same everywhere (your PC, teammate's PC, server)

**Why Docker?**
- ✅ **Consistency** (works on everyone's computer)
- ✅ **Easy setup** (one command starts everything)
- ✅ **Isolated** (doesn't mess with your system)

**Analogy:**
Imagine shipping a cake:
- ❌ Without Docker: Ship ingredients, hope they assemble it correctly
- ✅ With Docker: Ship fully assembled cake in protective container

---

## Project Structure Deep Dive

### The Root Directory

```
iss_orange/                    ← Your project folder
│
├── backend/                   ← NestJS API (server code)
├── frontend/                  ← Angular app (what users see)
├── docs/                      ← Documentation for the team
├── .github/                   ← GitHub templates (issues, PRs)
│
├── docker-compose.yml         ← Runs all services together
├── .env.example               ← Environment variables template
├── .gitignore                 ← Files Git should ignore
│
├── start.ps1                  ← Windows startup script
├── start.sh                   ← Linux/Mac startup script
│
├── README.md                  ← Project overview
├── CONTRIBUTING.md            ← How to contribute
└── SETUP_COMPLETE.md          ← Setup guide
```

### Why This Structure?

**Monorepo Pattern**
- Frontend and backend in ONE repository
- Easier to keep in sync
- Single place for all code

**Alternative (NOT used):**
```
❌ Separate repositories:
   - iss-orange-frontend (repo 1)
   - iss-orange-backend (repo 2)
   Problem: Hard to coordinate changes
```

---

## Backend (NestJS) - Complete Guide

### File-by-File Explanation

#### 📁 `backend/` Folder Structure

```
backend/
├── src/                      ← All source code
│   ├── main.ts              ← Entry point (starts the app)
│   ├── app.module.ts        ← Root module (connects everything)
│   ├── app.controller.ts    ← Health check endpoint
│   └── app.service.ts       ← Health check logic
│
├── node_modules/             ← Installed packages (auto-generated)
├── dist/                     ← Compiled JavaScript (auto-generated)
│
├── package.json              ← Dependencies & scripts
├── tsconfig.json             ← TypeScript configuration
├── nest-cli.json             ← NestJS CLI configuration
├── .eslintrc.js             ← Code style rules
├── .prettierrc              ← Code formatting rules
├── Dockerfile                ← Production Docker image
├── Dockerfile.dev            ← Development Docker image
└── README.md                 ← Backend documentation
```

### Understanding `package.json`

**What is it?**
- Lists all the libraries (dependencies) your project needs
- Defines scripts (commands) you can run

```json
{
  "name": "iss-orange-backend",
  "version": "1.0.0",
  "scripts": {
    "start:dev": "nest start --watch",  // Start with auto-reload
    "build": "nest build",               // Compile TypeScript to JavaScript
    "test": "jest"                       // Run tests
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",        // Core NestJS
    "typeorm": "^0.3.17",               // Database ORM
    "pg": "^8.11.0"                     // PostgreSQL driver
  }
}
```

**Key Scripts:**
```bash
npm run start:dev   # Development (watches for changes)
npm run build       # Production build
npm run test        # Run tests
npm run lint        # Check code style
```

### Understanding `main.ts` (Entry Point)

This is where your application **starts**. Like the `main()` function in C or Java.

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. Create NestJS application
  const app = await NestFactory.create(AppModule);

  // 2. Enable CORS (allows frontend to call backend)
  app.enableCors({
    origin: 'http://localhost:4200',  // Angular runs here
    credentials: true,
  });

  // 3. Add automatic validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Remove unknown properties
      transform: true,        // Convert types automatically
      forbidNonWhitelisted: true,  // Throw error if extra fields
    }),
  );

  // 4. Setup Swagger (API documentation)
  const config = new DocumentBuilder()
    .setTitle('ISS Orange API')
    .setDescription('API for Internship & PFE Management')
    .setVersion('1.0')
    .addBearerAuth()  // Support JWT tokens in docs
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 5. Start server on port 3000
  const port = 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();  // Start the application!
```

**Line-by-Line Explanation:**

**Line 1-4:** Import necessary modules
- `NestFactory`: Creates the application
- `ValidationPipe`: Validates incoming data
- `SwaggerModule`: Generates API documentation
- `AppModule`: Our root module (explained next)

**Line 7:** `async function bootstrap()` - Async because starting a server takes time

**Line 8:** Create the NestJS application from AppModule

**Line 11-14:** Enable CORS
- **CORS** = Cross-Origin Resource Sharing
- Without this, browser blocks Angular (port 4200) from calling backend (port 3000)
- **Why?** Security - browsers block cross-domain requests by default

**Line 17-22:** Validation Pipeline
- **Automatically validates** all incoming data
- If someone sends `{ age: "twenty" }` instead of `{ age: 20 }`, it throws an error
- Protects against bad data

**Line 25-33:** Swagger Setup
- **Auto-generates** API documentation
- Visit `http://localhost:3000/api/docs` to see it
- Can test API endpoints directly in browser

**Line 36-37:** Start listening on port 3000

### Understanding `app.module.ts` (Root Module)

**What is a Module?**
- A module is a **container** that groups related code
- Like a folder for organizing your application parts

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Configuration Module (loads .env file)
    ConfigModule.forRoot({
      isGlobal: true,        // Available everywhere
      envFilePath: '.env',   // Load from .env file
    }),

    // 2. Database Connection Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'iss_user'),
        password: configService.get('DATABASE_PASSWORD', 'changeme'),
        database: configService.get('DATABASE_NAME', 'iss_orange'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,  // Auto-create tables (dev only!)
        logging: true,      // Log SQL queries
      }),
      inject: [ConfigService],
    }),

    // 3. Feature Modules (will add later)
    // AuthModule,
    // UsersModule,
    // OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Breaking It Down:**

**@Module Decorator:**
- `imports`: Other modules this module needs
- `controllers`: HTTP endpoint handlers
- `providers`: Services with business logic

**ConfigModule:**
```typescript
ConfigModule.forRoot({
  isGlobal: true,    // Can use anywhere without importing
  envFilePath: '.env',
})
```
- Reads environment variables from `.env` file
- Example: `DATABASE_HOST=localhost`

**TypeOrmModule:**
- Connects to PostgreSQL database
- `entities`: Auto-discovers database models
- `synchronize: true`: Auto-creates tables (DANGEROUS in production!)

**Why async (forRootAsync)?**
- Needs to wait for ConfigModule to load first
- Then reads config values for database connection

### Understanding `app.controller.ts` (HTTP Handler)

**What is a Controller?**
- Handles **HTTP requests**
- Like a waiter taking orders and serving food

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')  // Groups in Swagger docs
@Controller()       // Decorator makes this a controller
export class AppController {
  // Inject the service (dependency injection)
  constructor(private readonly appService: AppService) {}

  @Get()  // Handles GET request to /
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth(): { message: string; timestamp: string } {
    return this.appService.getHealth();
  }
}
```

**Concepts:**

**Decorators** (the @ symbols):
- `@Controller()`: Marks class as a controller
- `@Get()`: Handles GET requests
- `@Post()`: Handles POST requests
- `@ApiTags()`: For Swagger documentation

**Dependency Injection:**
```typescript
constructor(private readonly appService: AppService) {}
```
- NestJS **automatically creates** AppService and injects it
- You don't `new AppService()` manually
- **Why?** Makes testing easier, loose coupling

**Route Example:**
```typescript
@Controller('users')       // Base path: /users
export class UsersController {
  @Get()                   // GET /users
  @Get(':id')              // GET /users/123
  @Post()                  // POST /users
  @Put(':id')              // PUT /users/123
  @Delete(':id')           // DELETE /users/123
}
```

### Understanding `app.service.ts` (Business Logic)

**What is a Service?**
- Contains **business logic**
- Controllers call services
- Services can call other services or database

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()  // Makes it available for dependency injection
export class AppService {
  getHealth(): { message: string; timestamp: string } {
    return {
      message: 'ISS Orange API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
```

**Why Separate Controller and Service?**

```
❌ BAD (everything in controller):
Controller handles HTTP + business logic + database

✅ GOOD (separation of concerns):
Controller: handles HTTP requests/responses
Service: business logic
Repository: database operations
```

**Benefits:**
1. **Testable**: Can test service without HTTP
2. **Reusable**: Multiple controllers can use same service
3. **Maintainable**: Each class has one responsibility

### Configuration Files Explained

#### `tsconfig.json` (TypeScript Configuration)

```json
{
  "compilerOptions": {
    "module": "commonjs",              // Module system
    "target": "ES2021",                // Compile to ES2021
    "experimentalDecorators": true,    // Enable @ decorators
    "emitDecoratorMetadata": true,     // Needed for DI
    "sourceMap": true,                 // For debugging
    "outDir": "./dist",                // Output folder
    "baseUrl": "./",                   // Import base path
    "strict": false                    // Not super strict (for learning)
  }
}
```

**Key Options:**
- `experimentalDecorators`: Required for `@Controller()`, `@Injectable()`
- `sourceMap`: Lets you debug TypeScript (not compiled JavaScript)
- `outDir`: Where compiled `.js` files go

#### `.eslintrc.js` (Code Style Rules)

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',  // Allow 'any' type
  },
};
```

**What is ESLint?**
- Checks your code for problems
- Enforces consistent style
- Catches bugs before running code

**Example:**
```typescript
// ❌ ESLint will complain:
var x = 1;  // Use 'const' or 'let', not 'var'

// ✅ ESLint is happy:
const x = 1;
```

#### `.prettierrc` (Code Formatting)

```json
{
  "singleQuote": true,    // Use 'hello' not "hello"
  "trailingComma": "all", // Add commas at end of arrays/objects
  "semi": true,           // Require semicolons
  "printWidth": 100,      // Max line length
  "tabWidth": 2           // 2 spaces for indentation
}
```

**What is Prettier?**
- **Automatically formats** your code
- Everyone's code looks the same
- No more debates about style

**Example:**
```typescript
// Before Prettier:
const user={name:"John",age:25,email:"john@email.com"}

// After Prettier:
const user = {
  name: 'John',
  age: 25,
  email: 'john@email.com',
};
```

---

## Frontend (Angular) - Complete Guide

### File-by-File Explanation

#### 📁 `frontend/` Folder Structure

```
frontend/
├── src/                           ← Source code
│   ├── app/                       ← Application code
│   │   ├── app.component.ts       ← Root component
│   │   ├── app.config.ts          ← App configuration
│   │   └── app.routes.ts          ← Route definitions
│   │
│   ├── environments/              ← Environment configs
│   │   ├── environment.ts         ← Development
│   │   └── environment.prod.ts    ← Production
│   │
│   ├── assets/                    ← Images, fonts, etc.
│   ├── index.html                 ← HTML entry point
│   ├── main.ts                    ← App entry point
│   └── styles.scss                ← Global styles
│
├── node_modules/                  ← Installed packages
├── dist/                          ← Built files (production)
│
├── angular.json                   ← Angular CLI config
├── package.json                   ← Dependencies & scripts
├── tsconfig.json                  ← TypeScript config
└── README.md                      ← Frontend documentation
```

### Understanding `package.json`

```json
{
  "name": "iss-orange-frontend",
  "scripts": {
    "start": "ng serve",           // Start dev server
    "build": "ng build",           // Build for production
    "test": "ng test",             // Run tests
    "lint": "ng lint"              // Check code
  },
  "dependencies": {
    "@angular/core": "^17.0.0",    // Angular framework
    "@angular/router": "^17.0.0",  // Routing
    "rxjs": "~7.8.0"               // Reactive programming
  }
}
```

**Key Scripts:**
```bash
npm start      # Runs ng serve (http://localhost:4200)
npm run build  # Creates production files in dist/
npm test       # Runs unit tests
```

### Understanding `main.ts` (Entry Point)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Bootstrap = Start the Angular application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**What happens:**
1. Import the root component (`AppComponent`)
2. Import configuration (`appConfig`)
3. Bootstrap (start) the application
4. If error, log it to console

**Old vs New Angular:**
```typescript
// ❌ OLD WAY (modules):
// Had to create AppModule with @NgModule

// ✅ NEW WAY (standalone - Angular 17):
// Components are standalone, no module needed
```

### Understanding `app.component.ts` (Root Component)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',          // HTML tag: <app-root>
  standalone: true,              // Standalone component (no module)
  imports: [CommonModule, RouterOutlet],  // Other components to use
  template: `
    <div class="app-container">
      <header>
        <h1>🎓 ISS Orange</h1>
        <p>Internship & PFE Management Platform</p>
      </header>
      <main>
        <router-outlet></router-outlet>  // Where routes load
        <div class="welcome-message">
          <h2>Welcome to ISS Orange!</h2>
          <p>Development environment ready! 🚀</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      padding: 20px;
    }
    header {
      background: white;
      padding: 30px;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'iss-orange-frontend';
}
```

**Breaking It Down:**

**@Component Decorator:**
- `selector`: HTML tag name (`<app-root></app-root>`)
- `standalone`: No module required (Angular 17 feature)
- `imports`: Components/modules this component uses
- `template`: HTML template (can also use `templateUrl: './file.html'`)
- `styles`: CSS styles (can also use `styleUrls: ['./file.scss']`)

**Component Class:**
```typescript
export class AppComponent {
  title = 'iss-orange-frontend';  // Property
  
  // Can add methods:
  onClick() {
    console.log('Button clicked!');
  }
}
```

**Template Syntax:**
```html
<!-- Display property -->
<h1>{{ title }}</h1>

<!-- Event binding -->
<button (click)="onClick()">Click Me</button>

<!-- Two-way binding -->
<input [(ngModel)]="title" />

<!-- Conditional rendering -->
<div *ngIf="isLoggedIn">Welcome!</div>

<!-- Loop -->
<div *ngFor="let item of items">{{ item.name }}</div>
```

### Understanding `app.config.ts` (Configuration)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),        // Enable routing
    provideHttpClient()           // Enable HTTP calls
  ]
};
```

**What are Providers?**
- **Services** that Angular makes available throughout the app
- `provideRouter`: Enables navigation between pages
- `provideHttpClient`: Enables API calls to backend

**Example without providers:**
```typescript
// ❌ This would fail without provideHttpClient:
this.http.get('http://localhost:3000/api/users')
```

### Understanding `app.routes.ts` (Routing)

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Will add routes here:
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
];
```

**Routing Example:**
```typescript
export const routes: Routes = [
  { 
    path: '',                    // http://localhost:4200/
    component: HomeComponent 
  },
  { 
    path: 'login',               // http://localhost:4200/login
    component: LoginComponent 
  },
  { 
    path: 'offers',              // http://localhost:4200/offers
    component: OffersListComponent 
  },
  { 
    path: 'offers/:id',          // http://localhost:4200/offers/123
    component: OfferDetailComponent 
  },
  { 
    path: '**',                  // Any other URL (404)
    component: NotFoundComponent 
  }
];
```

**How to Navigate:**
```typescript
// In template:
<a routerLink="/login">Login</a>
<a [routerLink]="['/offers', offerId]">View Offer</a>

// In code:
constructor(private router: Router) {}

goToLogin() {
  this.router.navigate(['/login']);
}
```

### Understanding `environment.ts` (Environment Variables)

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',  // Local backend
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.issorange.com',  // Production backend
};
```

**How to Use:**
```typescript
import { environment } from '../environments/environment';

// Make API call to correct URL:
this.http.get(`${environment.apiUrl}/api/users`)
```

**Why?**
- Different URLs for dev vs production
- Can have different settings per environment
- Angular automatically uses correct file when building

### Understanding `styles.scss` (Global Styles)

```scss
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
}

/* Orange Brand Colors */
:root {
  --orange-primary: #FF7900;
  --orange-dark: #CD3C14;
  --white: #FFFFFF;
}
```

**What is SCSS?**
- **S**assy **CSS** = CSS with superpowers
- Supports variables, nesting, functions

**Example:**
```scss
// CSS Variables (use anywhere)
:root {
  --primary-color: #FF7900;
}

.button {
  background: var(--primary-color);
}

// SCSS Nesting
.card {
  padding: 20px;
  
  h2 {
    color: blue;
  }
  
  .button {
    background: red;
  }
}

// Compiles to:
// .card { padding: 20px; }
// .card h2 { color: blue; }
// .card .button { background: red; }
```

### Configuration Files Explained

#### `angular.json` (Angular CLI Configuration)

```json
{
  "projects": {
    "iss-orange-frontend": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/iss-orange-frontend",  // Build output
            "index": "src/index.html",                  // HTML entry
            "browser": "src/main.ts",                   // JS entry
            "styles": ["src/styles.scss"],              // Global styles
            "assets": ["src/assets", "src/favicon.ico"] // Copy these
          }
        },
        "serve": {
          "options": {
            "port": 4200  // Dev server port
          }
        }
      }
    }
  }
}
```

**What does this do?**
- Tells Angular CLI how to build your app
- Where to find files
- What port to use
- What to include in build

#### `tsconfig.json` (TypeScript Configuration)

```json
{
  "compilerOptions": {
    "target": "ES2022",                    // Compile to ES2022
    "module": "ES2022",                    // Use ES modules
    "lib": ["ES2022", "dom"],              // Available APIs
    "experimentalDecorators": true,        // Enable decorators
    "strict": true,                        // Strict type checking
    "moduleResolution": "node"             // How to find modules
  }
}
```

**Important for Angular:**
- `experimentalDecorators`: Required for `@Component`, `@Injectable`
- `strict: true`: Catch more errors (good practice)
- `lib: ["dom"]`: Browser APIs available (window, document, etc.)

---

## Database - PostgreSQL Setup

### What is a Database?

Think of it as an **Excel spreadsheet** but:
- ✅ Handles millions of rows
- ✅ Fast searches
- ✅ Concurrent users
- ✅ Data relationships
- ✅ Transactions (all-or-nothing operations)

### Database Tables

```sql
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,           -- Auto-incrementing ID
  email VARCHAR(255) NOT NULL,     -- Email (required)
  password VARCHAR(255) NOT NULL,  -- Hashed password
  role VARCHAR(50) NOT NULL,       -- 'student', 'coordinator', 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Offers Table
CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  skills_required TEXT[],          -- Array of skills
  created_by INTEGER REFERENCES users(id),  -- Foreign key
  created_at TIMESTAMP DEFAULT NOW()
);

-- Applications Table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  offer_id INTEGER REFERENCES offers(id),
  student_id INTEGER REFERENCES users(id),
  cv_path VARCHAR(255),
  status VARCHAR(50),              -- 'pending', 'accepted', 'rejected'
  ai_score FLOAT,                  -- AI ranking score
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Relationships

```
users (1) ──── creates ──── (many) offers
users (1) ──── submits ──── (many) applications
offers (1) ──── has ──── (many) applications
```

**Example:**
```
User #1 (admin@orange.com) creates → Offer #5 (Backend Internship)
User #2 (student@email.com) applies → Application #10 (for Offer #5)
```

### TypeORM (Database in TypeScript)

Instead of writing SQL, use TypeScript classes:

```typescript
// User Entity (represents users table)
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  // Relationships
  @OneToMany(() => Offer, offer => offer.creator)
  offers: Offer[];
}

// Using it:
const user = new User();
user.email = 'john@email.com';
user.password = hashedPassword;
user.role = 'student';
await userRepository.save(user);  // INSERT INTO users...

// Query:
const users = await userRepository.find();  // SELECT * FROM users
const user = await userRepository.findOne({ where: { email: 'john@email.com' }});
```

**Benefits:**
- ✅ Type-safe (TypeScript checks)
- ✅ No SQL injection risks
- ✅ Auto-generates migrations
- ✅ Easier to refactor

---

## Docker - Containerization

### What is Docker? (Simple Explanation)

**Without Docker:**
```
Your PC: Windows + Node v18 + PostgreSQL 14 → ✅ Works
Teammate's PC: Mac + Node v16 + PostgreSQL 12 → ❌ Breaks
Server: Linux + Node v20 + PostgreSQL 15 → ❌ Different behavior
```

**With Docker:**
```
Everyone runs the SAME container:
  - Exact Node version
  - Exact PostgreSQL version
  - Same configuration
  → ✅ Works everywhere identically
```

### `docker-compose.yml` Explained

This file defines **all services** needed to run your app:

```yaml
version: '3.8'

services:
  # Service 1: PostgreSQL Database
  postgres:
    image: postgres:14-alpine           # Use PostgreSQL 14
    container_name: iss_orange_db
    environment:
      POSTGRES_DB: iss_orange           # Database name
      POSTGRES_USER: iss_user           # Username
      POSTGRES_PASSWORD: changeme       # Password
    ports:
      - "5432:5432"                     # Expose port 5432
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist data
    healthcheck:                        # Check if ready
      test: ["CMD-SHELL", "pg_isready -U iss_user"]
      interval: 10s

  # Service 2: NestJS Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev        # Use dev Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_HOST: postgres           # Connect to postgres service
      DATABASE_PORT: 5432
    depends_on:
      postgres:
        condition: service_healthy      # Wait for DB to be ready
    volumes:
      - ./backend:/app                  # Sync code for hot reload
      - /app/node_modules               # Don't sync node_modules

  # Service 3: Angular Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "4200:4200"
    depends_on:
      - backend                         # Wait for backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:                        # Named volume for DB data
```

**Key Concepts:**

**Services:**
- Each service = one container
- Services can talk to each other by name
- Example: Backend connects to `postgres` (not `localhost`)

**Ports:**
```yaml
ports:
  - "3000:3000"  # Host port : Container port
```
- Left side (3000): Your computer
- Right side (3000): Inside container
- Access via `localhost:3000`

**Volumes:**
```yaml
volumes:
  - ./backend:/app  # Sync local folder with container
```
- Changes to files on your PC → instantly in container
- Enables **hot reload**

**depends_on:**
```yaml
depends_on:
  postgres:
    condition: service_healthy
```
- Backend waits for database to be ready
- Prevents connection errors

**Environment Variables:**
```yaml
environment:
  DATABASE_HOST: postgres  # Service name, not localhost!
```

### `Dockerfile.dev` Explained

```dockerfile
# Start from Node 20 image (has Node.js pre-installed)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run when container starts
CMD ["npm", "run", "start:dev"]
```

**Line-by-Line:**

**FROM node:20-alpine:**
- Start with base image that has Node.js 20
- `alpine` = lightweight Linux (small size)

**WORKDIR /app:**
- Create and enter `/app` directory
- All subsequent commands run from here

**COPY package*.json ./:**
- Copy `package.json` and `package-lock.json`
- Do this BEFORE copying code (caching optimization)

**RUN npm install:**
- Install all dependencies
- Creates `node_modules/`

**COPY . .:**
- Copy all remaining files

**EXPOSE 3000:**
- Documents that container listens on port 3000
- Informational (doesn't actually open port)

**CMD ["npm", "run", "start:dev"]:**
- Command to run when container starts
- Equivalent to running `npm run start:dev` in terminal

### Docker Commands

```bash
# Start all services
docker-compose up

# Start in background (detached)
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# View logs
docker-compose logs -f           # All services
docker-compose logs -f backend   # Just backend

# List running containers
docker-compose ps

# Restart a service
docker-compose restart backend

# Rebuild containers (after Dockerfile changes)
docker-compose up --build

# Execute command in running container
docker-compose exec backend npm run test

# Access container shell
docker-compose exec backend sh
```

---

## Git Workflow - How We Collaborate

### Why Git?

**Problem without version control:**
```
John: "I changed the login function"
Sarah: "Me too! Which version do we use?"
Team: *chaos ensues*
```

**With Git:**
```
John: Creates branch → makes changes → creates PR
Sarah: Reviews PR → suggests improvements
Team: Merges approved PR → everyone gets update
```

### Branch Strategy

```
main (production)
 ↑
 └─ dev (integration)
     ↑
     ├─ feature/25-login-page (John)
     ├─ feature/32-cv-upload (Sarah)
     └─ fix/40-validation-bug (Mike)
```

**Branch Types:**

1. **main**: Production-ready code
   - Protected (can't push directly)
   - Only merge from `dev` after testing

2. **dev**: Development integration
   - Where all features come together
   - Must be stable

3. **feature/X-name**: New features
   - One feature per branch
   - Example: `feature/25-user-authentication`

4. **fix/X-name**: Bug fixes
   - One bug per branch
   - Example: `fix/32-login-validation`

### Git Workflow (Step-by-Step)

**Step 1: Get Latest Code**
```bash
git checkout dev
git pull origin dev
```

**Step 2: Create Feature Branch**
```bash
git checkout -b feature/25-login-page
```

**Step 3: Make Changes**
```bash
# Edit files...
# Test your changes...
```

**Step 4: Commit Changes**
```bash
git add .
git commit -m "feat: add login page with validation (#25)"
```

**Step 5: Push to GitHub**
```bash
git push origin feature/25-login-page
```

**Step 6: Create Pull Request**
- Go to GitHub
- Click "Pull requests" → "New pull request"
- Base: `dev`, Compare: `feature/25-login-page`
- Fill out template:
  ```markdown
  ## Description
  Added login page with email/password validation
  
  ## Related Issue
  Closes #25
  
  ## Testing
  - [x] Form validation works
  - [x] API integration works
  - [x] Error messages display correctly
  ```

**Step 7: Code Review**
- Teammate reviews your code
- Leaves comments/suggestions
- You make requested changes:
  ```bash
  # Make changes
  git add .
  git commit -m "fix: address review comments (#25)"
  git push origin feature/25-login-page
  # PR automatically updates
  ```

**Step 8: Merge**
- Once approved, click "Merge pull request"
- Delete feature branch
- Ticket automatically closes (because you wrote "Closes #25")

**Step 9: Update Local**
```bash
git checkout dev
git pull origin dev
git branch -d feature/25-login-page
```

### Commit Message Format

```
type: description (#ticket-number)

Examples:
feat: add CV upload functionality (#15)
fix: resolve authentication token expiration (#23)
docs: update API documentation (#8)
style: format code according to style guide (#12)
refactor: restructure user service (#18)
test: add unit tests for CV parser (#20)
chore: update dependencies (#5)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Common Git Commands

```bash
# Check status
git status

# See what changed
git diff

# See commit history
git log --oneline

# Discard changes to file
git checkout -- file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Stash changes temporarily
git stash
git stash pop

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch

# Update from remote
git pull origin dev

# Push to remote
git push origin branch-name
```

---

## Development Workflow - Step by Step

### The Complete Development Cycle

```
1. Pick Ticket → 2. Create Branch → 3. Code → 4. Test → 5. Commit → 6. Push → 7. PR → 8. Review → 9. Merge → Repeat
```

### Example: Building Login Feature

**Ticket #25: Implement User Login**

#### Step 1: Understand Requirements

Read the ticket:
```markdown
Title: Implement User Login

Description:
As a user, I want to log in with email and password 
so that I can access my account.

Acceptance Criteria:
- [ ] Login form with email and password fields
- [ ] Email validation
- [ ] Password minimum 8 characters
- [ ] Show error messages
- [ ] On success, redirect to dashboard
- [ ] Store JWT token

Technical Notes:
- Backend endpoint: POST /auth/login
- Frontend: Create LoginComponent
- Use reactive forms
```

#### Step 2: Create Branch

```bash
git checkout dev
git pull origin dev
git checkout -b feature/25-user-login
```

#### Step 3: Backend Implementation

**Create Auth Module:**
```bash
cd backend
nest generate module auth
nest generate service auth
nest generate controller auth
```

**Create DTOs (Data Transfer Objects):**
```typescript
// dto/login.dto.ts
export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
```

**Create Auth Service:**
```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Find user by email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
```

**Create Auth Controller:**
```typescript
// auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

**Test Backend:**
```bash
npm run start:dev
# Open http://localhost:3000/api/docs
# Test /auth/login endpoint
```

#### Step 4: Frontend Implementation

**Generate Login Component:**
```bash
cd frontend
ng generate component pages/login
```

**Create Login Component:**
```typescript
// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" />
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            <span class="error">Invalid email</span>
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" formControlName="password" />
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            <span class="error">Password must be at least 8 characters</span>
          </div>
        </div>

        <div *ngIf="errorMessage" class="error">
          {{ errorMessage }}
        </div>

        <button type="submit" [disabled]="loginForm.invalid || loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 30px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .error {
      color: red;
      font-size: 14px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Store token
          localStorage.setItem('token', response.access_token);
          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
```

**Create Auth Service:**
```bash
ng generate service services/auth
```

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
```

**Add Route:**
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
```

**Test Frontend:**
```bash
npm start
# Open http://localhost:4200/login
# Test form validation and submission
```

#### Step 5: Commit and Push

```bash
# Backend changes
cd backend
git add .
git commit -m "feat: implement login endpoint with JWT (#25)"

# Frontend changes
cd ../frontend
git add .
git commit -m "feat: create login component and auth service (#25)"

# All changes
cd ..
git push origin feature/25-user-login
```

#### Step 6: Create Pull Request

On GitHub:
```markdown
## Description
Implemented user login functionality with:
- Backend: JWT authentication endpoint
- Frontend: Reactive login form
- Validation on both sides
- Error handling

## Related Issue
Closes #25

## Testing
- [x] Backend endpoint works in Swagger
- [x] Form validation works
- [x] Invalid credentials show error
- [x] Valid login redirects to dashboard
- [x] JWT token stored in localStorage
- [x] Error messages display correctly

## Screenshots
[Add login form screenshot]
[Add Swagger docs screenshot]
```

#### Step 7: Code Review

Teammate reviews and comments:
```
"Looks good! Small suggestion: add loading spinner"
```

You respond:
```bash
# Add spinner
git add .
git commit -m "feat: add loading spinner to login button (#25)"
git push origin feature/25-user-login
```

#### Step 8: Merge

- PR approved ✅
- Click "Merge pull request"
- Ticket #25 automatically closes
- Delete branch `feature/25-user-login`

#### Step 9: Cleanup

```bash
git checkout dev
git pull origin dev
git branch -d feature/25-user-login
```

#### Step 10: Pick Next Ticket! 🎉

---

## Common Tasks & How-Tos

### How to Add a New API Endpoint

**1. Generate Resource (CRUD):**
```bash
cd backend
nest generate resource offers
# Choose: REST API
# Generate CRUD entry points: Yes
```

**2. This creates:**
```
offers/
├── dto/
│   ├── create-offer.dto.ts
│   └── update-offer.dto.ts
├── entities/
│   └── offer.entity.ts
├── offers.controller.ts
├── offers.service.ts
└── offers.module.ts
```

**3. Define Entity:**
```typescript
// offer.entity.ts
@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  skills_required: string[];

  @CreateDateColumn()
  created_at: Date;
}
```

**4. Define DTOs:**
```typescript
// create-offer.dto.ts
export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  skills_required: string[];
}
```

**5. Test:**
```bash
npm run start:dev
# Open http://localhost:3000/api/docs
# Test your new endpoints
```

### How to Create an Angular Component

**1. Generate:**
```bash
cd frontend
ng generate component components/offer-card
```

**2. This creates:**
```
offer-card/
├── offer-card.component.ts
├── offer-card.component.html
├── offer-card.component.scss
└── offer-card.component.spec.ts
```

**3. Use Component:**
```typescript
// In parent component:
import { OfferCardComponent } from './components/offer-card/offer-card.component';

@Component({
  imports: [OfferCardComponent],
  template: `
    <app-offer-card [offer]="offerData"></app-offer-card>
  `
})
```

**4. Component with Input:**
```typescript
// offer-card.component.ts
@Component({
  selector: 'app-offer-card',
  template: `
    <div class="card">
      <h3>{{ offer.title }}</h3>
      <p>{{ offer.description }}</p>
    </div>
  `
})
export class OfferCardComponent {
  @Input() offer: any;  // Receives data from parent
}
```

### How to Make API Calls from Angular

**1. Create Service:**
```bash
ng generate service services/offers
```

**2. Implement Service:**
```typescript
// offers.service.ts
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/${id}`);
  }

  create(offer: CreateOfferDto): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

  update(id: number, offer: UpdateOfferDto): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/${id}`, offer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**3. Use in Component:**
```typescript
export class OffersListComponent implements OnInit {
  offers: Offer[] = [];
  loading = false;

  constructor(private offersService: OffersService) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.offersService.getAll().subscribe({
      next: (data) => {
        this.offers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
        this.loading = false;
      }
    });
  }
}
```

### How to Add Authentication Guard

**1. Generate Guard:**
```bash
ng generate guard guards/auth
# Choose: CanActivate
```

**2. Implement Guard:**
```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Allow access
  } else {
    router.navigate(['/login']);  // Redirect to login
    return false;  // Block access
  }
};
```

**3. Use in Routes:**
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]  // Protected route
  }
];
```

### How to Handle Errors

**Backend Error Handling:**
```typescript
// Create exception filter
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus?.() || 500;

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}

// Use globally in main.ts
app.useGlobalFilters(new AllExceptionsFilter());
```

**Frontend Error Handling:**
```typescript
// Create HTTP interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - redirect to login
        inject(Router).navigate(['/login']);
      } else if (error.status === 403) {
        // Forbidden
        alert('You don't have permission');
      } else {
        // Other errors
        alert('An error occurred: ' + error.message);
      }
      return throwError(() => error);
    })
  );
};

// Register in app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
};
```

---

## Glossary - Technical Terms

### General Terms

**API (Application Programming Interface)**
- Way for frontend and backend to communicate
- Like a menu at a restaurant - shows what you can order

**REST API**
- Type of API using HTTP methods
- GET = read, POST = create, PUT = update, DELETE = delete

**HTTP Methods:**
- `GET`: Retrieve data (read)
- `POST`: Create new data
- `PUT/PATCH`: Update existing data
- `DELETE`: Delete data

**Status Codes:**
- `200 OK`: Success
- `201 Created`: Successfully created
- `400 Bad Request`: Invalid data sent
- `401 Unauthorized`: Need to login
- `403 Forbidden`: Don't have permission
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server error

**JWT (JSON Web Token)**
- Like a digital passport
- Proves you're logged in
- Contains your user info (encoded)

### Backend Terms

**Module**
- Container for related code
- Groups controllers, services, etc.

**Controller**
- Handles HTTP requests
- Routes requests to services

**Service**
- Contains business logic
- Can be injected into controllers

**DTO (Data Transfer Object)**
- Defines shape of data
- Used for validation

**Entity**
- Represents database table
- Maps to rows in table

**Repository**
- Handles database operations
- CRUD operations

**Dependency Injection (DI)**
- Automatically provides dependencies
- No manual `new ClassName()`

**Decorator**
- `@Something()` syntax
- Adds metadata to classes/methods

### Frontend Terms

**Component**
- Building block of UI
- Has template (HTML) and logic (TS)

**Template**
- HTML with Angular syntax
- `{{ }}`, `*ngIf`, `*ngFor`, etc.

**Directive**
- Changes behavior of elements
- `*ngIf`, `*ngFor`, `ngClass`, etc.

**Service**
- Shared logic
- Usually handles API calls

**Observable**
- Stream of data over time
- From RxJS library
- Used for async operations

**Pipe**
- Transforms data in template
- `{{ date | date:'short' }}`

**Module (old Angular)**
- Container for components
- Not used in Angular 17+ (standalone)

**Standalone Component**
- Self-contained component
- No module needed (Angular 17+)

### Database Terms

**Schema**
- Structure of database
- Tables, columns, relationships

**Primary Key**
- Unique identifier for row
- Usually `id` column

**Foreign Key**
- References another table's primary key
- Creates relationships

**Migration**
- Script to change database structure
- Can be rolled back

**ORM (Object-Relational Mapping)**
- Use objects instead of SQL
- TypeORM is an ORM

**Query**
- Request for data from database
- `SELECT * FROM users`

### DevOps Terms

**Container**
- Packaged application with dependencies
- Runs same everywhere

**Image**
- Template for creating containers
- Blueprint for container

**Volume**
- Persistent storage for containers
- Data survives container restart

**Network**
- Allows containers to communicate
- Private network for services

**Environment Variable**
- Configuration value
- Different per environment

### Git Terms

**Repository (Repo)**
- Project folder with Git tracking
- Contains all code and history

**Branch**
- Separate line of development
- Allows parallel work

**Commit**
- Snapshot of code at point in time
- Has message describing changes

**Pull Request (PR)**
- Request to merge code
- Reviewed before merging

**Merge**
- Combine two branches
- Brings changes together

**Conflict**
- Same code changed differently
- Must be resolved manually

**Remote**
- Repository on GitHub
- `origin` = your main remote

**Clone**
- Copy repository to your computer
- `git clone <url>`

**Push**
- Send commits to remote
- `git push`

**Pull**
- Get commits from remote
- `git pull`

---

## Next Steps

### Learning Resources

**NestJS:**
- Official docs: https://docs.nestjs.com/
- Video tutorial: https://www.youtube.com/watch?v=GHTA143_b-s
- Practice: Build a simple REST API

**Angular:**
- Official docs: https://angular.io/docs
- Tour of Heroes tutorial: https://angular.io/tutorial
- Practice: Build a todo app

**TypeScript:**
- Official handbook: https://www.typescriptlang.org/docs/
- Practice: Convert JavaScript code to TypeScript

**PostgreSQL:**
- Tutorial: https://www.postgresqltutorial.com/
- Practice: Design database schemas

**Docker:**
- Get started: https://docs.docker.com/get-started/
- Practice: Dockerize a simple app

### Your First Tasks

1. **Set up your environment**
   - Clone the repo
   - Run `./start.ps1` or `./start.sh`
   - Verify everything works

2. **Explore the code**
   - Read each file mentioned in this guide
   - Run the application
   - Use Swagger docs to test API

3. **Make a small change**
   - Pick an easy ticket (e.g., "Add copyright footer")
   - Follow the workflow
   - Create your first PR

4. **Build something**
   - User profile page
   - List of offers
   - Simple form
   - Start small!

### Questions?

- Ask in team chat
- Read the documentation
- Check Stack Overflow
- Ask a senior developer

**Remember:** Everyone was a beginner once. Don't be afraid to ask questions!

---

## Conclusion

You now understand:
- ✅ What the project does
- ✅ How the technology stack works
- ✅ Every file's purpose
- ✅ How to develop features
- ✅ How to collaborate with Git
- ✅ Common tasks and patterns
- ✅ Technical terminology

**You're ready to code!** 🚀

Start with simple tasks, read the code, experiment, break things (in your branch), fix them, and learn. That's how you become a better developer.

**Welcome to the ISS Orange team!** 🎓
