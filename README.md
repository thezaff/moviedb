# Install dependencies

```bash
$ npm install
```

# Start Development

```bash
$ docker-compose up
```

You can see API reference (Swagger) on [localhost:3000](http://localhost:3000/).

## Rebuild with updated mounts:

```bash
$ docker-compose up --build -V
```

## Description

This project is built with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
