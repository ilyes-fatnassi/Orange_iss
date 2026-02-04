# Internship & PFE Management Portal with Explainable AI

> A centralized platform for managing internships and PFE processes with AI-powered candidate shortlisting for Orange Digital Center

## 🎯 Project Overview

**Partner:** Orange Digital Center  
**Duration:** 3 months  
**Methodology:** Agile/Scrum

### Description
This project aims to develop a centralized platform that manages internships and PFE processes, from offer publication to final evaluation. It integrates an explainable AI module that analyzes student CVs, matches skills with internship requirements, and ranks candidates with transparency. The goal is to support faster, fairer, and more objective decision-making.

### Design Process
We will use **Agile methodology** for this project, where each sprint focuses on a specific feature. Feedback from stakeholders will be taken into consideration to improve functionality, usability, and AI explainability, ensuring that the system meets needs efficiently.

## 👥 Target Customers

### Internship & PFE Candidates
- Apply to internships/PFE efficiently
- Understand how their skills match requirements
- Receive transparent, AI-driven feedback on applications

### University Coordinators and Supervisors
- Manage internship/PFE offers and applications efficiently
- Objective, data-driven shortlisting with AI-assisted explanations
- Assign supervisors and evaluate candidates systematically
- Reduce administrative workload through automation

### ODC Admin/Coordinator
- Post internship/PFE offers quickly
- Screen candidates in a structured, program-aligned way
- Access explainable AI rankings to ensure fair and ethical selection

## 🎯 Project Scope

### Focus
Core web platform features:
- Offer management
- Student applications
- Supervisor workflows
- AI-assisted ranking
- Exportable shortlists

### Timeline
- **Duration:** 3-month development period
- **Deliverable:** Functional product demonstrating all key workflows and explainable AI (not a full production system)

### Cost
Rely on open-source tools and demo/development hosting environment

## 📋 Project Constraints

### Design Constraints
- **Life Cycle:** Must follow Scrum methodology
- **Functional:** Solution must meet stakeholder requirements
- **Aesthetics:** Must strictly follow Orange's color palette and graphic charter

### Course Constraints
- **Prior Knowledge:** Limited team experience with AI, especially Explainable AI (XAI)
- **Technological:** Must use LaTeX template for documentation (learning curve for team)

## 🔒 Delimitations

- Project focuses exclusively on internship and PFE management (not full employee recruitment or HR operations)
- Platform operates as standalone system (no integration with existing Orange or university systems)
- CV parsing and analysis limited to **English and French** languages
- Data limited to authorized, anonymized, or synthetic datasets

## ⚠️ Limitations

- CV parsing accuracy depends on structure and quality of uploaded CVs
- AI shortlisting relies on predefined skill matching rules (may not capture all qualitative aspects)
- Evaluation focuses on system behavior, not on future performance of selected candidates

## 📌 Assumptions

1. Students submit CVs in standard format (PDF or Word)
2. Internship/PFE offers include clear skill requirements and educational criteria
3. Coordinators and supervisors will provide timely feedback for evaluation and tracking

## 🛠 Tech Stack

**Recommended Stack (Option 1 - Boosted by Orange):**
- **Frontend:** Angular
- **Backend:** NestJS
- **Database:** PostgreSQL
- **Documentation:** Swagger + Postman collection
- **Deployment:** Dockerized setup

**Alternative Stack (Option 2):**
- Angular + Express (Node.js) + MongoDB

> ⚡ **We highly recommend Option 1** for this project.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Docker & Docker Compose** (optional, recommended) - [Download](https://www.docker.com/)
- **Git**

### Quick Start (Recommended)

#### Option 1: Using Start Script (Easiest)

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

The script will guide you through:
1. Installing dependencies
2. Setting up environment variables
3. Starting the application

#### Option 2: Using Docker

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange

# 2. Copy environment file
cp .env.example .env
# Edit .env with your configuration

# 3. Start all services (PostgreSQL, Backend, Frontend)
docker-compose up
```

**Access the application:**
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api/docs

#### Option 3: Manual Setup

**1. Clone and Setup**
```bash
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange
cp .env.example .env
# Edit .env with your settings
```

**2. Backend Setup**
```bash
cd backend
npm install
npm run start:dev
```

**3. Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm start
```

**4. Database Setup**

Ensure PostgreSQL is running and create the database:
```sql
CREATE DATABASE iss_orange;
CREATE USER iss_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE iss_orange TO iss_user;
```

### For Team Members

If you're joining the team, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_ORG/iss_orange.git
   cd iss_orange
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Ask team lead for the correct values
   ```

4. **Start coding!**
   ```bash
   # Option 1: Use Docker
   docker-compose up

   # Option 2: Run the start script
   .\start.ps1  # Windows
   ./start.sh   # Linux/Mac
   ```

5. **Read the team guidelines**
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Collaboration guidelines
   - [docs/TICKET_WORKFLOW.md](docs/TICKET_WORKFLOW.md) - How to work with tickets
   - [docs/WORKFLOW.md](docs/WORKFLOW.md) - Git workflow
   - [docs/SETUP.md](docs/SETUP.md) - Complete setup checklist



## 📁 Project Structure

```
iss_orange/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   ├── app.module.ts   # Root module
│   │   └── ...             # Feature modules (to be added)
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── Dockerfile          # Docker configuration
├── frontend/                # Angular Frontend
│   ├── src/
│   │   ├── app/            # Application components
│   │   ├── environments/   # Environment configs
│   │   └── main.ts         # App entry point
│   ├── package.json        # Frontend dependencies
│   ├── angular.json        # Angular CLI config
│   └── Dockerfile          # Docker configuration
├── docs/                    # Documentation
│   ├── SETUP.md            # Team setup guide
│   ├── WORKFLOW.md         # Git workflow
│   └── TICKET_WORKFLOW.md  # Ticket-based development
├── .github/                 # GitHub templates
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── pull_request_template.md
├── docker-compose.yml       # Docker services config
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── start.ps1               # Windows startup script
├── start.sh                # Linux/Mac startup script
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md               # This file
```

## 🛠 Available Commands

### Backend (NestJS)
```bash
cd backend

npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Run production build
npm run lint           # Lint code
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
```

### Frontend (Angular)
```bash
cd frontend

npm start              # Start dev server (http://localhost:4200)
npm run build          # Build for production
npm run watch          # Build with watch mode
npm run test           # Run unit tests
npm run lint           # Lint code

# Angular CLI commands
ng generate component components/my-component
ng generate service services/my-service
ng generate module modules/my-module
```

### Docker
```bash
docker-compose up           # Start all services
docker-compose up -d        # Start in detached mode
docker-compose down         # Stop all services
docker-compose logs -f      # View logs
docker-compose ps           # List running services
docker-compose restart      # Restart services
```

## 🔧 Development Workflow

1. **Pick a ticket** from GitHub Issues
2. **Create a branch**: `git checkout -b feature/25-ticket-name`
3. **Code your solution**
4. **Commit**: `git commit -m "feat: description (#25)"`
5. **Push**: `git push origin feature/25-ticket-name`
6. **Create Pull Request** with "Closes #25"
7. **Get reviewed and merge**

See [docs/TICKET_WORKFLOW.md](docs/TICKET_WORKFLOW.md) for detailed workflow.

## 📚 Documentation

- **API Documentation:** Swagger UI at `/api/docs`
- **Postman Collection:** Available in `/docs/postman/`
- **Project Reports:** LaTeX documentation in `/docs/`

Documentation is crucial for this project - ensure to update documentation at major steps.

## 📧 Contact

For questions or support, contact the Orange Digital Center team or project supervisors.