# API Restful com Node.js, Express, Typescript, Sequelize, Redis e Jest

Node versão 16.13.0

## Rodando a aplicação localmente

Clone o projeto:

```
$ git clone git@github.com:robertolima-dev/node-jest-teste.git
```

Configure o arquivo .env utilizando o exemplo .env.example:

```
$ cd node-jest-teste

$ npm install

$ npm run db:migrate

$ npm run test
```

Inicie o Redis com o comando docker abaixo:

```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Inicie o RedisInsight com o comando docker abaixo:

```
docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
```

Inicie a aplicação:

```
$ npm run dev
```

`http://localhost:4001`.

