# Procurement RFP & Vendor Analysis Platform

A comprehensive web application for streamlining procurement processes, automating RFP creation, vendor management, proposal evaluation, and data-driven vendor analysis.

## Features

### Core Features (MVP)
- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Secure password hashing

- **RFP Management**
  - Create, read, update, and delete RFPs
  - RFP templates and categories
  - Automatic RFP number generation
  - Evaluation criteria definition
  - Status workflow (draft, published, closed, awarded)

- **Dashboard**
  - Overview of RFPs and activities
  - Quick actions for common tasks
  - Recent RFPs list
  - Statistics and metrics

- **Modern UI**
  - Responsive Material-UI design
  - Clean and professional interface
  - Mobile-friendly

## Tech Stack

### Backend
- **Runtime:** Node.js 20
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **Authentication:** JWT with Passport.js
- **ORM:** TypeORM
- **Validation:** class-validator

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Build Tool:** Vite
- **API Client:** Axios

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **CI/CD:** GitHub Actions
- **Cloud Platform:** AWS (ECS, RDS, S3, CloudFront)

## Project Structure

```
CMS-DE-SynPUF/
├── backend/
│   ├── services/
│   │   ├── auth/           # Authentication service
│   │   ├── rfp/            # RFP management service
│   │   ├── vendor/         # Vendor service (planned)
│   │   ├── evaluation/     # Evaluation service (planned)
│   │   └── ...
│   └── shared/             # Shared types and utilities
├── frontend/               # React frontend application
├── scripts/                # Utility scripts
├── docker-compose.yml      # Local development setup
├── PRD.md                  # Product Requirements Document
├── ARCHITECTURE.md         # Architecture Design Document
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- PostgreSQL 15 (or use Docker)
- npm 10 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CMS-DE-SynPUF
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   For Auth Service:
   ```bash
   cd backend/services/auth
   cp .env.example .env
   # Edit .env with your configuration
   ```

   For RFP Service:
   ```bash
   cd backend/services/rfp
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running with Docker (Recommended)

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Auth Service: http://localhost:3001
   - RFP Service: http://localhost:3002
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Running Locally (Development)

1. **Start PostgreSQL and Redis**
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Start Backend Services**

   Terminal 1 (Auth Service):
   ```bash
   cd backend/services/auth
   npm install
   npm run start:dev
   ```

   Terminal 2 (RFP Service):
   ```bash
   cd backend/services/rfp
   npm install
   npm run start:dev
   ```

3. **Start Frontend**

   Terminal 3:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Auth API: http://localhost:3001/api/v1
   - RFP API: http://localhost:3002/api/v1

## API Documentation

### Authentication Service (Port 3001)

**Register User**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "procurement_specialist",
  "organizationId": "org-uuid"
}
```

**Login**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### RFP Service (Port 3002)

**Create RFP**
```http
POST /api/v1/rfps
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "IT Infrastructure Upgrade",
  "description": "Seeking proposals for upgrading our IT infrastructure",
  "category": "IT",
  "budgetMin": 50000,
  "budgetMax": 100000,
  "issueDate": "2025-11-06",
  "submissionDeadline": "2025-12-06",
  "evaluationCriteria": [
    {
      "id": "1",
      "name": "Technical Capability",
      "description": "Technical expertise and capability",
      "weight": 40,
      "maxScore": 100
    }
  ]
}
```

**Get All RFPs**
```http
GET /api/v1/rfps
Authorization: Bearer <token>
```

**Get RFP by ID**
```http
GET /api/v1/rfps/:id
Authorization: Bearer <token>
```

**Update RFP**
```http
PATCH /api/v1/rfps/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "published"
}
```

**Delete RFP**
```http
DELETE /api/v1/rfps/:id
Authorization: Bearer <token>
```

**Publish RFP**
```http
POST /api/v1/rfps/:id/publish
Authorization: Bearer <token>
```

## User Roles

- **Admin**: Full system access
- **Procurement Manager**: Create/manage RFPs, approve vendors, view analytics
- **Procurement Specialist**: Create RFPs, manage vendors, score proposals
- **Category Manager**: Define requirements, approve RFPs
- **Finance**: Budget approval, cost analysis
- **Legal**: Review terms, ensure compliance
- **Vendor**: Submit proposals, respond to RFPs
- **Viewer**: Read-only access

## Development

### Running Tests

```bash
# Backend tests
cd backend/services/auth
npm test

cd backend/services/rfp
npm test

# Frontend tests
cd frontend
npm test
```

### Linting

```bash
# Backend
cd backend/services/auth
npm run lint

# Frontend
cd frontend
npm run lint
```

### Building for Production

```bash
# Build all services
npm run build

# Or individually
cd backend/services/auth && npm run build
cd backend/services/rfp && npm run build
cd frontend && npm run build
```

## Database Schema

### Users Table (auth_db)
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- role (ENUM)
- organization_id (UUID)
- status (ENUM)
- last_login_at (TIMESTAMP)
- created_at, updated_at, deleted_at

### RFPs Table (rfp_db)
- id (UUID, PK)
- title (VARCHAR)
- description (TEXT)
- rfp_number (VARCHAR, UNIQUE)
- category (ENUM)
- status (ENUM)
- budget_min, budget_max (DECIMAL)
- issue_date (DATE)
- submission_deadline (TIMESTAMP)
- evaluation_criteria (JSONB)
- created_by (UUID, FK)
- organization_id (UUID)
- created_at, updated_at, deleted_at

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Clear Docker Cache
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Deployment

### AWS Deployment (Production)

1. **Prerequisites**
   - AWS Account
   - AWS CLI configured
   - ECR repositories created
   - ECS cluster set up
   - RDS PostgreSQL instance
   - ElastiCache Redis cluster

2. **Build and Push Images**
   ```bash
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

   # Build and push
   docker-compose build
   docker tag procurement-auth:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/procurement-auth:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/procurement-auth:latest
   ```

3. **Deploy to ECS**
   ```bash
   aws ecs update-service --cluster procurement --service auth-service --force-new-deployment
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in PRD.md and ARCHITECTURE.md

## Roadmap

### Phase 2 (Q1 2026)
- Vendor Service implementation
- Evaluation Service implementation
- File upload and management
- Notification system
- Advanced search and filtering

### Phase 3 (Q2 2026)
- Analytics and reporting
- AI-powered recommendations
- Advanced workflow automation
- Mobile app (React Native)

### Phase 4 (Q3 2026)
- Integration with ERP systems
- Advanced security features
- Multi-language support
- Performance optimizations

## Acknowledgments

- Built with NestJS and React
- Inspired by modern procurement best practices
- Design based on Material-UI guidelines

---

**Version:** 1.0.0
**Last Updated:** November 6, 2025
**Maintained by:** Engineering Team
