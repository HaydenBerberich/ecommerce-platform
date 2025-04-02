# Full-Stack E-commerce Platform

This is a project to build a full-stack e-commerce web application, intended as a learning exercise and portfolio piece covering a range of modern web development skills.

The project is structured as a monorepo containing separate `frontend` and `backend` applications.

## Current Status (As of Phase 1, Step 3 Completion)

*   **Backend:**
    *   Node.js project initialized using Express.js and TypeScript.
    *   PostgreSQL database connection established using Prisma ORM.
    *   Data models defined (`User`, `Product`, `Category`) in `prisma/schema.prisma`.
    *   Database tables created via `prisma migrate dev`.
    *   Basic Express server setup (`src/server.ts`) with JSON parsing middleware.
    *   **Implemented CRUD (Create, Read, Update, Delete) API endpoints for Products and Categories.**
        *   Routes organized using `Express Router` (`src/routes/`).
        *   Business logic handled in controllers (`src/controllers/`).
        *   Database interactions performed using `Prisma Client` (`src/lib/prisma.ts`).
        *   Endpoints available under `/api/products` and `/api/categories`.
        *   Basic error handling and validation included.
    *   Development server (`npm run dev`) using `ts-node-dev` is functional.
    *   Build script (`npm run build`) compiles TypeScript to JavaScript.
    *   Start script (`npm run start`) runs the compiled application.
*   **Frontend:**
    *   Placeholder directory exists, but the frontend application has **not** been set up yet.

## API Endpoints (Backend - Current)

The following API endpoints are available (no authentication required yet):

**Categories:** Base URL `/api/categories`
*   `GET /`: Get all categories.
*   `POST /`: Create a new category. Requires JSON body: `{ "name": "string", "description": "string?" }`
*   `GET /:id`: Get a single category by its ID.
*   `PUT /:id`: Update a category by its ID. Requires JSON body: `{ "name": "string", "description": "string?" }`
*   `DELETE /:id`: Delete a category by its ID.

**Products:** Base URL `/api/products`
*   `GET /`: Get all products (includes category data).
*   `POST /`: Create a new product. Requires JSON body: `{ "name": "string", "description": "string", "price": number, "stockQuantity": number, "imageUrls": ["string"]?, "categoryId": number }`
*   `GET /:id`: Get a single product by its ID (includes category data).
*   `PUT /:id`: Update a product by its ID. Requires JSON body with fields to update (e.g., `{ "price": number, "stockQuantity": number }`).
*   `DELETE /:id`: Delete a product by its ID.

## Tech Stack (Backend - Current)

*   **Runtime:** Node.js (v18.x or later recommended)
*   **Framework:** Express.js
*   **Routing:** Express Router
*   **Language:** TypeScript
*   **Database:** PostgreSQL
*   **ORM:** Prisma (with Prisma Client)
*   **Package Manager:** npm
*   **Version Control:** Git

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (v18.x or later) & npm (comes with Node.js)
*   [Docker](https://www.docker.com/products/docker-desktop/) **OR** a local installation of [PostgreSQL](https://www.postgresql.org/download/)
*   An API testing tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) (for testing backend endpoints)

## Getting Started (Backend Only - Current State)

These instructions cover setting up and running the **backend** development environment.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd ecommerce-platform
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Set up Environment Variables:**
    *   The backend requires a `.env` file for configuration, primarily the database connection string.
    *   Copy the example file:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and replace the placeholder values in `DATABASE_URL` with your actual PostgreSQL connection details:
        ```dotenv
        # Example for Docker setup (replace password and db name if different)
        DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ecommerce_dev?schema=public"
        ```
    *   **Important:** The `.env` file contains sensitive information and is included in `.gitignore` – **do not commit it**.

