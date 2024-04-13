## Environment Variables

To run this server locslly, you will need to add the following environment variables to your .env file. rename the envExample as .env

`VITE_REACT_APP_SUPABASE_URL=---SUPABASE_URL---`

`VITE_REACT_APP_APOLLO_BACKEND=---URI OF WHERE FRONTEND IS HOSTEAD---`

`VITE_REACT_APP_SUPABASE_ANNON=---SUPABASE_ANNON---`

## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/Proac-Tee/apollo_pern_stack.git
```

Go to the project directory

```bash
  cd /client
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
- client
  - public
  - src
    - Graphql
      - Mutation.ts
      - Query.ts
    - assets
    - components
      - Dashboard.tsx
      - Header.tsx
      - LoginForm.tsx
      - SignUpForm.tsx
    - supabase
      - AuthProvider.tsx
      - supabaseClient.ts
    - App.css
    - App.tsx
    - index.css
    - main.tsx
    - vite-env.d.ts
  .eslintrc.cjs
  .gitignore
  .netlify.toml
  README.md
  package-lock.json
  package.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts

```

# Vite Setup informations

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
