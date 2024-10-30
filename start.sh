#!/bin/bash
(cd frontend && docker-compose up --build -d)

(cd backend && docker-compose up --build -d)

sleep 5

xdg-open http://localhost:5173

docker-compose -f frontend/docker-compose.yml logs -f &
docker-compose -f backend/docker-compose.yml logs -f
