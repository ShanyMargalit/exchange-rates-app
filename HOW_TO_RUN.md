# How to Run the Exchange Rates App

## Prerequisites

1. Node.js and npm: [Install Node.js](https://nodejs.org/)
2. .NET SDK: [Install .NET SDK](https://dotnet.microsoft.com/download)

## Cloning the Repository

1. Clone the project repository:
    ```bash
    git clone https://github.com/ShanyMargalit/exchange-rates-app.git
    ```
   
2. Navigate to the project's root directory:
    ```bash
    cd exchange-rates-app
    ```

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
    dotnet run --launch-profile https
    ```

   The API will run on `https://localhost:7061` by default.

## Frontend (React with Vite)

1. Navigate to the frontend project directory:
    ```bash
    cd Frontend
    ```

2. Install the dependencies:
    ```bash
    npm install --legacy-peer-deps
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