4.  **Set up PostgreSQL Database:**
    *   **Using Docker (Recommended):**
        *   Make sure Docker Desktop is running.
        *   Start the PostgreSQL container (if not already running from setup):
            ```bash
            # Use the password you intend to set in your .env file
            docker run --name postgres-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
            ```
        *   Connect to the running container and create the database specified in your `.env` file (e.g., `ecommerce_dev`):
            ```bash
            docker exec -it postgres-db psql -U postgres
            # Inside psql:
            CREATE DATABASE ecommerce_dev;
            \q
            ```
    *   **Using Local PostgreSQL:**
        *   Ensure your local PostgreSQL server is running.
        *   Use `psql` or a GUI tool (like pgAdmin, DBeaver) to create the database (e.g., `ecommerce_dev`) and ensure the user/password combination in your `.env` file has access to it.

5.  **Install backend dependencies:**
    ```bash
    npm install
    ```

6.  **Run Database Migrations:**
    *   This step applies the Prisma schema (`prisma/schema.prisma`) to your database, creating the necessary tables (`users`, `products`, `categories`, `_prisma_migrations`).
    ```bash
    npx prisma migrate dev
    ```
    *   Prisma might ask for a migration name (e.g., type `init` if it's the first time) and confirm the operation.

7.  **Run the backend development server:**
    ```bash
    npm run dev
    ```

8.  The backend server should now be running (typically on `http://localhost:3001` - check console output). You can now use Postman/Insomnia to interact with the API endpoints listed under the "API Endpoints" section (e.g., `POST` to `/api/categories` to create a category, `GET` to `/api/products` to list products).

## Project Structure Overview

```text
ecommerce_platform/
├── .git/
├── .gitignore      # Root gitignore
├── backend/        # Node.js/Express/Prisma Backend
│   ├── prisma/     # Prisma schema, migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/        # TypeScript source code
│   │   ├── controllers/ # Request handling logic
│   │   │   ├── category.controller.ts
│   │   │   └── product.controller.ts
│   │   ├── lib/        # Shared libraries/utilities
│   │   │   └── prisma.ts # Prisma Client instance
│   │   ├── routes/     # API route definitions
│   │   │   ├── category.routes.ts
│   │   │   └── product.routes.ts
│   │   └── server.ts   # Express server setup and entry point
│   ├── .env        # Local environment variables (ignored by git)
│   ├── .env.example # Example environment variables
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── dist/        # Compiled JS output (ignored by git)
└── frontend/       # Placeholder for React Frontend (Not yet implemented)
    └── ...
```

## Available Scripts (Backend - inside `backend` directory)

*   `npm run dev`: Starts the backend server in development mode using `ts-node-dev` with hot-reloading.
*   `npm run build`: Compiles TypeScript code from `src/` to JavaScript in `dist/`.
*   `npm run start`: Runs the compiled JavaScript application from the `dist/` folder (for production).
*   `npx prisma migrate dev`: Applies pending database migrations and generates/updates Prisma Client.
*   `npx prisma studio`: Opens a GUI in your browser to view and interact with your database data via Prisma.
*   `npx prisma generate`: Manually regenerates Prisma Client (usually done automatically by `migrate dev`).

## Next Steps

*   Implement User Authentication (Backend): Registration, password hashing (bcrypt), login, JWT generation and validation, route protection middleware.
*   Set up the React frontend project: Initialize using Vite, install TypeScript, Tailwind CSS, React Router, state management (Redux Toolkit/Zustand), data fetching library (React Query).
*   Connect Frontend to Backend: Fetch and display Products & Categories.
*   Implement Frontend Authentication: Login/Register forms, storing JWT, protecting routes, managing auth state.
*   Implement Shopping Cart functionality: Backend APIs and Frontend UI/state management.
*   Implement Checkout Process: Backend APIs (order creation) and Frontend UI flow.
*   Add more robust Input Validation and Error Handling.
*   Implement Testing (Unit, Integration, E2E).
*   Containerize using Docker.
*   Deploy to a cloud platform (AWS/GCP/Azure).
*   Set up CI/CD Pipeline.