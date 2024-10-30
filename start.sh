#!/bin/bash

# Navigate to the frontend directory and start Docker Compose in detached mode
(cd frontend && docker-compose up --build -d)

# Navigate to the backend directory and start Docker Compose in detached mode
(cd backend && docker-compose up --build -d)

# Wait for services to start up
sleep 5

# Open browser at localhost:5173
xdg-open http://localhost:5173

# Keep script running by tailing logs from both services
docker-compose -f frontend/docker-compose.yml logs -f &
docker-compose -f backend/docker-compose.yml logs -f
