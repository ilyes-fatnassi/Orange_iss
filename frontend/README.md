# Frontend - Angular Application

This is the frontend application for the ISS Orange platform built with Angular 17.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

The application will be available at http://localhost:4200

## 📝 Available Scripts

- `npm start` - Start development server (http://localhost:4200)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests
- `npm run lint` - Lint code

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Root component
│   │   ├── app.config.ts        # App configuration
│   │   └── app.routes.ts        # Route definitions
│   ├── environments/             # Environment configurations
│   ├── assets/                   # Static assets
│   ├── index.html               # HTML entry point
│   ├── main.ts                  # Application entry point
│   └── styles.scss              # Global styles
├── angular.json                 # Angular CLI configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Orange Brand Colors

The following Orange brand colors are available as CSS variables:

```css
--orange-primary: #FF7900
--orange-dark: #CD3C14
--orange-light: #FFB4E6
--black: #000000
--white: #FFFFFF
--grey-light: #F6F6F6
--grey-medium: #CCCCCC
--grey-dark: #333333
```

## 🔧 Adding New Features

### Generate Component
```bash
ng generate component components/my-component
```

### Generate Service
```bash
ng generate service services/my-service
```

### Generate Module
```bash
ng generate module modules/my-module
```

## 📡 API Integration

The backend API URL is configured in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

Create services to communicate with the backend:

```bash
ng generate service services/api
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 🚀 Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
