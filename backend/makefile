SHELL=/bin/bash
STARTDEV = bun run start:dev 


all: backendDevBuild docker

backendDevBuild: docker
	@sudo bun run start:dev 

api:
	$(STARTDEV)


docker:
	@echo "Running containers"
	# @sudo systemctl stop mysql
	@sudo docker compose up -d  --remove-orphans


prisma:
	@sudo prisma migrate dev --name $(name)


git:
	@git add .
	@git commit -a -$(m)
	@git push $(origin)

