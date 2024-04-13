# Dashboard Project

This project is a full-stack application built to manage users and posts using Apollo Server for the GraphQL API, Express.js middleware to launch the backend server, and React with Apollo Client for frontend communication with the backend. It provides a seamless user experience for creating, reading, updating, and deleting users and posts. The project was built using TypeScript for type safety and enhanced developer experience.

## Backend (GraphQL Server)

The backend of this project utilizes Apollo Server and Express.js middleware to handle GraphQL queries and mutations. It provides a robust API for managing users and posts, including authentication and authorization features if implemented.

## Frontend (React + Apollo Client)

The frontend is built with React and utilizes Apollo Client to interact with the GraphQL server. It offers a responsive user interface for viewing and interacting with users and posts, providing features such as real-time updates and optimistic UI rendering.

## Features

- User Management: Allows users to register, login, and logout from the application.
- Post Management: Enables users to create, view, edit, and delete posts.
- Optimistic UI Rendering: Provides smooth user experience by optimistically updating the UI before receiving confirmation from the server.
- Authentication & Authorization: Secure access to user-specific data and actions t ensure only the intented authors have the right to modify posts.

## Technologies Used

_Backend_

[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo-GraphQL](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

_Database_

[![Supabase](https://img.shields.io/badge/Supabase-6534FF?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

_Authentication_

[![Supabase](https://img.shields.io/badge/Supabase-6534FF?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)

_ORM_

[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

_Frontend_

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Apollo Client](https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/docs/react/)
[![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://react-bootstrap.github.io/)

## Installation

You need a Node.js runtime installed

#### 🔗 Click Link to install Node.js

[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)

## Run Locally

_Setting up the Backend_

`navigate to /server to see setup instructions`

_Setting up the Frontend_

`navigate to /client to see setup instructions`

## API Reference

_Queries_

#### Get all post

```http
  Query Posts
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| none      | `string` | get all posts |

#### Get specific post

```http
  Query post
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to fetch |

#### Get all users

```http
  Query users
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| none      | `string` | get all users |

#### Get specific user

```http
  Query user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

---

_Mutations_

#### Create a new post

```http
  Mutation addPost
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `title`    | `string` | **Required**. content to post             |
| `username` | `string` | **Required**. username of creator to post |
| `authorId` | `string` | **Required**. Id of creator to post       |

#### Create a new user

```http
  Mutation addUser
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. user email    |
| `password` | `string` | **Required**. user password |

#### Update post

```http
  Mutation updatePost
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of post to update      |
| `title`   | `string` | **Required**. updated post not nullable |

#### Delete post

```http
  Mutation deletePost
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of post to delete |

#### Delete post

```http
  Mutation addPost
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of post to delete |

## Usage/Examples

#### Request:

```javascript
GET all posts

query Query {
  posts {
    UpdatedAt
    authorId
    createdAt
    id
    title
    username
  }
}
```

#### Response:

```javascript
{
  "data": {
    "posts": [
      {
        "UpdatedAt": "1712976518153",
        "authorId": "dcaa05f6-90c2-4b1e-bc5c-cecc8cc586c5",
        "createdAt": "1712976518153",
        "id": "e582d6e7-664a-4ab7-8dbd-d7ab4ab74e4d",
        "title": "jhhkkkj",
        "username": "user_4251d507"
      },
      {
        "UpdatedAt": "1712976656335",
        "authorId": "dcaa05f6-90c2-4b1e-bc5c-cecc8cc586c5",
        "createdAt": "1712976656335",
        "id": "9cf1e4c4-dd76-4bf2-afc7-bfd1b3ec4b9b",
        "title": "ghghhg",
        "username": "user_4251d507"
      },
      {
        "UpdatedAt": "1712936777478",
        "authorId": "0aeff73b-c694-4cb9-bbcb-2979e6026e1a",
        "createdAt": "1712936331975",
        "id": "3509e3e4-2df1-4081-8add-73da8c232a1b",
        "title": "DUMMY 3",
        "username": "user_d64b72f5"
      },
    ]
  }
}
```

#### Request:

```javascript
POST addPosts
Content-Type: application/json

mutation AddPost($posts: AddUserPostInput!) {
  addPost(posts: $posts) {
    UpdatedAt
    authorId
    createdAt
    id
    title
    username
  }
}

```

#### Response:

```javascript
{
  "data": {
    "addPost": {
      "UpdatedAt": "1713006895863",
      "authorId": "dcaa05f6-90c2-4b1e-bc5c-cecc8cc586c5",
      "createdAt": "1713006895863",
      "id": "d8222c29-d73e-4ae9-a640-534b1bfbf80e",
      "title": "test post",
      "username": "user_4251d507"
    }
  }
}

```

### File structure of important files

```sh
- Root Directory
  - client
    - public
      - index.html
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
  - server
    - prisma
      - migrations
      - schema.prisma
    - src
      - datasources
        - datasources.ts
      - schema
        - schema.ts
      - graphql.d.ts
      - index.ts
      - resolvers.ts
    .gitattributes
    .gitignore
    apollo.config.ts
    package-lock.json
    package.json
    tsconfig.json

```
