# Full-Stack E-commerce Platform

This is a project to build a full-stack e-commerce web application, intended as a learning exercise and portfolio piece covering a range of modern web development skills.

The project is structured as a monorepo containing separate `frontend` and `backend` applications.

## Current Status (As of Phase 1, Step 2 Completion)

*   **Backend:**
    *   Node.js project initialized using Express.js and TypeScript.
    *   PostgreSQL database connection established using Prisma ORM.
    *   Initial data models defined (`User`, `Product`, `Category`) in `prisma/schema.prisma`.
    *   Database tables created via `prisma migrate dev`.
    *   Basic Express server setup (`src/server.ts`) with a root (`/`) health check route.
    *   Development server (`npm run dev`) using `ts-node-dev` is functional.
    *   Build script (`npm run build`) compiles TypeScript to JavaScript.
    *   Start script (`npm run start`) runs the compiled application.
*   **Frontend:**
    *   Placeholder directory exists, but the frontend application has **not** been set up yet.

## Tech Stack (Backend - Current)

*   **Runtime:** Node.js (v18.x or later recommended)
*   **Framework:** Express.js
*   **Language:** TypeScript
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Package Manager:** npm
*   **Version Control:** Git

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (v18.x or later) & npm (comes with Node.js)
*   [Docker](https://www.docker.com/products/docker-desktop/) **OR** a local installation of [PostgreSQL](https://www.postgresql.org/download/)

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

8.  The backend server should now be running (typically on `http://localhost:3001` - check console output). You can access the basic test route at `http://localhost:3001/` in your browser or using a tool like Postman/Insomnia to verify it's working.

## Project Structure Overview
ecommerce-platform/
├── .git/
├── .gitignore # Root gitignore
├── backend/ # Node.js/Express/Prisma Backend
│ ├── prisma/ # Prisma schema, migrations
│ ├── src/ # TypeScript source code
│ ├── .env # Local environment variables (ignored by git)
│ ├── .env.example # Example environment variables
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
└── frontend/ # Placeholder for React Frontend (Not yet implemented)
└── ...


## Available Scripts (Backend - inside `backend` directory)

*   `npm run dev`: Starts the backend server in development mode using `ts-node-dev` with hot-reloading.
*   `npm run build`: Compiles TypeScript code from `src/` to JavaScript in `dist/`.
*   `npm run start`: Runs the compiled JavaScript application from the `dist/` folder (for production).
*   `npx prisma migrate dev`: Applies pending database migrations and generates/updates Prisma Client.
*   `npx prisma studio`: Opens a GUI in your browser to view and interact with your database data via Prisma.
*   `npx prisma generate`: Manually regenerates Prisma Client (usually done automatically by `migrate dev`).

## Next Steps

*   Implement CRUD API endpoints for Products and Categories in the backend.
*   Set up the React frontend project.
*   Implement User Authentication (Backend & Frontend).
*   ... and more features!