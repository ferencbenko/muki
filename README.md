# Muki E-Commerce Application

[![CI/CD Pipeline](https://github.com/ferencbenko/muki/actions/workflows/ci.yml/badge.svg)](https://github.com/ferencbenko/muki/actions/workflows/ci.yml)
[![Backend Coverage](https://codecov.io/gh/ferencbenko/muki/branch/main/graph/badge.svg?flag=backend)](https://codecov.io/gh/ferencbenko/muki)
[![Frontend Coverage](https://codecov.io/gh/ferencbenko/muki/branch/main/graph/badge.svg?flag=frontend)](https://codecov.io/gh/ferencbenko/muki)

A modern, full-stack e-commerce application built with React, Node.js, and MySQL. This project features a product catalog, shopping cart functionality, and a RESTful API backend.

## 🚀 Features

- **Product Catalog**: Browse and view products with detailed information
- **Shopping Cart**: Add, remove, and manage items in your cart
- **RESTful API**: Well-documented backend API with Swagger documentation
- **Type Safety**: Full TypeScript implementation on both frontend and backend
- **State Management**: Zustand for efficient client-side state management
- **Testing**: Comprehensive test coverage with Jest and Vitest
- **Docker Support**: Containerized database for easy setup

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- Zustand (State Management)
- Axios
- Vitest + React Testing Library

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- Swagger/OpenAPI
- Jest

### DevOps

- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Codecov (Coverage Reporting)

### Code Quality

- ESLint
- Prettier
- Jest & Vitest
- Automated Testing & Coverage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Docker** and Docker Compose

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ferencbenko/muki.git
cd muki
```

### 2. Start the Database

Start the MySQL database using Docker:

```bash
docker-compose up -d mysql
```

Verify the database is running:

```bash
docker-compose ps
```

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Create environment files based on the example files:

- **Backend**: Copy `.env.example` to `.env.local` in the `backend/` directory
- **Frontend**: Copy `.env.example` to `.env.local` in the `frontend/` directory

Update the values as needed for your local environment.

### 5. Run the Applications

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

The backend will start on http://localhost:3000

- **API Documentation**: http://localhost:3000/api-docs (Swagger UI)
- **Health Check**: http://localhost:3000/api/health

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:3001

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                  # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

Coverage reports are automatically generated in `backend/coverage/` and can be viewed in your browser by opening `backend/coverage/lcov-report/index.html`.

### Frontend Tests

```bash
cd frontend
npm test                  # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

Coverage reports are automatically generated in `frontend/coverage/` and can be viewed in your browser by opening `frontend/coverage/index.html`.

### CI/CD Integration

The project uses GitHub Actions for continuous integration and deployment:

- ✅ **Automated Testing**: All tests run automatically on every push and pull request
- ✅ **Code Quality Checks**: ESLint runs on all code changes
- ✅ **Build Verification**: Both frontend and backend builds are verified
- ✅ **Coverage Reporting**: Test coverage is automatically uploaded to Codecov
- ✅ **Badge Updates**: Coverage badges in README update automatically on merges to main

View the [CI/CD workflow](.github/workflows/ci.yml) for more details.

## 📁 Project Structure

```
muki/
├── backend/              # Node.js/Express backend
│   ├── src/
│   │   ├── config/      # Database and app configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── types/       # TypeScript type definitions
│   └── tests/           # Backend tests
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API client
│   │   ├── store/       # State management
│   │   ├── types/       # TypeScript type definitions
│   │   └── utils/       # Utility functions
│   └── tests/           # Frontend tests
├── database/            # Database schema and seed data
│   ├── schema.sql      # Database schema
│   └── seed.sql        # Initial data
└── docker-compose.yml   # Docker services configuration
```

## 🔧 Development Workflow

### Code Quality

#### Backend

```bash
cd backend
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

#### Frontend

```bash
cd frontend
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

### Database Management

#### Reset Database

To reset the database with fresh schema and seed data:

```bash
docker-compose down -v
docker-compose up -d mysql
```

#### Access Database

You can access the MySQL database directly via command line:

```bash
docker-compose exec mysql mysql -u root -p
```

Or use Adminer (web-based database management tool) at http://localhost:8080

- **Server**: `mysql`
- **Username**: `muki_user`
- **Password**: `muki_password`
- **Database**: `muki_db`

## 📚 API Documentation

Once the backend is running, visit http://localhost:3000/api-docs to explore the API using Swagger UI. The documentation includes:

- Available endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication requirements
