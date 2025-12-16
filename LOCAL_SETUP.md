# Local Development Setup

This guide explains how to run the Muki e-commerce app for local development

## Prerequisites

- Node.js (v18 or higher)
- Docker
- npm

## Quick Start

### 1. Start the Database

Start the MySQL database using Docker:

```bash
docker-compose up -d mysql
```

Verify the database is running:

```bash
docker-compose ps
```

### 2. Install Dependencies

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

### 3. Configure Environment Variables

- **Backend**: `backend/.env.local`
- **Frontend**: `frontend/.env.local`

See the .example files

### 4. Run the Applications

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

The backend will start on http://localhost:3000

- Swagger API docs available at http://localhost:3000/api-docs
- Health check at http://localhost:3000/api/health

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:3001

## Development Workflow

### Running Tests

#### Backend Tests

```bash
cd backend
npm test                  # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

#### Frontend Tests

```bash
cd frontend
npm test                  # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

## Troubleshooting

### Reset Database

To reset the database with fresh data:

```bash
docker-compose down -v
docker-compose up -d mysql
```

This will recreate the database with the schema and seed data.

## Additional Commands

### Linting and Formatting

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```
