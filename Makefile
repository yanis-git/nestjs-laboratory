up:
	docker-compose up mongodb_container
down:
	docker-compose down

dev:
	yarn start:dev

migrate:
	npx prisma generate
	npx prisma db push

studio:
	npx prisma studio


test_rm:
	docker-compose rm  -s -f -v mongodb_test
test_up:
	docker-compose up -d mongodb_test

test_ci:
	make test_rm
	make test_up
	sleep 1
	npx dotenv -e .env.test -- npx prisma generate
	npx dotenv -e .env.test -- npx prisma db push
