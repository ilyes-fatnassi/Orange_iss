# Quick Reference Guide - ISS Orange

> **Quick commands and concepts for daily development**

---

## 🚀 Getting Started (First Time)

```bash
# 1. Clone
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange

# 2. Setup environment
cp .env.example .env
# Edit .env with your values

# 3. Start (choose one):

# Option A: Docker (easiest)
docker-compose up

# Option B: Use script
./start.ps1     # Windows
./start.sh      # Linux/Mac

# Option C: Manual
cd backend && npm install && npm run start:dev
cd frontend && npm install && npm start
```

**Access:**
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api/docs

---

## 📝 Daily Development Workflow

```bash
# 1. Pick ticket from GitHub Issues
# 2. Create branch
git checkout dev
git pull origin dev
git checkout -b feature/25-your-feature

# 3. Code
# ... make changes ...

# 4. Commit
git add .
git commit -m "feat: description (#25)"

# 5. Push
git push origin feature/25-your-feature

# 6. Create PR on GitHub with "Closes #25"
# 7. Get review → Merge
# 8. Cleanup
git checkout dev
git pull origin dev
git branch -d feature/25-your-feature
```

---

## 🛠 Common Commands

### Backend (NestJS)

```bash
cd backend

# Development
npm run start:dev        # Start with hot reload
npm run build            # Build for production
npm run start:prod       # Run production

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:cov         # Coverage

# Code quality
npm run lint             # Check code
npm run format           # Format code

# Generate code
nest g module users      # Generate module
nest g controller users  # Generate controller
nest g service users     # Generate service
nest g resource offers   # Generate full CRUD
```

### Frontend (Angular)

```bash
cd frontend

# Development
npm start                # Start dev server
npm run build            # Build for production
npm test                 # Run tests
npm run lint             # Check code

# Generate code
ng g component pages/login
ng g service services/auth
ng g guard guards/auth
ng g interceptor interceptors/jwt
ng g interface models/user
ng g pipe pipes/custom
```

### Docker

```bash
# Start all services
docker-compose up              # Foreground
docker-compose up -d           # Background

# Stop
docker-compose down            # Stop services
docker-compose down -v         # Stop + remove volumes

# Logs
docker-compose logs -f         # All services
docker-compose logs -f backend # Specific service

# Rebuild
docker-compose up --build      # Rebuild and start

# Execute commands
docker-compose exec backend npm test
docker-compose exec backend sh

# Clean restart
docker-compose down -v && docker-compose up --build
```

### Git

```bash
# Status & Info
git status                     # Check status
git log --oneline              # Commit history
git diff                       # See changes

# Branches
git branch                     # List branches
git branch -a                  # List all (including remote)
git checkout branch-name       # Switch branch
git checkout -b new-branch     # Create and switch

# Sync
git pull origin dev            # Get latest from dev
git push origin branch-name    # Push your branch

# Undo
git checkout -- file.txt       # Discard changes
git reset HEAD file.txt        # Unstage file
git reset --soft HEAD~1        # Undo last commit (keep changes)

# Stash
git stash                      # Save changes temporarily
git stash pop                  # Restore stashed changes
git stash list                 # List stashes
```

---

## 🎯 Quick Recipes

### Add New API Endpoint

```bash
cd backend

# 1. Generate resource
nest g resource offers

# 2. Define entity (offers.entity.ts)
@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

# 3. Define DTO (create-offer.dto.ts)
export class CreateOfferDto {
  @IsString()
  title: string;
}

# 4. Test at http://localhost:3000/api/docs
```

### Add New Page

```bash
cd frontend

# 1. Generate component
ng g component pages/offers-list

# 2. Add route (app.routes.ts)
{ path: 'offers', component: OffersListComponent }

# 3. Navigate
<a routerLink="/offers">Offers</a>
```

### Make API Call

```typescript
// 1. Create service
ng g service services/offers

// 2. Implement
@Injectable({ providedIn: 'root' })
export class OffersService {
  private apiUrl = `${environment.apiUrl}/offers`;
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }
}

// 3. Use in component
export class OffersListComponent implements OnInit {
  offers: Offer[] = [];
  
  constructor(private offersService: OffersService) {}
  
  ngOnInit() {
    this.offersService.getAll().subscribe(
      data => this.offers = data
    );
  }
}
```

### Add Authentication

```typescript
// Backend (auth.controller.ts)
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

// Frontend (auth.service.ts)
login(credentials: LoginDto) {
  return this.http.post(`${this.apiUrl}/auth/login`, credentials)
    .pipe(tap(response => {
      localStorage.setItem('token', response.access_token);
    }));
}
```

### Protect Route

```typescript
// 1. Create guard
ng g guard guards/auth

// 2. Implement
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

// 3. Use in route
{ 
  path: 'dashboard', 
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Docker Issues

```bash
# Clean restart
docker-compose down -v
docker-compose up --build

# Remove everything
docker system prune -a --volumes
```

### Git Conflicts

```bash
# Update your branch with dev
git checkout dev
git pull origin dev
git checkout your-branch
git merge dev

# Resolve conflicts in files
# Then:
git add .
git commit -m "fix: resolve merge conflicts"
git push origin your-branch
```

### Database Issues

```bash
# Reset database
docker-compose down -v
docker-compose up

# Or manually:
docker-compose exec postgres psql -U iss_user -d iss_orange
DROP DATABASE iss_orange;
CREATE DATABASE iss_orange;
```

---

## 📋 Commit Message Format

```
type: description (#ticket-number)

Examples:
feat: add CV upload functionality (#15)
fix: resolve authentication bug (#23)
docs: update API documentation (#8)
style: format code with prettier (#12)
refactor: restructure user service (#18)
test: add unit tests (#20)
chore: update dependencies (#5)
```

---

## 🔗 Important Links

- **Documentation:** [docs/PROJECT_101.md](docs/PROJECT_101.md)
- **Setup Guide:** [docs/SETUP.md](docs/SETUP.md)
- **Git Workflow:** [docs/WORKFLOW.md](docs/WORKFLOW.md)
- **Ticket Workflow:** [docs/TICKET_WORKFLOW.md](docs/TICKET_WORKFLOW.md)
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🆘 Need Help?

1. Check [PROJECT_101.md](docs/PROJECT_101.md) for detailed explanations
2. Search in team chat
3. Ask a teammate
4. Create a GitHub Discussion
5. Check Stack Overflow

---

## ⚡ Pro Tips

1. **Use Swagger** - Test backend APIs at `/api/docs`
2. **Hot Reload** - Changes auto-refresh (no restart needed)
3. **Commit Often** - Small, focused commits are better
4. **Test Locally** - Always test before pushing
5. **Read PRs** - Learn from others' code
6. **Ask Questions** - No question is stupid!

---

Keep this file bookmarked - you'll use it daily! 🚀
