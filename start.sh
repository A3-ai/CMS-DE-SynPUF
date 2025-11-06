#!/bin/bash

echo "🚀 Procurement RFP Platform - Quick Start Script"
echo "================================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker from: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

echo "✅ Docker found"

# Check if Docker Compose is available
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "❌ Docker Compose not found!"
    exit 1
fi

echo "✅ Docker Compose found"
echo ""

# Start services
echo "📦 Starting all services..."
$DOCKER_COMPOSE up -d

echo ""
echo "⏳ Waiting for services to start (30 seconds)..."
sleep 30

# Check service status
echo ""
echo "📊 Service Status:"
$DOCKER_COMPOSE ps

echo ""
echo "✅ Application is running!"
echo ""
echo "🌐 Access the application:"
echo "   Frontend:    http://localhost:3000"
echo "   Auth API:    http://localhost:3001/api/v1"
echo "   RFP API:     http://localhost:3002/api/v1"
echo ""
echo "📝 Default test credentials:"
echo "   Email:    admin@example.com"
echo "   Password: admin123"
echo ""
echo "📋 Useful commands:"
echo "   View logs:     $DOCKER_COMPOSE logs -f"
echo "   Stop services: $DOCKER_COMPOSE down"
echo "   Restart:       $DOCKER_COMPOSE restart"
echo ""
echo "Happy coding! 🎉"
