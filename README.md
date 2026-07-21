# Nutrition Tracker

A full-stack nutrition and meal-logging application built with Angular, Spring Boot, PostgreSQL, and Docker.

## Tech Stack

- **Frontend:** Angular 18 (standalone components)
- **Backend:** Spring Boot 4.1
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens)
- **Containerization:** Docker Compose

## Features

- User registration and login (JWT-based authentication)
- Food search (public) and custom food creation (authenticated)
- Meal logging with daily calorie/nutrient totals
- User profile page for viewing and updating daily calorie goals
- Persistent navigation bar (Dashboard, Food Search, Profile) that only appears when logged in, with logout support

## Prerequisites

- Docker Desktop
- Node.js 20.19+ or 22.12+ (for local frontend development outside Docker)
- Java 17+ and Maven (for local backend development outside Docker)

## Project Structure

```
nutrition-tracker/
├── backend/          # Spring Boot API
│   └── src/main/java/com/nutritiontracker/
│       ├── config/       # Security config, CORS, bean config (PasswordEncoder, AuthenticationManager)
│       ├── controller/   # REST controllers
│       ├── dto/          # Request/response DTOs
│       ├── entity/       # JPA entities
│       ├── repository/   # Spring Data repositories
│       ├── security/     # JWT filter/util
│       └── service/      # Business logic
├── frontend/         # Angular application
│   └── src/app/
│       ├── core/
│       │   └── guards/   # Route guards (authGuard)
│       └── features/     # Feature modules (auth, dashboard, food-search, profile)
├── db/                # Database init scripts
└── docker-compose.yml
```

## Getting Started

### Run the full stack with Docker

```bash
docker compose up --build
```

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:8080](http://localhost:8080)

To force a clean rebuild (recommended after pulling changes or editing Dockerfiles):

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

Stop everything:

```bash
docker compose down
```

Stop and wipe the database volume:

```bash
docker compose down -v
```

### Run locally without Docker (faster dev loop)

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
ng serve
```

Frontend runs at `http://localhost:4200`, backend at `http://localhost:8080`.

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/foods/search?query=` | No | Search foods |
| GET | `/api/foods/{id}` | Yes | Get food by ID |
| POST | `/api/foods` | Yes | Create custom food |
| GET | `/api/users/profile` | Yes | Get current user's profile |
| PUT | `/api/users/profile` | Yes | Update daily calorie goal |
| POST | `/api/meal-logs` | Yes | Log a meal |
| GET | `/api/meal-logs/daily?date=` | Yes | Get daily log |
| GET | `/api/meal-logs/calories?date=` | Yes | Get daily calorie total |
| DELETE | `/api/meal-logs/{id}` | Yes | Delete meal log entry |

Authenticated endpoints require an `Authorization: Bearer <token>` header, using the JWT returned from `/api/auth/login`.

### Example requests

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","dailyCalorieGoal":2000}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get profile (authenticated)
curl http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_HERE"

# Update calorie goal (authenticated)
curl -X PUT http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_HERE" \
  -H "Content-Type: application/json" \
  -d '{"dailyCalorieGoal": 2200}'
```

## Common Commands Reference

### Docker

```bash
docker compose ps                          # list running services
docker compose logs -f                     # tail all logs
docker compose logs -f frontend            # tail frontend logs only
docker compose build frontend --no-cache   # rebuild one service clean
```

### Frontend (from `frontend/`)

```bash
npm install                                  # install dependencies
npm ci                                       # clean install from lockfile
ng serve                                     # run dev server
npm run build -- --configuration production  # production build (check errors locally before Docker)
ng generate component features/<name> --standalone
```

### Backend (from `backend/`)

```bash
mvn spring-boot:run          # run the app
mvn compile                  # compile only, fast error check
mvn clean install            # full clean build
```

## Configuration Notes

- CORS is currently configured to allow `http://localhost:4200` explicitly (see `SecurityConfig.java`). Update the allowed origin(s) before deploying beyond local development.
- `PasswordEncoder` and `AuthenticationManager` beans live in their own config classes (`PasswordEncoderConfig.java`, `AuthenticationManagerConfig.java`) rather than inside `SecurityConfig`, to avoid a circular bean dependency with `JwtFilter` and `UserService`.
- The frontend Docker image uses `node:20-alpine`; Angular CLI requires Node 20.19+/22.12+ to build.
- JWTs are stored in `localStorage` on the frontend and attached via an HTTP interceptor.
- The navigation bar in the app shell (`app.html`/`app.ts`) is shown only when a JWT is present in `localStorage`, and hides/shows immediately on login and logout without a page refresh.

## Known Issues / In Progress

- Login/register form submission currently has a reported issue where no request fires on click — under investigation.
