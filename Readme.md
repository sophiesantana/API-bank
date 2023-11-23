API Financeira


Esta API Rest oferece as principais funcionalidades de uma aplicação financeira, permitindo a gestão de pessoas, contas, cartões e transações. Utiliza tecnologias como NodeJS, Express, Typescript, TypeORM, PostgreSQL, e adota autenticação Bearer/JWT.


Pré-requisitos:
Node.js versão 16 ou superior


Clone este repositório e instale as dependências


Migrations
Para configurar o banco de dados e executar as migrações, utilize os seguintes comandos:


Criar uma migration: npm run typeorm:create src/database/migrations/card
Executar as migrações: npm run typeorm:run
Reverter a última migração: npm run typeorm:revert


Funcionalidades
Criar uma pessoa (CPF ou CNPJ único).
Adicionar e listar contas de uma pessoa.
Adicionar e listar cartões de uma conta.
Listar cartões de uma pessoa.


Rotas Desprotegidas
POST /people: Criar uma pessoa.
POST /login: Autenticar usuário.


Rotas Protegidas
POST /accounts: Adicionar uma conta.
GET /accounts: Listar contas.
POST /accounts/:accountId/cards: Adicionar um cartão a uma conta.
GET /accounts/:accountId/cards: Listar cartões de uma conta.
GET /accounts/cards: Listar cartões de uma pessoa.


Falta Implementar:
Disponibilizar API na nuvem.
Testes unitários e de integração.
Paginação.
Outras Rotas:

POST /accounts/:accountId/transactions: Adicionar transação.
GET /accounts/:accountId/transactions: Listar transações.
GET /accounts/:accountId/balance: Verificar saldo.
POST /accounts/:accountId/transactions/:transactionId/revert [Opcional]: Reverter transação.


Contribuições são bem-vindas!

