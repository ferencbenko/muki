# Technical Decisions Report

## Overview

Muki is a full-stack e-commerce application with product catalog and shopping cart functionality. This document summarizes key technical decisions and challenges encountered during development.

---

## Architecture Decisions

**Monorepo Structure:** Single repository with `backend/`, `frontend/`, and `database/` directories for simplified version control and CI/CD coordination. Room for improvement: use a specific monorepo tool, eg. _Nx_.

**Layered Backend:** Separation of concerns with controllers, services, models, routes, and middleware for improved testability and maintainability.

---

## Technology Stack

### Frontend

- **React 18 + TypeScript:** Type safety and component-based architecture
- **Vite:** Fast builds and modern development experience
- **Material UI:** Production-ready component library
- **Zustand:** Lightweight state management
- **Vitest:** Native Vite integration for testing, similar to Jest

### Backend

- **Node.js + Express + TypeScript:** Type-safe RESTful API development
- **MySQL 8.4:** Robust and reliable data storage
- **Jest:** Comprehensive testing framework with mocking
- **Swagger:** Interactive API documentation

### DevOps

- **Docker Compose:** Consistent local development environment
- **GitHub Actions:** Parallel CI/CD jobs for frontend and backend
- **Codecov:** Coverage tracking with PR integration

---

## Challenges & Solutions

### Codecov Integration

To provide clear visibility into code coverage, I integrated Codecov into the project. The setup required careful configuration and troubleshooting, but it is now fully operational and reliably displays coverage metrics upfront, helping the team monitor test coverage effectively.

---

## Testing Strategy

**Backend:** Unit tests for services, 100% statement coverage, mocked database calls

**Frontend:** Component tests with React Testing Library, >95% coverage, user behavior focused

**CI:** Tests run on every push/PR with parallel jobs and coverage upload to Codecov

---
