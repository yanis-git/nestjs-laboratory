## Description

## Installation

**docker**

```bash
docker compose up 
# unable replicate https://github.com/prisma/prisma/issues/8266#issuecomment-966618742
docker-compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"


docker-compose exec mongo mongo --eval "db.createUser({user:'root',pwd: 'root', roles: [{ role: 'readWrite', db: 'bookmarks' }]});"

yarn install
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

# upgrade your schema

When you update schema on schema.prisma you have to run

```bash
# generate the client
npx prisma generate

# push the schemas update
npx prisma db push
```

You can access to your data studio

```bash
npx prisma studio
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

