# 🚀 Running the Application on Mac

## Quick Start (3 Commands)

```bash
cd /home/user/CMS-DE-SynPUF
./start-mac.sh
open http://localhost:3000
```

---

## Detailed Instructions

### Prerequisites

1. **Install Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop/
   - Choose your Mac type (Apple Silicon or Intel)
   - Install and start Docker Desktop
   - Wait for Docker to fully start (whale icon in menu bar)

2. **Verify Installation**
   ```bash
   docker --version
   docker compose version
   ```

### Starting the Application

**Method 1: Using the Start Script (Recommended)**

```bash
cd /home/user/CMS-DE-SynPUF
./start-mac.sh
```

The script will:
- ✅ Check Docker is running
- ✅ Clean up old containers
- ✅ Build and start all services
- ✅ Wait for services to be ready
- ✅ Show you the access URLs

**Method 2: Manual Docker Compose**

```bash
cd /home/user/CMS-DE-SynPUF
docker compose up -d
```

Then wait 30 seconds for services to start.

---

## Accessing the Application

Once started, open your browser to:

### 🌐 Main Application
**http://localhost:3000**

### First Time Setup

1. **Create an Account**
   - Click "Sign Up"
   - Enter your details:
     - Email: your@email.com
     - Password: password123
     - First Name: John
     - Last Name: Doe
     - Role: Procurement Manager
   - Click "Sign Up"

2. **Start Using the App**
   - Dashboard shows overview
   - Click "Create RFP" to create your first RFP
   - Fill in the form and submit
   - View all RFPs from the sidebar

---

## Useful Commands

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend
docker compose logs -f auth-service
docker compose logs -f rfp-service
docker compose logs -f postgres
```

### Check Service Status

```bash
docker compose ps
```

Expected output - all services should show "Up":
```
NAME                    STATUS
procurement-auth-service   Up
procurement-frontend       Up
procurement-postgres       Up
procurement-redis          Up
procurement-rfp-service    Up
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart frontend
docker compose restart auth-service
```

### Stop Application

```bash
# Stop but keep data
docker compose down

# Stop and remove all data (fresh start)
docker compose down -v
```

### Rebuild After Code Changes

```bash
docker compose down
docker compose up -d --build
```

---

## Troubleshooting

### ❌ "Cannot connect to Docker daemon"

**Problem:** Docker Desktop is not running

**Solution:**
1. Open Docker Desktop from Applications
2. Wait for it to fully start (whale icon in menu bar)
3. Try again

### ❌ "Port already in use"

**Problem:** Another application is using ports 3000, 3001, 3002, 5432, or 6379

**Solution:**
```bash
# Stop the conflicting service
docker compose down

# Find what's using the port
lsof -i :3000

# Kill the process (replace PID with actual number)
kill -9 <PID>

# Restart
docker compose up -d
```

### ❌ Frontend shows white screen or errors

**Problem:** Services not fully started

**Solution:**
```bash
# Check logs
docker compose logs frontend

# Restart frontend
docker compose restart frontend

# Or rebuild
docker compose up -d --build frontend
```

### ❌ "Connection refused" when logging in

**Problem:** Backend services not ready

**Solution:**
```bash
# Check backend logs
docker compose logs auth-service
docker compose logs rfp-service

# Check if Postgres is ready
docker compose logs postgres

# Restart everything
docker compose restart
```

### ❌ Database connection errors

**Problem:** PostgreSQL not ready or corrupted

**Solution:**
```bash
# Option 1: Restart Postgres
docker compose restart postgres

# Option 2: Fresh start (DELETES ALL DATA)
docker compose down -v
docker compose up -d
```

### 🔄 Complete Reset (Fresh Start)

If nothing works, do a complete reset:

```bash
# Stop everything
docker compose down -v

# Remove all Docker resources
docker system prune -a --volumes

# Start fresh
./start-mac.sh
```

---

## Development Mode

If you want to develop and see live changes:

### Backend Development

```bash
# Stop Docker backend services
docker compose stop auth-service rfp-service

# Keep database running
docker compose up -d postgres redis

# Terminal 1 - Auth Service
cd backend/services/auth
npm install
npm run start:dev

# Terminal 2 - RFP Service
cd backend/services/rfp
npm install
npm run start:dev
```

### Frontend Development

```bash
# Stop Docker frontend
docker compose stop frontend

# Terminal 3 - Frontend
cd frontend
npm install
npm run dev
```

Now code changes will auto-reload!

---

## Testing the API

### Using curl

**Register a user:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "procurement_manager",
    "organizationId": "default-org"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Create an RFP (replace TOKEN with your access token):**
```bash
curl -X POST http://localhost:3002/api/v1/rfps \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "IT Infrastructure Upgrade",
    "description": "Need new servers",
    "category": "IT",
    "budgetMin": 50000,
    "budgetMax": 100000,
    "issueDate": "2025-11-06",
    "submissionDeadline": "2025-12-06T23:59:59.000Z",
    "evaluationCriteria": [
      {
        "id": "1",
        "name": "Technical Capability",
        "description": "Technical expertise",
        "weight": 40,
        "maxScore": 100
      }
    ]
  }'
```

---

## Performance Tips

### Make it Faster

```bash
# Allocate more resources to Docker
# Docker Desktop → Settings → Resources
# - CPUs: 4+
# - Memory: 8GB+
# - Swap: 2GB+
```

### Check Resource Usage

```bash
docker stats
```

---

## Next Steps

1. ✅ Start the application
2. ✅ Create your account
3. ✅ Create your first RFP
4. 📖 Read `APP_README.md` for full features
5. 🏗️ Read `ARCHITECTURE.md` for technical details
6. 📋 Read `PRD.md` for product requirements

---

## Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main web application |
| Auth API | http://localhost:3001/api/v1 | Authentication endpoints |
| RFP API | http://localhost:3002/api/v1 | RFP management endpoints |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |

---

## Support

- 📖 Full documentation: `APP_README.md`
- 🏗️ Architecture: `ARCHITECTURE.md`
- 📋 Requirements: `PRD.md`
- 🐛 Issues: Check logs with `docker compose logs -f`

---

**Happy developing! 🚀**
