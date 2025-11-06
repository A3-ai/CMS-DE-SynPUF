#!/bin/bash

echo "=== Restarting Backend Services ==="
echo ""

# Stop existing services
echo "Stopping existing backend services..."
pkill -f "nest start" 2>/dev/null
pkill -f "node.*auth.*start" 2>/dev/null
pkill -f "node.*rfp.*start" 2>/dev/null
sleep 2

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "Starting Auth Service..."
cd backend/services/auth
npm run start:dev > /tmp/auth.log 2>&1 &
AUTH_PID=$!
echo "  Auth Service PID: $AUTH_PID"
echo "  Logs: /tmp/auth.log"

sleep 2

echo "Starting RFP Service..."
cd ../rfp
npm run start:dev > /tmp/rfp.log 2>&1 &
RFP_PID=$!
echo "  RFP Service PID: $RFP_PID"
echo "  Logs: /tmp/rfp.log"

cd "$SCRIPT_DIR"

echo ""
echo "✅ Services restarted!"
echo ""
echo "Wait 10 seconds for services to fully start, then check logs:"
echo "  tail -f /tmp/auth.log"
echo "  tail -f /tmp/rfp.log"
echo ""
echo "Or check if services are running:"
echo "  ps aux | grep 'nest start'"
echo ""
echo "Frontend should still be running at: http://localhost:3000"
