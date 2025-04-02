## Getting Started (Backend Only - Current State)

These instructions cover setting up and running the **backend** development server as it currently exists.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd ecommerce-platform
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Run the backend development server:**
    ```bash
    npm run dev
    ```

5.  The backend server should now be running on `http://localhost:3001` (or the port specified in `backend/src/server.ts`). You should see console output indicating the server has started. You can access the basic test route at `http://localhost:3001/` in your browser or using a tool like Postman/Insomnia.