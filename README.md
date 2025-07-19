# AppCircle - Laravel 12 Docker Setup

This repository contains a Laravel 12 application configured to run within Docker containers for streamlined development and deployment.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AppCircle
   ```

2. Build and launch the containers:
   ```bash
   docker-compose up -d --build
   ```

3. Access the application at [http://localhost:8000](http://localhost:8000)

## Services Overview

- **app**: Runs PHP 8.3 FPM with Laravel 12
- **nginx**: Serves the application using Nginx
- **db**: PostgreSQL 15 database
- **phppgadmin**: Web-based PostgreSQL administration tool accessible at http://localhost:8080

## Database Credentials

- Database: `appcircle`
- User: `appcircle`
- Password: `password`
- Port: `5432`

## Development Tips

- The application code is mounted as a volume, so changes reflect immediately.
- Run Laravel Artisan commands:
  ```bash
  docker-compose exec app php artisan <command>
  ```
- Run Composer commands:
  ```bash
  docker-compose exec app composer <command>
  ```
- Manage frontend assets:
  ```bash
  docker-compose exec app npm <command>
  ```

## Troubleshooting

- Fix permission issues:
  ```bash
  docker-compose exec app chown -R www-data:www-data /var/www/html
  ```
- View logs:
  ```bash
  docker-compose logs -f
  ```

## Additional Notes

Ensure your `.env` file is configured correctly for PostgreSQL as per `.env.example`. Adjust any environment variables as needed for your setup.

## Accessing phpPgAdmin

You can access phpPgAdmin, a web-based PostgreSQL administration tool, at [http://localhost:8080](http://localhost:8080).

- When prompted to login, use the PostgreSQL credentials:
  - Username: `appcircle`
  - Password: `password`
- The database connection is pre-configured to connect to the PostgreSQL server.
- If you encounter login issues, try these troubleshooting steps:
  1. Make sure the PostgreSQL container is running
  2. Restart the containers with `docker-compose restart`
  3. Clear your browser cache or try in incognito mode

This tool allows you to manage your PostgreSQL database through a user-friendly web interface.
