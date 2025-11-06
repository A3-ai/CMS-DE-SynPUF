# 🔧 Database Setup Fix for Mac

## Problem
The application services are running but cannot connect because the databases `auth_db` and `rfp_db` don't exist yet.

## Quick Fix (3 Steps)

### Step 1: Run Database Setup Script

```bash
cd ~/Desktop/CMS-DE-SynPUF
./setup-databases-mac.sh
```

This script will:
- ✅ Find your PostgreSQL installation automatically
- ✅ Create `auth_db` and `rfp_db` databases
- ✅ Verify databases were created successfully

### Step 2: Restart Backend Services

```bash
./restart-services-mac.sh
```

This will stop and restart both Auth and RFP services so they can connect to the newly created databases.

### Step 3: Test Registration

1. Wait 10 seconds for services to fully start
2. Open http://localhost:3000 in your browser
3. Click "Sign Up"
4. Create an account:
   - Email: test@example.com
   - Password: password123
   - First Name: Test
   - Last Name: User
   - Role: Procurement Manager

If registration works, you're all set! ✅

---

## Manual Database Creation (If Script Fails)

If the automatic script doesn't work, try these manual steps:

### Find PostgreSQL

```bash
# Check where PostgreSQL is installed
which psql

# Or search for it
find /usr/local /opt -name psql -type f 2>/dev/null

# Or use Homebrew to find it
brew --prefix postgresql@15
```

### Create Databases Manually

Once you find where `psql` is located, run:

```bash
# Replace /path/to/psql with the actual path you found
/path/to/psql postgres -c "CREATE DATABASE auth_db;"
/path/to/psql postgres -c "CREATE DATABASE rfp_db;"

# Verify they were created
/path/to/psql -l | grep -E "auth_db|rfp_db"
```

### Common PostgreSQL Paths

Try these common locations:

```bash
# Apple Silicon Mac (M1/M2/M3)
/opt/homebrew/opt/postgresql@15/bin/psql

# Intel Mac
/usr/local/opt/postgresql@15/bin/psql

# Generic Homebrew
/opt/homebrew/bin/psql
/usr/local/bin/psql

# PostgreSQL App
/Library/PostgreSQL/15/bin/psql
```

---

## Verifying Everything Works

### Check Database Exists

```bash
psql -l | grep -E "auth_db|rfp_db"
```

Expected output:
```
 auth_db  | youruser | UTF8     | ...
 rfp_db   | youruser | UTF8     | ...
```

### Check Service Logs

```bash
# Auth Service
tail -f /tmp/auth.log

# RFP Service
tail -f /tmp/rfp.log
```

Look for:
- ✅ "Database connection successful"
- ✅ "Nest application successfully started"
- ❌ NOT "database does not exist"

### Check Services Running

```bash
ps aux | grep "nest start"
```

You should see both auth and rfp services running.

---

## Still Having Issues?

### Reset Everything

```bash
# Stop all services
pkill -f "nest start"
pkill -f "vite"

# Drop and recreate databases
psql postgres -c "DROP DATABASE IF EXISTS auth_db;"
psql postgres -c "DROP DATABASE IF EXISTS rfp_db;"
psql postgres -c "CREATE DATABASE auth_db;"
psql postgres -c "CREATE DATABASE rfp_db;"

# Start fresh
cd ~/Desktop/CMS-DE-SynPUF
./quick-start.sh
```

### Check PostgreSQL is Running

```bash
brew services list | grep postgresql
```

Should show:
```
postgresql@15 started
```

If not running:
```bash
brew services start postgresql@15
```

---

## Understanding the Error

The error you saw:
```
error: database "auth_db" does not exist
```

This happens because:
1. ✅ PostgreSQL server is running
2. ❌ But the databases weren't created yet
3. ❌ Services can't connect to non-existent databases

The solution is simple: create the databases, then restart the services.

---

## After Fixing

Once databases are created and services restarted:
- Auth API: http://localhost:3001/api/v1
- RFP API: http://localhost:3002/api/v1
- Frontend: http://localhost:3000

You should be able to:
- ✅ Register new users
- ✅ Login
- ✅ Create RFPs
- ✅ View dashboard

**Happy developing! 🚀**
