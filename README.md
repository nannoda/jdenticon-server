# Jdenticon Server

A simple HTTP server built with [Bun](https://bun.sh/) that generates identicons using [Jdenticon](https://jdenticon.com/). This server accepts JSON payloads and returns an identicon image (either SVG or PNG) based on the specified parameters.

## Features

- Generates PNG or SVG identicons based on a string input.
- Lightweight and fast server built with Bun.
- Supports JSON POST requests for dynamic icon generation.
- Configurable port settings.

## Prerequisites

Before running the server, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Bun](https://bun.sh/) (if running outside of Docker)

## Getting Started

### Run with Docker

To run the server with Docker, you can use Docker Compose:

```bash
docker-compose up -d
```

This will build and start the server on port 16043 by default.

### Docker Compose Service Configuration
The Docker service is configured as follows in docker-compose.yml:

```yaml
services:
  jdenticon-server:
    container_name: jdenticon-server
    build:
      context: https://github.com/nannoda/jdenticon-server.git
      dockerfile: Dockerfile
    restart: always
    ports:
      - 16043:16043
```

### API Usage

The server listens for POST requests at the root URL (/). The request body must be a JSON object containing the following parameters:

- value (string): The value used to generate the identicon.
- size (number): The size (in pixels) of the generated identicon.
- type (string): The type of image to generate (png or svg).
#### Example Request
```bash
curl -X POST http://localhost:16043 -d '{"value": "avatar123", "size": 240, "type": "png"}' -H "Content-Type: application/json" --output avatar.png
```
