# Calculator API

This project is a REST API written in NodeJS using the NestJS framework. I used the @nestjs/passport module with the passport-jwt strategy to secure endpoints with JWT. The API performs basic arithmetic operations (addition, subtraction, multiplication, division) on two numerical values provided in the body of a POST request. The math operation is required as an http header. The API also requires an HTTP header for authorization using JWT (Bearer).

## Features

- Perform basic arithmetic operations (addition, subtraction, multiplication, division).
- JWT-based authorization.
- Swagger documentation for API endpoints.
- Unit tests and end-to-end tests.
- Dockerized for easy deployment.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build and run the Docker containers**:

   ```sh
   docker-compose up -d
   ```

   This will build the Docker image and start the application on port `8080`.

3. **Access the API documentation**:
   Open your browser and navigate to `http://localhost:8080/swagger` to view the Swagger UI.

4. **Login to access the calculate endpoint**:
   On the swagger UI, execute the POST request to "/auth/login" with the provided hardcoded user in order to recieve a 5-min valid token. Insert the token in the "Authorize" panel to be authorized by the API.

5. **Access the OpenAPI YAML**:
   Open your browser and navigate to `http://localhost:8080/swagger-yaml` to view the most up to date OpenAPI YAML.

### Running the Tests

**Unit Tests**:

```sh
npm test
```

## Docker Configuration

- **dockerfile**: Defines the Docker image for the application.
- **docker-compose.yml**: Defines the Docker services and their configurations.
