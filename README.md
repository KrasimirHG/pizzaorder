
## Description

Order pizza API made in Nest.js, Typescript, TypeORM and SQLite

## Installation

```bash
$ npm install
```
### Necessary files:
#### .env.dev
DB_NAME=pizza.sqlite
COOKIE_KEY=your-cookie-key

#### .env.test
DB_NAME=tetsPizza.sqlite
COOKIE_KEY=your-cookie-key
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

### In every module there is request.http file for easy testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
