# How to Run the Exchange Rates App

## Prerequisites

1. Node.js and npm: [Install Node.js](https://nodejs.org/)
2. .NET SDK: [Install .NET SDK](https://dotnet.microsoft.com/download)

## Backend (ASP.NET Core)

1. Navigate to the backend project directory:
    ```bash
    cd Backend/ExchangeRatesAPI
    ```

2. Restore the dependencies:
    ```bash
    dotnet restore
    ```

3. Run the backend API:
    ```bash
    dotnet run
    ```

   The API will run on `http://localhost:5000` by default.

## Frontend (React with Vite)

1. Navigate to the frontend project directory:
    ```bash
    cd Frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

   The development server will run on `http://localhost:5173` by default.

## Access the Application

1. Ensure both the backend and frontend are running.
2. Open your browser and navigate to `http://localhost:5173` to view the application.

## Additional Information

- The frontend makes API calls to the backend to fetch exchange rates and available currencies.
- Ensure CORS is configured correctly in the backend to allow requests from the frontend.
