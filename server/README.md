## Environment Variables

To run this server locslly, you will need to add the following environment variables to your .env file. rename the envExample as .env

`DATABASE_URL=---URI OF DATABASE---`

## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/Proac-Tee/apollo_pern_stack.git
```

Go to the project directory

```bash
  cd /server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### File structure of important files

```sh
- server
  - prisma
    - migrations
    - schema.prisma
  - src
    - datasources
      - prisma-database.ts
    - schema
      - schema.ts
    - graphql.d.ts
    - index.ts
    - resolvers.ts
   env
  .gitattributes
  .gitignore
  apollo.config.ts
  package-lock.json
  package.json
  tsconfig.json

```
