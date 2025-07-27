@echo off
echo Creating symlink: .env → api/.env

:: Check if api\.env exists (either symlink or regular file) and remove it
if exist api\.env (
    echo Removing existing api\.env
    del api\.env
)

:: Create symbolic link
:: Requires Developer Mode enabled OR elevated permissions
mklink api\.env ..\.env

:: Bring down Docker containers
docker compose down

:: Start Docker containers in detached mode
docker compose up -d
