# Contributing to ISS Orange

Thank you for contributing to the Internship & PFE Management Portal! This document provides guidelines for team collaboration.

## 🌿 Branch Strategy

### Main Branches
- `main` - Production-ready code (protected)
- `dev` - Development integration branch

### Working Branches
Follow this naming convention:

- **Features:** `feature/short-description`
  - Example: `feature/cv-parsing`, `feature/user-auth`
- **Bug Fixes:** `fix/short-description`
  - Example: `fix/login-validation`, `fix/cv-upload-error`
- **Documentation:** `docs/short-description`
  - Example: `docs/api-swagger`, `docs/setup-guide`

## 🔄 Workflow

1. **Create a branch from `dev`:**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature
   ```

2. **Make your changes:**
   - Write clean, documented code
   - Follow the coding standards below
   - Test your changes locally

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "type: brief description"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request:**
   - Go to GitHub and create a PR from your branch to `dev`
   - Fill out the PR template
   - Request review from at least one team member
   - Link related issues

6. **Code Review:**
   - Address review comments
   - Update your branch if needed
   - Once approved, merge into `dev`

## 📝 Commit Message Format

Use conventional commits:

```
type: brief description

[optional body]
[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic change)
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add CV parsing API endpoint
fix: resolve authentication token expiration
docs: update API documentation for shortlisting
```

## 🎨 Coding Standards

### Backend (NestJS)
- Use TypeScript strict mode
- Follow NestJS architectural patterns (Controllers, Services, Modules)
- Use DTOs for request/response validation
- Write unit tests for services
- Document APIs with Swagger decorators

### Frontend (Angular)
- Use Angular CLI for generating components/services
- Follow Angular style guide
- Use reactive forms
- Implement lazy loading for routes
- Write component tests

### General
- Use meaningful variable/function names
- Comment complex logic
- Keep functions small and focused
- Avoid code duplication (DRY principle)

## 🧪 Testing

- Write unit tests for new features
- Ensure existing tests pass before submitting PR
- Run tests locally:
  ```bash
  # Backend
  cd backend
  npm run test
  
  # Frontend
  cd frontend
  npm run test
  ```

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project coding standards
- [ ] Tests are written and passing
- [ ] Documentation is updated (if needed)
- [ ] No console.log or debugging code
- [ ] Environment variables are not hardcoded
- [ ] Swagger documentation is updated (for API changes)
- [ ] PR title follows commit message format
- [ ] PR description explains what and why

## 🐛 Reporting Issues

Use GitHub Issues with these labels:
- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `question` - Questions about the project

## 🔍 Code Review Guidelines

As a reviewer:
- Be constructive and respectful
- Check for code quality and standards
- Test the changes locally if possible
- Approve only when confident in the changes

As an author:
- Respond to all comments
- Don't take feedback personally
- Ask for clarification if needed
- Update your PR based on feedback

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Sprint Planning

We follow Agile/Scrum:
- **Sprint Duration:** 2 weeks
- **Daily Standups:** Share progress, blockers
- **Sprint Review:** Demo completed features
- **Sprint Retrospective:** Discuss improvements

## ❓ Questions?

Don't hesitate to ask the team for help! We're all learning together.
