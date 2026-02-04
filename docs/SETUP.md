# ISS Orange - Team Setup Checklist

## 📋 Setup Checklist for Team Lead

### 1. GitHub Repository Setup
- [ ] Create repository on GitHub (private)
- [ ] Add repository description and topics
- [ ] Enable Issues
- [ ] Enable Projects (for sprint board)
- [ ] Configure branch protection rules for `main` and `dev`

### 2. Team Invitations
- [ ] Invite all team members as collaborators
- [ ] Assign appropriate permissions:
  - [ ] Maintainers: Team leads
  - [ ] Write: All developers
  - [ ] Read: Supervisors/stakeholders

### 3. Project Board Setup
- [ ] Create GitHub Project board
- [ ] Add columns: Backlog, To Do, In Progress, In Review, Done
- [ ] Link repository to project
- [ ] Create initial issues for Sprint 1

### 4. Branch Setup
```bash
# Create dev branch
git checkout -b dev
git push origin dev

# Set dev as default branch for PRs (on GitHub)
# Settings → Branches → Default branch → dev
```

### 5. Documentation Review
- [ ] Review README.md
- [ ] Review CONTRIBUTING.md
- [ ] Customize with actual GitHub org/repo URLs
- [ ] Add team member names/roles

---

## 👥 Setup Checklist for Team Members

### 1. Prerequisites Installation
- [ ] Install Node.js (v18+)
- [ ] Install npm or yarn
- [ ] Install Git
- [ ] Install PostgreSQL (or use Docker)
- [ ] Install Docker & Docker Compose
- [ ] Install VS Code (recommended) or preferred IDE

### 2. GitHub Account Setup
- [ ] Create/login to GitHub account
- [ ] Set up SSH key or Personal Access Token
- [ ] Accept repository invitation

### 3. Clone & Setup Repository
```bash
# Clone repository
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange

# Configure Git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Create local dev branch
git checkout dev
git pull origin dev
```

### 4. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your settings
# Update database credentials, ports, etc.
```

### 5. Dependencies Installation
```bash
# Install backend dependencies (when NestJS is set up)
cd backend
npm install

# Install frontend dependencies (when Angular is set up)
cd ../frontend
npm install
```

### 6. Verify Setup
```bash
# Test Docker
docker --version
docker-compose --version

# Test Node/npm
node --version
npm --version

# Test PostgreSQL connection (if local)
psql --version
```

### 7. IDE Setup (VS Code Recommended)
- [ ] Install extensions:
  - [ ] Angular Language Service
  - [ ] ESLint
  - [ ] Prettier
  - [ ] GitLens
  - [ ] Docker
  - [ ] PostgreSQL (if needed)
  - [ ] REST Client (for API testing)

---

## 🚀 First Sprint Setup

### Product Owner / Scrum Master
- [ ] Define Sprint 1 goals
- [ ] Create user stories as GitHub Issues
- [ ] Prioritize backlog
- [ ] Schedule sprint planning meeting
- [ ] Set up daily standup schedule
- [ ] Schedule sprint review & retrospective

### Development Team
- [ ] Attend sprint planning
- [ ] Estimate story points
- [ ] Claim initial tasks
- [ ] Set up local development environment
- [ ] Create first feature branches

---

## 📚 Resources to Review

### For Everyone
- [ ] Read [README.md](../README.md)
- [ ] Read [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] Read [WORKFLOW.md](./WORKFLOW.md)
- [ ] Review project requirements document

### For Backend Developers
- [ ] NestJS documentation: https://docs.nestjs.com/
- [ ] TypeORM documentation: https://typeorm.io/
- [ ] PostgreSQL documentation
- [ ] Swagger/OpenAPI documentation

### For Frontend Developers
- [ ] Angular documentation: https://angular.io/docs
- [ ] Angular Material (if used): https://material.angular.io/
- [ ] RxJS documentation: https://rxjs.dev/

### For AI/ML Team
- [ ] Explainable AI (XAI) concepts
- [ ] CV parsing libraries
- [ ] Natural Language Processing basics
- [ ] scikit-learn (if used)

---

## 🎯 Sprint 1 Suggested Focus

### Week 1
- [ ] Set up project structure
- [ ] Initialize NestJS backend
- [ ] Initialize Angular frontend
- [ ] Set up database schema (basic)
- [ ] Implement authentication (basic)

### Week 2
- [ ] User management (CRUD)
- [ ] Role-based access control
- [ ] Basic UI components
- [ ] API integration with frontend

---

## 🆘 Troubleshooting

### Can't clone repository?
- Check GitHub access token/SSH key
- Verify you've accepted the invitation
- Try HTTPS instead of SSH (or vice versa)

### Dependencies won't install?
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, reinstall
- Check Node.js version compatibility

### Docker issues?
- Ensure Docker Desktop is running
- Check port conflicts (3000, 4200, 5432)
- Try `docker-compose down -v` and restart

### Git conflicts?
- See [WORKFLOW.md](./WORKFLOW.md) for conflict resolution
- Ask team lead for help
- Use a Git GUI tool like GitKraken or Sourcetree

---

## 📞 Team Contacts

| Role | Name | Email | GitHub |
|------|------|-------|--------|
| Team Lead | TBD | TBD | @username |
| Backend Lead | TBD | TBD | @username |
| Frontend Lead | TBD | TBD | @username |
| AI/ML Lead | TBD | TBD | @username |
| Scrum Master | TBD | TBD | @username |

---

## ✅ Ready to Start?

Once you've completed your checklist:
1. Notify team lead that you're set up
2. Join the team communication channel
3. Attend the sprint planning meeting
4. Start coding! 🚀

**Questions?** Don't hesitate to ask in the team chat or create a GitHub Discussion.
