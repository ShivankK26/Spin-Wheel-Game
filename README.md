# Spin the Wheel Game

This is a full-stack application for a "Spin the Wheel" game built using React (frontend), Node.js/Express (backend), and Prisma (ORM) connected to a MySQL database hosted on a service provider like Aiven. The application allows users to input the number of segments on the wheel and the content of each segment. When the wheel is spun, a segment is randomly selected, and the result is saved to the database.

## Features

- Users can define the number of segments on the wheel.
- Users can enter the content for each segment.
- When the wheel is spun, a segment is randomly selected.
- The result of each spin is saved to a MySQL database using Prisma.

## Prerequisites

- Node.js and npm installed
- MySQL database (local or hosted, e.g., Aiven)
- Prisma CLI installed

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/ShivankK26/Spin-Wheel-Game.git
```

### 2. Set Up the Client

Navigate to the `client` directory and install the dependencies:

```sh
cd client
npm install
```

### 3. Set Up the Server

Navigate to the `server` directory and install the dependencies:

```sh
cd ../server
npm install
```

### 4. Configure Prisma

Initialize Prisma and set up the MySQL connection:

```sh
npx prisma init
```

### 5. Set Up Environment Variables

Create a `.env` file in the `server` directory and add your database connection string:

```env
DATABASE_URL="mysql://username:password@hostname:port/database_name"
```

Replace `username`, `password`, `hostname`, `port`, and `database_name` with your MySQL service details.

### 6. Run Prisma Migrations

Generate and run the migration to create the database schema:

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 7. Start the Server

```sh
node index.js
```

The server will start running on port 5173.

### 8. Start the Client

Navigate back to the `client` directory and start the React development server:

```sh
cd ../client
npm run dev
```

The client will start on port 3000.

## Connecting to Aiven

To connect the MySQL database to Aiven:
1. Create a MySQL service on Aiven.
2. Obtain the connection details from Aiven.
3. Update the `.env` file with the Aiven connection details:

   ```env
   DATABASE_URL="mysql://username:password@aiven-hostname:port/database_name"
   ```

Replace `username`, `password`, `aiven-hostname`, `port`, and `database_name` with your Aiven service details.
```