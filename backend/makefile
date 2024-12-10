SHELL=/bin/bash
STARTDEV = bun run start:dev

# All command
all: backendDevBuild docker

# Backend development build
backendDevBuild: docker
	@sudo bun run start:dev

# API start command
api:
	$(STARTDEV)

# Docker build and compose
docker:
	@echo "Running containers"
	# @sudo systemctl stop mysql
	# @sudo docker build -f ./Dockerfile -t laccount-app .
	@sudo docker compose up -d --force-recreate --remove-orphans

# Prisma migration
prisma:
	@sudo prisma migrate dev --name $(name)

# Git commit and push
git:
	@git add .
	@git commit -m "$(m)"
	@git push $(origin)
