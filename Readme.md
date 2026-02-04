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
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run start:dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
ng serve
```

4. **Using Docker (Recommended)**
```bash
docker-compose up -d
```

## 📁 Project Structure

```
iss_orange/
├── frontend/           # Angular application
├── backend/            # NestJS API
├── docs/               # LaTeX documentation & project docs
├── .github/            # GitHub templates & workflows
├── docker-compose.yml  # Docker configuration
├── CONTRIBUTING.md     # Team collaboration guidelines
└── README.md           # This file
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for team collaboration guidelines, branch strategy, and coding standards.

### Quick Start for Contributors

1. Create branch from `dev`: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: your change"`
3. Push and create Pull Request
4. Request review from team member
5. Merge after approval

## 📚 Documentation

- **API Documentation:** Swagger UI at `/api/docs`
- **Postman Collection:** Available in `/docs/postman/`
- **Project Reports:** LaTeX documentation in `/docs/`

Documentation is crucial for this project - ensure to update documentation at major steps.

## 📧 Contact

For questions or support, contact the Orange Digital Center team or project supervisors.