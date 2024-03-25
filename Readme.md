# URL Shortener Service

## Overview

This URL Shortener Service is a full-stack application that allows users to create shorter aliases for long URLs. Shortened URLs are easier to share, manage, and remember. The service features user authentication, so only registered users can create and manage their URLs.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
A lightweight super fast alternative to docker desktop is [Orbstack](https://orbstack.dev/)

### Running the Application

To start the application:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to start all services in containers:

   ```bash
   npm run start:dev
   ```
This command will spin up the application, MongoDB, and Redis containers. The application will be accessible at http://localhost:7070.

To stop the application and all services, run: 

   ```bash
   npm run stop:dev
   ```

### API Endpoints

#### User Registration

- Endpoint: `/api/register`
- Method: POST
- Body:
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```

#### User Login

- Endpoint: `/api/login`
- Method: POST
- Body:
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```

#### Create Short URL

- Endpoint: `/shorten`
- Method: POST
- Body:
    ```json
    {
        "fullUrl": "https://example.com/your-long-url"
    }
    ```
Note: This endpoint requires a valid JWT token obtained from the login endpoint in the Authorization header.

#### Redirect Short URL

- Endpoint: `/:shorturl`
- Method: GET

Accessing this endpoint will redirect the user to the original URL associated with the short URL.

#### Delete Short URL

- Endpoint: `/:shorturl`
- Method: DELETE

Note: This endpoint requires a valid JWT token obtained from the login endpoint in the Authorization header.


#### Making API calls
To make API calls to these endpoints, you can use tools like [Postman](https://web.postman.com/), [Insomnia](https://insomnia.rest/) or [Curl](https://curl.se/). For endpoints requiring authentication, include the JWT token in the Authorization header as `Bearer <token>`.

Example using Curl to create a short URL:

```bash
curl -X POST http://localhost:7070/shorten \
     -H "Authorization: Bearer <your_token_here>" \
     -H "Content-Type: application/json" \
     -d '{"fullUrl": "https://example.com/your-long-url"}'

```

#### Scripts

- `start:dev`: Starts the development server with hot reload. This starts the server and the dependent services like mongodb, and redis in a docker container.
- `stop:dev`: Stops the development server and cleans up containers.
- `build`: Compiles Typescript files to Javascript.
- `start`: Starts the production server using compiled JavaScript files.
- `dev`: Runs the development server with hot reload. This assumes you have the dependent services like mongodb, and redis already running locally.
- `test`: Runs test suites with Jest.

#### Docker Configuration
The application is containerized using Docker, with a docker-compose.yml file to configure and link the application, MongoDB, and Redis containers. The Dockerfile.dev is used to build the development environment, setting up Node.js and copying the project files into the container.

#### Running without Docker
- Create a `.env` file in the root directory of the cloned project. There's an `env.example` file that tells your the variables needed. 
- Make sure you have mongodb and redis servers running.
- Run the following commands:
    ```bash 
    npm install
    ```
    ```bash
    npm start dev
    ```

#### TO-DO
- Create Frontend for it.
- Deploy

