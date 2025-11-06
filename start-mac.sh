#!/bin/bash

echo "🚀 Starting Procurement RFP Platform..."
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check Docker
echo "🔍 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo ""
    echo "Please install Docker Desktop for Mac:"
    echo "https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running!"
    echo ""
    echo "Please start Docker Desktop from your Applications folder."
    exit 1
fi

echo "✅ Docker is ready"
echo ""

# Stop any existing containers
echo "🧹 Cleaning up old containers..."
docker compose down 2>/dev/null

# Start services
echo ""
echo "🚀 Starting services..."
echo "This may take a few minutes on first run..."
docker compose up -d --build

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to start..."
sleep 5

# Check PostgreSQL
echo "  Checking PostgreSQL..."
for i in {1..30}; do
    if docker compose exec -T postgres pg_isready -U postgres &>/dev/null; then
        echo "  ✅ PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "  ⚠️  PostgreSQL took too long to start"
    fi
    sleep 1
done

# Wait a bit more for services to fully initialize
echo "  Initializing services..."
sleep 10

# Show status
echo ""
echo "📊 Service Status:"
docker compose ps

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Application is running!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Open in your browser:"
echo "   👉 http://localhost:3000"
echo ""
echo "📡 API Endpoints:"
echo "   Auth Service: http://localhost:3001/api/v1"
echo "   RFP Service:  http://localhost:3002/api/v1"
echo ""
echo "📝 Create your first account:"
echo "   1. Go to http://localhost:3000"
echo "   2. Click 'Sign Up'"
echo "   3. Fill in your details"
echo "   4. Start creating RFPs!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:        docker compose logs -f"
echo "   Stop services:    docker compose down"
echo "   Restart:          docker compose restart"
echo "   View this info:   cat RUNNING.md"
echo ""
