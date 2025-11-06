#!/bin/bash

echo "=== PostgreSQL Database Setup for Mac ==="
echo ""

# Function to find PostgreSQL binaries
find_postgres() {
    # Try common Homebrew paths
    POSTGRES_PATHS=(
        "/opt/homebrew/opt/postgresql@15/bin"
        "/usr/local/opt/postgresql@15/bin"
        "/opt/homebrew/bin"
        "/usr/local/bin"
        "/Library/PostgreSQL/15/bin"
    )

    for path in "${POSTGRES_PATHS[@]}"; do
        if [ -f "$path/psql" ]; then
            echo "✅ Found PostgreSQL at: $path"
            export PATH="$path:$PATH"
            return 0
        fi
    done

    # Try to find using which
    if command -v psql &> /dev/null; then
        PSQL_PATH=$(command -v psql)
        echo "✅ Found psql at: $PSQL_PATH"
        return 0
    fi

    echo "❌ Could not find PostgreSQL binaries"
    echo "Trying to locate PostgreSQL installation..."

    # Use find to locate psql (search common locations)
    FOUND_PSQL=$(find /usr/local /opt -name psql -type f 2>/dev/null | head -1)
    if [ -n "$FOUND_PSQL" ]; then
        PSQL_DIR=$(dirname "$FOUND_PSQL")
        echo "✅ Found psql at: $FOUND_PSQL"
        export PATH="$PSQL_DIR:$PATH"
        return 0
    fi

    return 1
}

# Find PostgreSQL
echo "Step 1: Locating PostgreSQL installation..."
if ! find_postgres; then
    echo ""
    echo "ERROR: Could not find PostgreSQL installation."
    echo "Please make sure PostgreSQL is installed via Homebrew:"
    echo "  brew install postgresql@15"
    exit 1
fi

echo ""
echo "Step 2: Checking PostgreSQL version..."
psql --version

echo ""
echo "Step 3: Checking existing databases..."
psql -U $USER -l 2>&1 | grep -E "auth_db|rfp_db|Name"

echo ""
echo "Step 4: Creating databases..."

# Try to create auth_db
echo -n "Creating auth_db... "
if psql -U $USER postgres -c "CREATE DATABASE auth_db;" 2>&1 | grep -q "already exists"; then
    echo "⚠️  Database already exists"
elif psql -U $USER postgres -c "CREATE DATABASE auth_db;" &> /dev/null; then
    echo "✅ Created successfully"
else
    echo "❌ Failed to create"
    echo "Trying alternative method..."
    createdb auth_db 2>&1
fi

# Try to create rfp_db
echo -n "Creating rfp_db... "
if psql -U $USER postgres -c "CREATE DATABASE rfp_db;" 2>&1 | grep -q "already exists"; then
    echo "⚠️  Database already exists"
elif psql -U $USER postgres -c "CREATE DATABASE rfp_db;" &> /dev/null; then
    echo "✅ Created successfully"
else
    echo "❌ Failed to create"
    echo "Trying alternative method..."
    createdb rfp_db 2>&1
fi

echo ""
echo "Step 5: Verifying databases exist..."
psql -U $USER -l | grep -E "auth_db|rfp_db"

if psql -U $USER -l | grep -q "auth_db" && psql -U $USER -l | grep -q "rfp_db"; then
    echo ""
    echo "✅ SUCCESS! Both databases are ready."
    echo ""
    echo "Next steps:"
    echo "1. Stop the backend services:"
    echo "   pkill -f 'nest start'"
    echo ""
    echo "2. Restart them:"
    echo "   cd ~/Desktop/CMS-DE-SynPUF/backend/services/auth && npm run start:dev > /tmp/auth.log 2>&1 &"
    echo "   cd ~/Desktop/CMS-DE-SynPUF/backend/services/rfp && npm run start:dev > /tmp/rfp.log 2>&1 &"
    echo ""
    echo "3. Wait 10 seconds, then try to register at http://localhost:3000"
else
    echo ""
    echo "❌ ERROR: Databases were not created successfully."
    echo ""
    echo "Please try manually:"
    echo "  psql postgres"
    echo "  CREATE DATABASE auth_db;"
    echo "  CREATE DATABASE rfp_db;"
    echo "  \\l"
    echo "  \\q"
fi
