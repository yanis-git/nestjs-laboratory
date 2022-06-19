up:
	docker-compose up
down:
	docker-compose down

dev:
	yarn start:dev

migrate:
	npx prisma generate
	npx prisma db push

studio:
	npx prisma studio
